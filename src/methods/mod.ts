import Complex from '../complex';
import div from './div';
import mul from './mul';
import sub from './sub';
import trunc from './trunc';

const mod = (Ctor: typeof Complex, lhs: Complex, rhs: Complex): Complex => (
  sub(Ctor, lhs, mul(Ctor, trunc(Ctor, div(Ctor, lhs, rhs)), rhs))
);

export default mod;
