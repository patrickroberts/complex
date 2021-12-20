import Complex from '../complex';
import Component from '../internal/component';
import { real, imag } from '../accessors';

const trunc = (Ctor: typeof Complex, z: Complex): Complex => new Ctor(
  Math.trunc(real(Ctor, z)), Math.trunc(imag(Ctor, z)), 0, 0, Component.CARTESIAN,
);

export default trunc;
