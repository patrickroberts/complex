export default (abs: number, arg: number): number => {
  if (arg === 0 || arg === Math.PI) return 0;
  return abs * Math.sin(arg);
};
