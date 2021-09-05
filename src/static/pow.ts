import Complex from '../complex';
import _pow from '../methods/pow';

const pow = (lhs: Complex, rhs: Complex): Complex => _pow(Complex, lhs, rhs);

export default pow;
