import Complex from '../complex';
import Component from '../internal/component';

const inf = (x: number): Complex => {
  const sign = (x || 1 / x) < 0 ? -0 : 0;

  return new Complex(Infinity, sign, Infinity, sign, Component.ALL);
};

const proj = (z: Complex): Complex => {
  if (
    (z._has & Component.CARTESIAN) === Component.CARTESIAN
    && (1 / z._real === 0 || 1 / z._imag === 0)) {
    return inf(z._imag);
  }

  if (
    (z._has & Component.POLAR) === Component.POLAR
    && 1 / z._abs === 0) {
    return inf(z._arg);
  }

  return z;
};

export default proj;
