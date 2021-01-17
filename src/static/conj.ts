import Complex from '../complex';

export default (Ctor: typeof Complex, z: Complex): Complex => new Ctor(
  z._real, -z._imag, z._abs, -z._arg, z._has,
);
