import Component from '../component';
import IComplex from '../icomplex';
import real from '../math/real';

export default (z: IComplex): number => {
  if (!(z._has & Component.REAL)) {
    z._real = real(z._abs, z._arg);
    z._has |= Component.REAL;
  }

  return z._real;
};
