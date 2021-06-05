import Complex from '../complex';
import { ONE } from '../constants';
import add from '../methods/add';
import mul from '../methods/mul';
import sub from '../methods/sub';
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
