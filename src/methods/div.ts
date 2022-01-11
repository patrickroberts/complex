import Complex from '../complex';
import Component from '../internal/component';
import { real, imag, abs, arg } from '../accessors';

const div = (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => {
  const have = lhs._has & rhs._has;

  if (!(have & Component.POLAR) && (have & Component.CARTESIAN)) {
    const a = real(lhs);
    const b = imag(lhs);
    const c = real(rhs);
    const d = imag(rhs);
    const norm = c * c + d * d;

    return new Ctor((a * c + b * d) / norm, (b * c - a * d) / norm, 0, 0, Component.CARTESIAN);
  }

  return new Ctor(
    0, 0, abs(lhs) / abs(rhs), arg(lhs) - arg(rhs), Component.POLAR,
  );
};

export default div;
