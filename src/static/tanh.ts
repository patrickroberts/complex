import Complex from '../complex';
import real from '../accessors/real';
import imag from '../accessors/imag';
import cartesian from './cartesian';

export default (Ctor: typeof Complex, z: Complex): Complex => {
  const a = 2 * real(z);
  const b = 2 * imag(z);
  const d = Math.cosh(a) + Math.cos(b);
  return cartesian(Ctor, Math.sinh(a) / d, Math.sin(b) / d);
};
