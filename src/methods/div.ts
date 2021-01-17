import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import abs from '../accessors/abs';
import arg from '../accessors/arg';
import cartesian from '../static/cartesian';
import polar from '../static/polar';

export default (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => {
  const have = lhs._has & rhs._has;

  if (!(have & Component.POLAR) && (have & Component.CARTESIAN)) {
    const a = real(lhs);
    const b = imag(lhs);
    const c = real(rhs);
    const d = imag(rhs);
    const norm = c * c + d * d;

    return cartesian(Ctor, (a * c + b * d) / norm, (b * c - a * d) / norm);
  }

  return polar(Ctor, abs(lhs) / abs(rhs), arg(lhs) - arg(rhs));
};
