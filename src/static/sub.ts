import Complex from '../complex';
import _sub from '../methods/sub';

const sub = (lhs: Complex, rhs: Complex): Complex => _sub(Complex, lhs, rhs);

export default sub;
