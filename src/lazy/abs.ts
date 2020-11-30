import Component from '../component';
import IComplex from '../icomplex';
import abs from '../math/abs';

export default (z: IComplex): number => {
  if (!(z._has & Component.ABS)) {
    z._abs = abs(z._real, z._imag);
    z._has |= Component.ABS;
  }

  return z._abs;
};
