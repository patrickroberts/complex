/* eslint-disable prefer-object-spread, prefer-spread */
import Complex from '../complex';
import { E, I, PI } from '../constants';
import { BinaryExpression, Expression, UnaryExpression, parse } from '../parser';
import { acos, acosh, add, asin, asinh, atan, atanh, cbrt, conj, cos, cosh, div, exp, from, log, mod, mul, pow, proj, sin, sinh, sqrt, sub, tan, tanh, trunc } from '../static';

export type Value = Complex | ((...args: Complex[]) => Complex);

export type Bindings = Record<string, Value>;

export const bindings: Bindings = {
  acos,
  acosh,
  asin,
  asinh,
  atan,
  atanh,
  cbrt,
  conj,
  cos,
  cosh,
  e: E,
  exp,
  i: I,
  log,
  mod,
  pi: PI,
  pow,
  proj,
  sin,
  sinh,
  sqrt,
  tan,
  tanh,
  trunc,
};

const unexpectedExpressionType = (type: never) => new TypeError(`Unexpected expression type ${type}`);

const transform = (expression: Expression): Expression<Complex> => {
  const { type } = expression;

  switch (type) {
    case 'BinaryExpression':
      return {
        type,
        operator: expression.operator,
        left: transform(expression.left),
        right: transform(expression.right),
      };
    case 'CallExpression':
      return {
        type,
        callee: expression.callee,
        arguments: expression.arguments.map(transform),
      };
    case 'Identifier':
      return expression;
    case 'Literal':
      return {
        type,
        value: from(expression.value),
      };
    case 'UnaryExpression':
      return {
        type,
        operator: expression.operator,
        argument: transform(expression.argument),
      };
    default:
      throw unexpectedExpressionType(type);
  }
};

const binary: Record<BinaryExpression['operator'], (left: Complex, right: Complex) => Complex> = {
  '+': add,
  '-': sub,
  '*': mul,
  '/': div,
  '**': pow,
  '%': mod,
};

const unary: Record<UnaryExpression['operator'], (arg: Complex) => Complex> = {
  '+': (arg) => arg,
  '-': (arg) => new Complex(0 - arg._real, 0 - arg._imag, arg._abs, 0 - arg._arg, arg._has),
};

const toString = <T>(expression: Expression<T>): string => {
  const { type } = expression;

  switch (type) {
    case 'BinaryExpression':
      return `(${toString(expression.left)}${expression.operator}${toString(expression.right)})`;
    case 'CallExpression':
      return `${toString(expression.callee)}(${expression.arguments.map(toString).join(', ')})`;
    case 'Identifier':
      return expression.name;
    case 'Literal':
      return `${expression.value}`;
    case 'UnaryExpression':
      return `${expression.operator}${toString(expression.argument)}`;
    default:
      throw unexpectedExpressionType(type);
  }
};

const assertComplex = (value: Value, expression: Expression<Complex>) => {
  if (typeof value === 'function') {
    throw new TypeError(`${toString(expression)} is a function`);
  }
  return value;
};

const assertFunction = (value: Value, expression: Expression<Complex>) => {
  if (typeof value !== 'function') {
    throw new TypeError(`${toString(expression)} is not a function`);
  }
  return value;
};

const convert = (expression: Expression<Complex>): (variables: Bindings) => Value => {
  const { type } = expression;

  switch (type) {
    case 'BinaryExpression': {
      const operator = binary[expression.operator];
      const left = convert(expression.left);
      const right = convert(expression.right);
      return (variables) => operator(
        assertComplex(left(variables), expression.left),
        assertComplex(right(variables), expression.right),
      );
    }
    case 'CallExpression': {
      const callee = convert(expression.callee);
      const args = expression.arguments.map(convert);
      return (variables) => assertFunction(
        callee(variables), expression.callee,
      ).apply(
        undefined,
        args.map((argument, index) => assertComplex(
          argument(variables), expression.arguments[index],
        )),
      );
    }
    case 'Identifier': {
      const { name } = expression;
      return (variables) => {
        if (!Object.prototype.hasOwnProperty.call(variables, name)) {
          throw new ReferenceError(`${name} is not defined`);
        }
        return variables[name];
      };
    }
    case 'Literal': {
      const { value } = expression;
      return () => value;
    }
    case 'UnaryExpression': {
      const operator = unary[expression.operator];
      const argument = convert(expression.argument);
      return (variables) => operator(
        assertComplex(argument(variables), expression.argument),
      );
    }
    default:
      throw unexpectedExpressionType(type);
  }
};

const isConstant = (expression: Expression<Complex>, constants: Bindings): boolean => {
  const { type } = expression;

  switch (type) {
    case 'BinaryExpression':
      return isConstant(expression.left, constants) && isConstant(expression.right, constants);
    case 'CallExpression':
      return isConstant(expression.callee, constants)
        && expression.arguments.every((argument) => isConstant(argument, constants));
    case 'Identifier':
      return Object.prototype.hasOwnProperty.call(constants, expression.name);
    case 'Literal':
      return true;
    case 'UnaryExpression':
      return isConstant(expression.argument, constants);
    default:
      throw unexpectedExpressionType(type);
  }
};

const simplify = (expression: Expression<Complex>, constants: Bindings): Expression<Complex> => {
  const { type } = expression;

  switch (type) {
    case 'BinaryExpression':
    case 'CallExpression':
    case 'UnaryExpression':
      if (isConstant(expression, constants)) {
        return { type: 'Literal', value: assertComplex(convert(expression)(constants), expression) };
      }

      if (type === 'BinaryExpression') {
        return {
          type,
          operator: expression.operator,
          left: simplify(expression.left, constants),
          right: simplify(expression.right, constants),
        };
      }

      if (type === 'CallExpression') {
        return {
          type,
          callee: expression.callee,
          arguments: expression.arguments.map((argument) => simplify(argument, constants)),
        };
      }

      return expression;
    default:
      return expression;
  }
};

const compile = (expression: string, constants: Bindings = {}): (variables: Bindings) => Value => {
  const record = Object.assign({}, bindings, constants);
  const evaluate = convert(simplify(transform(parse(expression)), record));
  return (variables) => evaluate(Object.assign({}, record, variables));
};

export default compile;
