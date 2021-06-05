import Complex from '../../complex';
import Component from '../../internal/component';

export default jest.fn((real: number, imag: number) => new Complex(
  real, imag, 0, 0, Component.CARTESIAN,
));
