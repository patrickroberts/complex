import Complex from '../complex';
import cartesian from './cartesian';

export default (Ctor: typeof Complex, r: Complex | number, i = 0): Complex => {
  if (typeof r === 'number') {
    return cartesian(Ctor, r, i);
  }

  return r;
};
