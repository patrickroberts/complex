import Component from './component';

/** @internal */
export default interface IComplex {
  _real: number;
  _imag: number;
  _arg: number;
  _abs: number;
  _has: Component;
}
