import Complex from '../complex';
import real from '../accessors/real';
import imag from '../accessors/imag';
import cartesian from '../from/cartesian';

export default (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => cartesian(
  Ctor, real(lhs) - real(rhs), imag(lhs) - imag(rhs),
);
