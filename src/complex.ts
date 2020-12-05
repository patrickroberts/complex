import Component from './component';
import _real from './accessors/real';
import _imag from './accessors/imag';
import _abs from './accessors/abs';
import _arg from './accessors/arg';
import cartesian from './from/cartesian';
import polar from './from/polar';
import add from './binary/add';
import subtract from './binary/subtract';
import multiply from './binary/multiply';
import divide from './binary/divide';
import pow from './binary/pow';
import principal from './principal';

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
  public constructor(real: number, imag: number, abs: number, arg: number, has: Component) {
    this._real = real + 0;
    this._imag = imag + 0;
    this._abs = abs + 0;
    this._arg = principal(arg);
    this._has = has;
  }

  public get real(): number {
    return _real(this);
  }

  public get imag(): number {
    return _imag(this);
  }

  public get abs(): number {
    return _abs(this);
  }

  public get arg(): number {
    return _arg(this);
  }

  public static cartesian(real: number, imag = 0): Complex {
    return cartesian(Complex, real, imag);
  }

  public static polar(abs: number, arg = 0): Complex {
    return polar(Complex, abs, arg);
  }

  public add(z: Complex): Complex {
    return add(Complex, this, z);
  }

  public subtract(z: Complex): Complex {
    return subtract(Complex, this, z);
  }

  public multiply(z: Complex): Complex {
    return multiply(Complex, this, z);
  }

  public divide(z: Complex): Complex {
    return divide(Complex, this, z);
  }

  public pow(z: Complex): Complex {
    return pow(Complex, this, z);
  }
}
