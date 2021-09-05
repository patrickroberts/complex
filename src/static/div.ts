import Complex from '../complex';
import _div from '../methods/div';

const div = (lhs: Complex, rhs: Complex): Complex => _div(Complex, lhs, rhs);

export default div;
