import Complex from '../complex';
import Component from '../component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import abs from '../accessors/abs';
import arg from '../accessors/arg';

export default (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => {
  const components = lhs._has & rhs._has;

  if (components === Component.POLAR || components !== Component.CARTESIAN) {
    return Ctor.polar(abs(lhs) / abs(rhs), arg(lhs) - arg(rhs));
  }

  const a = real(lhs);
  const b = imag(lhs);
  const c = real(rhs);
  const d = imag(rhs);
  const divisor = c * c + d * d;

  return Ctor.cartesian(
    (a * c + b * d) / divisor,
    (b * c - a * d) / divisor,
  );
};
