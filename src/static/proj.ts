import Complex from '../complex';
import Component from '../internal/component';

function inf(Ctor: typeof Complex, x: number): Complex {
  const sign = (x || 1 / x) < 0 ? -0 : 0;

  return new Ctor(Infinity, sign, Infinity, sign, Component.ALL);
}

export default (Ctor: typeof Complex, z: Complex): Complex => {
  if (
    (z._has & Component.CARTESIAN) === Component.CARTESIAN
    && (1 / z._real === 0 || 1 / z._imag === 0)) {
    return inf(Ctor, z._imag);
  }

  if (
    (z._has & Component.POLAR) === Component.POLAR
    && 1 / z._abs === 0) {
    return inf(Ctor, z._arg);
  }

  return z;
};
