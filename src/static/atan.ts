import Complex from '../complex';
import { I, I1_2, ONE } from '../constants';
import { add, sub, mul } from '../methods';
import log from './log';

const atan = (z: Complex): Complex => {
  const iz = mul(Complex, I, z);

  return mul(Complex, I1_2, sub(
    Complex,
    log(sub(Complex, ONE, iz)),
    log(add(Complex, ONE, iz)),
  ));
};

export default atan;
