import Complex from '../complex';
import Component from '../internal/component';

const from: {
  (z: Complex): Complex;
  (real: number, imag?: number): Complex;
  (...args: [z: Complex] | [real: number, imag?: number]): Complex;
} = (r: Complex | number, i: number = 0): Complex => {
  if (typeof r === 'number') {
    return new Complex(r, i, 0, 0, Component.CARTESIAN);
  }

  return r;
};

export default from;
