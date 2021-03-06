import Complex from '../complex';
import { I, NEGATIVE_I, ONE } from '../constants';
import { add, sub, mul } from '../methods';
import log from './log';
import sqrt from './sqrt';

const asin = (z: Complex): Complex => (
  mul(
    Complex,
    NEGATIVE_I,
    log(add(
      Complex,
      sqrt(sub(Complex, ONE, mul(Complex, z, z))),
      mul(Complex, I, z),
    )),
  )
);

export default asin;
