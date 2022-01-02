/* eslint-disable prefer-object-spread, prefer-spread */
import Complex from '../complex';
import { E, I, PI } from '../constants';
import { BinaryExpression, Expression, UnaryExpression } from '../expressions';
import parse from '../parser';
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

const asComplexOrThrow = (value: Value) => {
  if (typeof value !== 'object') {
    throw new TypeError(`${typeof value} is not an object`);
  }

  return value;
};

const asFunctionOrThrow = (value: Value) => {
  if (typeof value !== 'function') {
    throw new TypeError(`${typeof value} is not a function`);
  }

  return value;
};

const hasOwnProperty = (object: unknown, propertyKey: PropertyKey) => (
  Object.prototype.hasOwnProperty.call(object, propertyKey)
);

const generate = (expression: Expression<Complex>, constants: Bindings):
(variables: Bindings) => Value => {
  const { type } = expression;

  switch (type) {
    case 'BinaryExpression': {
      const operator = binary[expression.operator];
      const left = generate(expression.left, constants);
      const right = generate(expression.right, constants);
      return (variables) => operator(
        asComplexOrThrow(left(variables)),
        asComplexOrThrow(right(variables)),
      );
    }
    case 'CallExpression': {
      const callee = generate(expression.callee, constants);
      const args = expression.arguments.map((argument) => generate(argument, constants));
      return (variables) => asFunctionOrThrow(callee(variables)).apply(
        undefined,
        args.map((argument) => asComplexOrThrow(argument(variables))),
      );
    }
    case 'Identifier': {
      const { name } = expression;
      return (variables) => {
        if (!hasOwnProperty(variables, name)) {
          if (!hasOwnProperty(constants, name)) {
            throw new ReferenceError(`${name} is not defined`);
          }

          return constants[name];
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
      const argument = generate(expression.argument, constants);
      return (variables) => operator(asComplexOrThrow(argument(variables)));
    }
    default:
      throw unexpectedExpressionType(type);
  }
};

const isConstant = (expression: Expression<unknown>, constants: Bindings): boolean => {
  const { type } = expression;

  switch (type) {
    case 'BinaryExpression':
      return isConstant(expression.left, constants) && isConstant(expression.right, constants);
    case 'CallExpression':
      return isConstant(expression.callee, constants)
        && expression.arguments.every((argument) => isConstant(argument, constants));
    case 'Identifier':
      return hasOwnProperty(constants, expression.name);
    case 'Literal':
      return true;
    case 'UnaryExpression':
      return isConstant(expression.argument, constants);
    default:
      throw unexpectedExpressionType(type);
  }
};

const asLiteralIfConstant = (
  expression: Expression<Complex>, constants: Bindings,
): Expression<Complex> => {
  if (!isConstant(expression, constants)) {
    return expression;
  }

  const evaluate = generate(expression, constants);
  return { type: 'Literal', value: asComplexOrThrow(evaluate(constants)) };
};

const transform = (expression: Expression<number>, constants: Bindings): Expression<Complex> => {
  const { type } = expression;

  switch (type) {
    case 'BinaryExpression':
      return asLiteralIfConstant({
        type,
        operator: expression.operator,
        left: transform(expression.left, constants),
        right: transform(expression.right, constants),
      }, constants);
    case 'CallExpression':
      return asLiteralIfConstant({
        type,
        callee: expression.callee,
        arguments: expression.arguments.map((argument) => transform(argument, constants)),
      }, constants);
    case 'Identifier':
      return expression;
    case 'Literal':
      return {
        type,
        value: from(expression.value),
      };
    case 'UnaryExpression':
      return asLiteralIfConstant({
        type,
        operator: expression.operator,
        argument: transform(expression.argument, constants),
      }, constants);
    default:
      throw unexpectedExpressionType(type);
  }
};

const compile = (expression: string, constants: Bindings = {}): (variables?: Bindings) => Value => {
  const record = Object.assign({}, bindings, constants);
  const evaluate = generate(transform(parse(expression), record), record);
  return (variables = {}) => evaluate(variables);
};

export default compile;
