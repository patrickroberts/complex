export default interface Literal<T = number> {
  type: 'Literal';
  value: T;
}
