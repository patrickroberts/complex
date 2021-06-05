import Complex from '../complex';
import { ONE } from '../constants';
import { add, sub, mul } from '../methods';
import log from './log';
import sqrt from './sqrt';

const acosh = (z: Complex): Complex => (
  log(add(
    Complex,
    z,
    mul(
      Complex,
      sqrt(sub(Complex, z, ONE)),
      sqrt(add(Complex, z, ONE)),
    ),
  ))
);

export default acosh;
