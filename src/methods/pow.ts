import Complex from '../complex';
import Component from '../internal/component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import abs from '../accessors/abs';
import arg from '../accessors/arg';
import mul from './mul';
import div from './div';

export default (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => {
  const c = real(rhs);
  const d = imag(rhs);

  if (d === 0) {
    switch (c) {
      case -1: return div(Ctor, new Ctor(1, 0, 1, 0, Component.ALL), lhs);
      case 0: return new Ctor(1, 0, 1, 0, Component.ALL);
      case 1: return lhs;
      case 2: return mul(Ctor, lhs, lhs);
      default: break;
    }
  }

  const m = abs(lhs);
  const a = arg(lhs);

  return new Ctor(0, 0, m ** c * Math.exp(-a * d), d * Math.log(m) + a * c, Component.POLAR);
};
