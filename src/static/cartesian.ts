import Complex from '../complex';
import Component from '../internal/component';
import abs from '../math/abs';
import arg from '../math/arg';

export default (Ctor: typeof Complex, real: number, imag: number): Complex => {
  if (imag === 0 || real === 0) {
    return new Ctor(
      real, imag, abs(real, imag), arg(real, imag), Component.ALL,
    );
  }

  return new Ctor(
    real, imag, 0, 0, Component.CARTESIAN,
  );
};
