import Complex from '../../complex';
import Component from '../../internal/component';

export default jest.fn((_: typeof Complex, abs: number, arg: number) => new Complex(
  0, 0, abs, arg, Component.POLAR,
));
