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
    return cartesian(
      Ctor,
      real(lhs) * real(rhs) - imag(lhs) * imag(rhs),
      lhs._real * rhs._imag + lhs._imag * rhs._real,
    );
  }

  return polar(Ctor, abs(lhs) * abs(rhs), arg(lhs) + arg(rhs));
};
