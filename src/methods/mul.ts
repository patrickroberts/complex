import Complex from '../complex';
import Component from '../internal/component';
import { real, imag, abs, arg } from '../accessors';

const mul = (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => {
  const have = lhs._has & rhs._has;

  if (!(have & Component.POLAR) && (have & Component.CARTESIAN)) {
    const a = real(Ctor, lhs);
    const b = imag(Ctor, lhs);
    const c = real(Ctor, rhs);
    const d = imag(Ctor, rhs);

    return new Ctor(a * c - b * d, a * d + b * c, 0, 0, Component.CARTESIAN);
  }

  return new Ctor(
    0, 0, abs(Ctor, lhs) * abs(Ctor, rhs), arg(Ctor, lhs) + arg(Ctor, rhs), Component.POLAR,
  );
};

export default mul;
