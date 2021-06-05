import Complex from '../complex';
import Component from '../internal/component';
import { real, imag, abs, arg } from '../accessors';
import mul from './mul';
import div from './div';

export default (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => {
  const c = real(Ctor, rhs);
  const d = imag(Ctor, rhs);

  if (d === 0) {
    switch (c) {
      case -1: return div(Ctor, new Ctor(1, 0, 1, 0, Component.ALL), lhs);
      case 0: return new Ctor(1, 0, 1, 0, Component.ALL);
      case 1: return lhs;
      case 2: return mul(Ctor, lhs, lhs);
      default: break;
    }
  }

  const m = abs(Ctor, lhs);
  const a = arg(Ctor, lhs);

  return new Ctor(0, 0, m ** c * Math.exp(-a * d), d * Math.log(m) + a * c, Component.POLAR);
};
