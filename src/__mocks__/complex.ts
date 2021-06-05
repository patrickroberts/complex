import { Component, principal } from '../internal';

export default jest.fn((
  real: number, imag: number, abs: number, arg: number, has: Component,
) => ({
  _real: real, _imag: imag, _abs: abs, _arg: principal(arg), _has: has,
}));
