import Component from '../internal/component';

export default jest.fn((
  _real: number, _imag: number, _abs: number, _arg: number, _has: Component,
) => ({
  _real, _imag, _abs, _arg, _has,
}));
