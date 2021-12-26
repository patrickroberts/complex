import { Expression } from '.';

export default interface BinaryExpression<T = number> {
  type: 'BinaryExpression';
  operator: '+' | '-' | '*' | '/' | '%' | '**';
  left: Expression<T>;
  right: Expression<T>;
}
