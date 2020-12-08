import Component from './internal/component';
import normalize from './internal/normalize';
import principal from './internal/principal';
import _real from './accessors/real';
import _imag from './accessors/imag';
import _abs from './accessors/abs';
import _arg from './accessors/arg';
import from from './static/from';
import cartesian from './static/cartesian';
import polar from './static/polar';
import exp from './static/exp';
import log from './static/log';
import add from './methods/add';
import subtract from './methods/subtract';
import multiply from './methods/multiply';
import divide from './methods/divide';
import pow from './methods/pow';

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
    this._real = normalize(real);
    this._imag = normalize(imag);
    this._abs = normalize(abs);
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

  public static exp(z: Complex): Complex;
  public static exp(real: number, imag?: number): Complex;
  public static exp(r: Complex | number, i = 0): Complex {
    return exp(Complex, from(Complex, r, i));
  }

  public static log(z: Complex): Complex;
  public static log(real: number, imag?: number): Complex;
  public static log(r: Complex | number, i = 0): Complex {
    return log(Complex, from(Complex, r, i));
  }

  public add(z: Complex): Complex;
  public add(real: number, imag?: number): Complex;
  public add(r: Complex | number, i = 0): Complex {
    return add(Complex, this, from(Complex, r, i));
  }

  public subtract(z: Complex): Complex;
  public subtract(real: number, imag?: number): Complex;
  public subtract(r: Complex | number, i = 0): Complex {
    return subtract(Complex, this, from(Complex, r, i));
  }

  public multiply(z: Complex): Complex;
  public multiply(real: number, imag?: number): Complex;
  public multiply(r: Complex | number, i = 0): Complex {
    return multiply(Complex, this, from(Complex, r, i));
  }

  public divide(z: Complex): Complex;
  public divide(real: number, imag?: number): Complex;
  public divide(r: Complex | number, i = 0): Complex {
    return divide(Complex, this, from(Complex, r, i));
  }

  public pow(z: Complex): Complex;
  public pow(real: number, imag?: number): Complex;
  public pow(r: Complex | number, i = 0): Complex {
    return pow(Complex, this, from(Complex, r, i));
  }
}
