import Complex from '../complex';
import real from '../accessors/real';
import imag from '../accessors/imag';
import cartesian from './cartesian';

export default (Ctor: typeof Complex, z: Complex): Complex => {
  const a = real(z);
  const b = imag(z);
  return cartesian(Ctor, Math.cos(a) * Math.sinh(b), Math.sin(b) * Math.cosh(a));
};
