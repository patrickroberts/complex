import Component from './internal/component';
import principal from './internal/principal';
import _real from './accessors/real';
import _imag from './accessors/imag';
import _abs from './accessors/abs';
import _arg from './accessors/arg';
import norm from './accessors/norm';
import from from './static/from';
import cartesian from './static/cartesian';
import polar from './static/polar';
import cbrt from './static/cbrt';
import conj from './static/conj';
import exp from './static/exp';
import log from './static/log';
import proj from './static/proj';
import sqrt from './static/sqrt';
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
  public constructor(real: number, imag: number, abs: number, arg: number, has: Component) {
    this._real = real;
    this._imag = imag;
    this._abs = abs;
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

  public get norm(): number {
    return norm(this);
  }

  public static readonly ZERO = new Complex(0, 0, 0, 0, Component.ALL);

  public static readonly ONE = new Complex(1, 0, 1, 0, Component.ALL);

  public static readonly I = new Complex(0, 1, 1, Math.PI / 2, Component.ALL);

  public static readonly E = new Complex(Math.E, 0, Math.E, 0, Component.ALL);

  public static readonly PI = new Complex(Math.PI, 0, Math.PI, 0, Component.ALL);

  public static readonly INFINITY = new Complex(Infinity, 0, Infinity, 0, Component.ALL);

  public static readonly NaN = new Complex(NaN, NaN, NaN, NaN, Component.ALL);

  public static cartesian(real: number, imag = 0): Complex {
    return cartesian(Complex, real, imag);
  }

  public static polar(abs: number, arg = 0): Complex {
    return polar(Complex, abs, arg);
  }

  public static cbrt(z: Complex): Complex;
  public static cbrt(real: number, imag?: number): Complex;
  public static cbrt(...arg: [z: Complex] | [real: number, imag?: number]): Complex;
  public static cbrt(r: Complex | number, i = 0): Complex {
    return cbrt(Complex, from(Complex, r, i));
  }

  public static conj(z: Complex): Complex;
  public static conj(real: number, imag?: number): Complex;
  public static conj(...arg: [z: Complex] | [real: number, imag?: number]): Complex;
  public static conj(r: Complex | number, i = 0): Complex {
    return conj(Complex, from(Complex, r, i));
  }

  public static exp(z: Complex): Complex;
  public static exp(real: number, imag?: number): Complex;
  public static exp(...arg: [z: Complex] | [real: number, imag?: number]): Complex;
  public static exp(r: Complex | number, i = 0): Complex {
    return exp(Complex, from(Complex, r, i));
  }

  public static log(z: Complex): Complex;
  public static log(real: number, imag?: number): Complex;
  public static log(...arg: [z: Complex] | [real: number, imag?: number]): Complex;
  public static log(r: Complex | number, i = 0): Complex {
    return log(Complex, from(Complex, r, i));
  }

  public static proj(z: Complex): Complex;
  public static proj(real: number, imag?: number): Complex;
  public static proj(...arg: [z: Complex] | [real: number, imag?: number]): Complex;
  public static proj(r: Complex | number, i = 0): Complex {
    return proj(Complex, from(Complex, r, i));
  }

  public static sqrt(z: Complex): Complex;
  public static sqrt(real: number, imag?: number): Complex;
  public static sqrt(...arg: [z: Complex] | [real: number, imag?: number]): Complex;
  public static sqrt(r: Complex | number, i = 0): Complex {
    return sqrt(Complex, from(Complex, r, i));
  }

  public add(z: Complex): Complex;
  public add(real: number, imag?: number): Complex;
  public add(...rhs: [z: Complex] | [real: number, imag?: number]): Complex;
  public add(r: Complex | number, i = 0): Complex {
    return add(Complex, this, from(Complex, r, i));
  }

  public sub(z: Complex): Complex;
  public sub(real: number, imag?: number): Complex;
  public sub(...rhs: [z: Complex] | [real: number, imag?: number]): Complex;
  public sub(r: Complex | number, i = 0): Complex {
    return sub(Complex, this, from(Complex, r, i));
  }

  public subtract(z: Complex): Complex;
  public subtract(real: number, imag?: number): Complex;
  public subtract(...rhs: [z: Complex] | [real: number, imag?: number]): Complex;
  public subtract(r: Complex | number, i = 0): Complex {
    return sub(Complex, this, from(Complex, r, i));
  }

  public mul(z: Complex): Complex;
  public mul(real: number, imag?: number): Complex;
  public mul(...rhs: [z: Complex] | [real: number, imag?: number]): Complex;
  public mul(r: Complex | number, i = 0): Complex {
    return mul(Complex, this, from(Complex, r, i));
  }

  public multiply(z: Complex): Complex;
  public multiply(real: number, imag?: number): Complex;
  public multiply(...rhs: [z: Complex] | [real: number, imag?: number]): Complex;
  public multiply(r: Complex | number, i = 0): Complex {
    return mul(Complex, this, from(Complex, r, i));
  }

  public div(z: Complex): Complex;
  public div(real: number, imag?: number): Complex;
  public div(...rhs: [z: Complex] | [real: number, imag?: number]): Complex;
  public div(r: Complex | number, i = 0): Complex {
    return div(Complex, this, from(Complex, r, i));
  }

  public divide(z: Complex): Complex;
  public divide(real: number, imag?: number): Complex;
  public divide(...rhs: [z: Complex] | [real: number, imag?: number]): Complex;
  public divide(r: Complex | number, i = 0): Complex {
    return div(Complex, this, from(Complex, r, i));
  }

  public pow(z: Complex): Complex;
  public pow(real: number, imag?: number): Complex;
  public pow(...rhs: [z: Complex] | [real: number, imag?: number]): Complex;
  public pow(r: Complex | number, i = 0): Complex {
    return pow(Complex, this, from(Complex, r, i));
  }
}
