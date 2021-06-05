import Complex from '../complex';

const conj = (z: Complex): Complex => new Complex(
  z._real, -z._imag, z._abs, -z._arg, z._has,
);

export default conj;
