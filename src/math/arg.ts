export default (real: number, imag: number): number => {
  if (imag === 0) {
    if (real >= 0) return 0;
    return Math.PI;
  }
  if (real === 0) {
    if (imag >= 0) return 0.5 * Math.PI;
    return -0.5 * Math.PI;
  }
  return Math.atan2(imag, real);
};
