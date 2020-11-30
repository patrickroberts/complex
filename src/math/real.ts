export default (abs: number, arg: number): number => {
  if (arg === 0) return abs;
  if (arg === Math.PI) return -abs;
  return abs * Math.cos(arg);
};
