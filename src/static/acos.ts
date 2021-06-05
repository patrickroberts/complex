import Complex from '../complex';
import { I, ONE, PI1_2 } from '../constants';
import add from '../methods/add';
import mul from '../methods/mul';
import sub from '../methods/sub';
import log from './log';
import sqrt from './sqrt';

const acos = (z: Complex): Complex => (
  add(Complex, PI1_2, mul(
    Complex,
    I,
    log(add(
      Complex,
      sqrt(sub(Complex, ONE, mul(Complex, z, z))),
      mul(Complex, I, z),
    )),
  ))
);

export default acos;
