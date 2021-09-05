import Complex from '../complex';
import _mul from '../methods/mul';

const mul = (lhs: Complex, rhs: Complex): Complex => _mul(Complex, lhs, rhs);

export default mul;
