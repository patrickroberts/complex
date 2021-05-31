import Complex from '../complex';
import real from '../accessors/real';
import imag from '../accessors/imag';
import cartesian from './cartesian';

export default (Ctor: typeof Complex, z: Complex): Complex => {
  const a = 2 * real(z);
  const b = 2 * imag(z);
  const d = Math.cos(a) + Math.cosh(b);
  return cartesian(Ctor, Math.sin(a) / d, Math.sinh(b) / d);
};
