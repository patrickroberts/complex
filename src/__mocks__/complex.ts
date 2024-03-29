import Complex from '../complex';
import { Component, principal } from '../internal';

function MockComplex(
  this: Complex, real: number, imag: number, abs: number, arg: number, has: Component,
): Complex {
  this._real = real;
  this._imag = imag;
  this._abs = abs;
  this._arg = principal(arg);
  this._has = has;

  return this;
}

export default jest.fn(MockComplex);
