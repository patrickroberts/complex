import Complex from '../complex';
import _trunc from '../methods/trunc';

const trunc = (z: Complex): Complex => _trunc(Complex, z);

export default trunc;
