import Complex from '../complex';
import { ONE, ONE1_2 } from '../constants';
import { add, sub, mul } from '../methods';
import log from './log';

const atanh = (z: Complex): Complex => (
  mul(Complex, ONE1_2, sub(
    Complex,
    log(add(Complex, ONE, z)),
    log(sub(Complex, ONE, z)),
  ))
);

export default atanh;
