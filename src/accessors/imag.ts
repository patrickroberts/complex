import Component from '../component';
import IComplex from '../icomplex';
import imag from '../math/imag';

export default (z: IComplex): number => {
  if (!(z._has & Component.IMAG)) {
    z._imag = imag(z._abs, z._arg);
    z._has |= Component.IMAG;
  }

  return z._imag;
};
