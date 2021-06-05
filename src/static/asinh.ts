import Complex from '../complex';
import { ONE } from '../constants';
import add from '../methods/add';
import mul from '../methods/mul';
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
