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

const invariant = (z: Complex, Ctor: typeof Complex, method: string) => {
  if (!(z instanceof Ctor)) {
    throw new TypeError(`Method ${method} called on incompatible receiver`);
  }
};

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
    invariant(this, Complex, 'get Complex.prototype.real');
    return real(this);
  }

  public get imag(): number {
    invariant(this, Complex, 'get Complex.prototype.imag');
    return imag(this);
  }

  public get abs(): number {
    invariant(this, Complex, 'get Complex.prototype.abs');
    return abs(this);
  }

  public get arg(): number {
    invariant(this, Complex, 'get Complex.prototype.arg');
    return arg(this);
  }

  public get norm(): number {
    invariant(this, Complex, 'get Complex.prototype.norm');
    return norm(this);
  }

  public add(this: Complex, z: Complex): Complex {
    invariant(this, Complex, 'Complex.prototype.add');
    return add(Complex, this, z);
  }

  public sub(this: Complex, z: Complex): Complex {
    invariant(this, Complex, 'Complex.prototype.sub');
    return sub(Complex, this, z);
  }

  public mul(this: Complex, z: Complex): Complex {
    invariant(this, Complex, 'Complex.prototype.mul');
    return mul(Complex, this, z);
  }

  public div(this: Complex, z: Complex): Complex {
    invariant(this, Complex, 'Complex.prototype.div');
    return div(Complex, this, z);
  }

  public pow(this: Complex, z: Complex): Complex {
    invariant(this, Complex, 'Complex.prototype.pow');
    return pow(Complex, this, z);
  }
}
