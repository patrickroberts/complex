import Complex from '../complex';

const conj = (z: Complex): Complex => new Complex(
  z._real, 0 - z._imag, z._abs, 0 - z._arg, z._has,
);

export default conj;
