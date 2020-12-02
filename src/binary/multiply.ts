import Complex from '../complex';
import Component from '../component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import abs from '../accessors/abs';
import arg from '../accessors/arg';

export default (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => {
  const components = lhs._has & rhs._has;

  if (components === Component.POLAR || components !== Component.CARTESIAN) {
    return Ctor.polar(abs(lhs) * abs(rhs), arg(lhs) + arg(rhs));
  }

  return Ctor.cartesian(
    real(lhs) * real(rhs) - imag(lhs) * imag(rhs),
    lhs._real * rhs._imag + lhs._imag * rhs._real,
  );
};
