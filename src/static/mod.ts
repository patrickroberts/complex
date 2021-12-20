import Complex from '../complex';
import _mod from '../methods/mod';

const mod = (lhs: Complex, rhs: Complex): Complex => _mod(Complex, lhs, rhs);

export default mod;
