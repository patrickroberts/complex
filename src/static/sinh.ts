import Complex from '../complex';
import real from '../accessors/real';
import imag from '../accessors/imag';
import cartesian from './cartesian';

export default (Ctor: typeof Complex, z: Complex): Complex => {
  const a = real(z);
  const b = imag(z);
  return cartesian(Ctor, Math.sinh(a) * Math.cos(b), Math.cosh(a) * Math.sin(b));
};
