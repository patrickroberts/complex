import { Expression } from '.';

export default interface UnaryExpression<T = number> {
  type: 'UnaryExpression';
  operator: '+' | '-';
  argument: Expression<T>;
}
