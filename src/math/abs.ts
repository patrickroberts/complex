export default (real: number, imag: number): number => {
  if (imag === 0) return Math.abs(real);
  if (real === 0) return Math.abs(imag);
  return Math.hypot(real, imag);
};
