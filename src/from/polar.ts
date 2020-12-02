import Complex from '../complex';
import Component from '../component';

export default (Ctor: typeof Complex, abs: number, arg: number): Complex => new Ctor(
  0, 0, abs, arg, Component.POLAR,
);
