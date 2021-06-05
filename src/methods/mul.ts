import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import abs from '../accessors/abs';
import arg from '../accessors/arg';

export default (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => {
  const have = lhs._has & rhs._has;

  if (!(have & Component.POLAR) && (have & Component.CARTESIAN)) {
    const a = real(lhs);
    const b = imag(lhs);
    const c = real(rhs);
    const d = imag(rhs);

    return new Ctor(a * c - b * d, a * d + b * c, 0, 0, Component.CARTESIAN);
  }

  return new Ctor(0, 0, abs(lhs) * abs(rhs), arg(lhs) + arg(rhs), Component.POLAR);
};
