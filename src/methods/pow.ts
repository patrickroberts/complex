import Complex from '../complex';
import real from '../accessors/real';
import imag from '../accessors/imag';
import abs from '../accessors/abs';
import arg from '../accessors/arg';
import polar from '../static/polar';
import mul from './mul';
import div from './div';

export default (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => {
  const c = real(rhs);
  const d = imag(rhs);

  if (d === 0) {
    switch (c) {
      case -1: return div(Ctor, Ctor.ONE, lhs);
      case 0: return Ctor.ONE;
      case 1: return lhs;
      case 2: return mul(Ctor, lhs, lhs);
      default: break;
    }
  }

  const m = abs(lhs);
  const a = arg(lhs);

  return polar(
    Ctor,
    m ** c * Math.exp(-a * d),
    d * Math.log(m) + a * c,
  );
};
