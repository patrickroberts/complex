const principal = (arg: number): number => {
  const divisor = 2 * Math.PI;
  const modulus = arg % divisor;

  if (modulus > Math.PI) return modulus - divisor;
  if (modulus > -Math.PI) return modulus;
  return modulus + divisor;
};

export default principal;
