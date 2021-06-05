import Complex from './complex';
import Component from './internal/component';

export const E = new Complex(Math.E, 0, Math.E, 0, Component.ALL);
export const I = new Complex(0, 1, 1, Math.PI / 2, Component.ALL);
export const I1_2 = new Complex(0, 0.5, 0.5, Math.PI / 2, Component.ALL);
export const LN10 = new Complex(Math.LN10, 0, Math.LN10, 0, Component.ALL);
export const LN2 = new Complex(Math.LN2, 0, Math.LN2, 0, Component.ALL);
export const LOG10E = new Complex(Math.LOG10E, 0, Math.LOG10E, 0, Component.ALL);
export const LOG2E = new Complex(Math.LOG2E, 0, Math.LOG2E, 0, Component.ALL);
export const NEGATIVE_I = new Complex(0, -1, 1, -Math.PI / 2, Component.ALL);
export const ONE = new Complex(1, 0, 1, 0, Component.ALL);
export const ONE1_2 = new Complex(0.5, 0, 0.5, 0, Component.ALL);
export const PI = new Complex(Math.PI, 0, Math.PI, 0, Component.ALL);
export const PI1_2 = new Complex(Math.PI / 2, 0, Math.PI / 2, 0, Component.ALL);
export const SQRT1_2 = new Complex(Math.SQRT1_2, 0, Math.SQRT1_2, 0, Component.ALL);
export const SQRT2 = new Complex(Math.SQRT2, 0, Math.SQRT2, 0, Component.ALL);
