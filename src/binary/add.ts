import Complex from '../complex';
import real from '../accessors/real';
import imag from '../accessors/imag';

export default (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => Ctor.cartesian(
  real(lhs) + real(rhs), imag(lhs) + imag(rhs),
);
