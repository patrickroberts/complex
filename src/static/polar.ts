import Complex from '../complex';
import Component from '../internal/component';

const polar = (abs: number, arg: number): Complex => new Complex(
  0, 0, abs, arg, Component.POLAR,
);

export default polar;
