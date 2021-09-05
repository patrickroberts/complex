import Complex from '../complex';
import _add from '../methods/add';

const add = (lhs: Complex, rhs: Complex): Complex => _add(Complex, lhs, rhs);

export default add;
