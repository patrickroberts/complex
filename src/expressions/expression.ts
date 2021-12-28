import { BinaryExpression, CallExpression, Identifier, Literal, UnaryExpression } from '.';

type Expression<T = number> =
  BinaryExpression<T> | CallExpression<T> | UnaryExpression<T> | Identifier | Literal<T>;

export default Expression;
