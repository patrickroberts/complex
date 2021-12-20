import { Component, principal } from './internal';
import { real, imag, abs, arg, norm } from './accessors';
import { add, sub, mul, div, mod, pow, toString } from './methods';

export default class Complex {
  /** @internal */
  public _real: number;

  /** @internal */
  public _imag: number;

  /** @internal */
  public _abs: number;

  /** @internal */
  public _arg: number;

  /** @internal */
  public _has: Component;

  /** @internal */
  public constructor(_real: number, _imag: number, _abs: number, _arg: number, _has: Component) {
    this._real = _real;
    this._imag = _imag;
    this._abs = _abs;
    this._arg = principal(_arg);
    this._has = _has;
  }

  public get real(): number {
    return real(Complex, this);
  }

  public get imag(): number {
    return imag(Complex, this);
  }

  public get abs(): number {
    return abs(Complex, this);
  }

  public get arg(): number {
    return arg(Complex, this);
  }

  public get norm(): number {
    return norm(Complex, this);
  }

  public add(this: Complex, z: Complex): Complex {
    return add(Complex, this, z);
  }

  public sub(this: Complex, z: Complex): Complex {
    return sub(Complex, this, z);
  }

  public mul(this: Complex, z: Complex): Complex {
    return mul(Complex, this, z);
  }

  public div(this: Complex, z: Complex): Complex {
    return div(Complex, this, z);
  }

  public mod(this: Complex, z: Complex): Complex {
    return mod(Complex, this, z);
  }

  public pow(this: Complex, z: Complex): Complex {
    return pow(Complex, this, z);
  }

  public toString(this: Complex): string {
    return toString(this);
  }
}
