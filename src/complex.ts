import Component from './component';
import real from './lazy/real';
import imag from './lazy/imag';
import abs from './lazy/abs';
import arg from './lazy/arg';
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
  public constructor(_real: number, _imag: number, _abs: number, _arg: number, _has: Component) {
    this._real = _real + 0;
    this._imag = _imag + 0;
    this._abs = _abs + 0;
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
}
