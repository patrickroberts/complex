import Complex from '../complex';
import { ONE } from '../constants';
import { add, mul } from '../methods';
import log from './log';
import sqrt from './sqrt';

const asinh = (z: Complex): Complex => (
  log(add(
    Complex,
    sqrt(add(
      Complex,
      mul(Complex, z, z),
      ONE,
    )),
    z,
  ))
);

export default asinh;
