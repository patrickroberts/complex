import Component from './internal/component';
import principal from './internal/principal';
import real from './accessors/real';
import imag from './accessors/imag';
import abs from './accessors/abs';
import arg from './accessors/arg';
import norm from './accessors/norm';
import add from './methods/add';
import sub from './methods/sub';
import mul from './methods/mul';
import div from './methods/div';
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
  public constructor(_real: number, _imag: number, _abs: number, _arg: number, _has: Component) {
    this._real = _real;
    this._imag = _imag;
    this._abs = _abs;
    this._arg = principal(_arg);
    this._has = _has;
  }

  public get real(): number {
    return real(this);
  }

  public get imag(): number {
    return imag(this);
  }

  public get abs(): number {
    return abs(this);
  }

  public get arg(): number {
    return arg(this);
  }

  public get norm(): number {
    return norm(this);
  }

  public add(z: Complex): Complex {
    return add(Complex, this, z);
  }

  public sub(z: Complex): Complex {
    return sub(Complex, this, z);
  }

  public mul(z: Complex): Complex {
    return mul(Complex, this, z);
  }

  public div(z: Complex): Complex {
    return div(Complex, this, z);
  }

  public pow(z: Complex): Complex {
    return pow(Complex, this, z);
  }
}
