import Component from '../component';
import IComplex from '../icomplex';
import arg from '../math/arg';

export default (z: IComplex): number => {
  if (!(z._has & Component.ARG)) {
    z._arg = arg(z._real, z._imag);
    z._has |= Component.ARG;
  }

  return z._arg;
};
