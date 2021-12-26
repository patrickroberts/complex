import { Expression, Identifier } from '.';

export default interface CallExpression<T = number> {
  type: 'CallExpression';
  callee: Identifier;
  arguments: Expression<T>[];
}
