export default (arg: number): number => {
  const divisor = 2 * Math.PI;

  return Math.PI - ((3 * Math.PI - (arg % divisor)) % divisor);
};
