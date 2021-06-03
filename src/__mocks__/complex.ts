import Component from '../internal/component';
import principal from '../internal/principal';

jest.mock('../internal/principal');

export default jest.fn((
  real: number, imag: number, abs: number, arg: number, has: Component,
) => ({
  _real: real, _imag: imag, _abs: abs, _arg: principal(arg), _has: has,
}));
