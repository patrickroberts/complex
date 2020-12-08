import Complex from '../complex';
import real from '../accessors/real';
import imag from '../accessors/imag';
import polar from './polar';

export default (Ctor: typeof Complex, z: Complex): Complex => polar(
  Ctor, Math.exp(real(z)), imag(z),
);
