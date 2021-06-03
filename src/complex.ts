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
import acos from './static/acos';
import acosh from './static/acosh';
import asin from './static/asin';
import asinh from './static/asinh';
import atan from './static/atan';
import atanh from './static/atanh';
import cbrt from './static/cbrt';
import conj from './static/conj';
import cos from './static/cos';
import cosh from './static/cosh';
import exp from './static/exp';
import log from './static/log';
import proj from './static/proj';
import sin from './static/sin';
import sinh from './static/sinh';
import sqrt from './static/sqrt';
import tan from './static/tan';
import tanh from './static/tanh';
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

  public static readonly 0 =
  new Complex(0, 0, 0, 0, Component.ALL);

  public static readonly 1 =
  new Complex(1, 0, 1, 0, Component.ALL);

  public static readonly E =
  new Complex(Math.E, 0, Math.E, 0, Component.ALL);

  public static readonly I =
  new Complex(0, 1, 1, Math.PI / 2, Component.ALL);

  public static readonly LN10 =
  new Complex(Math.LN10, 0, Math.LN10, 0, Component.ALL);

  public static readonly LN2 =
  new Complex(Math.LN2, 0, Math.LN2, 0, Component.ALL);

  public static readonly LOG10E =
  new Complex(Math.LOG10E, 0, Math.LOG10E, 0, Component.ALL);

  public static readonly LOG2E =
  new Complex(Math.LOG2E, 0, Math.LOG2E, 0, Component.ALL);

  public static readonly PI =
  new Complex(Math.PI, 0, Math.PI, 0, Component.ALL);

  public static readonly SQRT1_2 =
  new Complex(Math.SQRT1_2, 0, Math.SQRT1_2, 0, Component.ALL);

  public static readonly SQRT2 =
  new Complex(Math.SQRT2, 0, Math.SQRT2, 0, Component.ALL);

  /** @internal */
  public static readonly '1_2' =
  new Complex(0.5, 0, 0.5, 0, Component.ALL);

  /** @internal */
  public static readonly PI1_2 =
  new Complex(Math.PI / 2, 0, Math.PI / 2, 0, Component.ALL);

  /** @internal */
  public static readonly NEGATIVE_I =
  new Complex(0, -1, 1, -Math.PI / 2, Component.ALL);

  /** @internal */
  public static readonly I1_2 =
  new Complex(0, 0.5, 0.5, Math.PI / 2, Component.ALL);

  public static cartesian(real: number, imag = 0): Complex {
    return cartesian(Complex, real, imag);
  }

  public static polar(abs: number, arg = 0): Complex {
    return polar(Complex, abs, arg);
  }

  public static acos(z: Complex): Complex;
  public static acos(real: number, imag?: number): Complex;
  public static acos(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static acos(r: Complex | number, i = 0): Complex {
    return acos(Complex, from(Complex, r, i));
  }

  public static acosh(z: Complex): Complex;
  public static acosh(real: number, imag?: number): Complex;
  public static acosh(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static acosh(r: Complex | number, i = 0): Complex {
    return acosh(Complex, from(Complex, r, i));
  }

  public static asin(z: Complex): Complex;
  public static asin(real: number, imag?: number): Complex;
  public static asin(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static asin(r: Complex | number, i = 0): Complex {
    return asin(Complex, from(Complex, r, i));
  }

  public static asinh(z: Complex): Complex;
  public static asinh(real: number, imag?: number): Complex;
  public static asinh(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static asinh(r: Complex | number, i = 0): Complex {
    return asinh(Complex, from(Complex, r, i));
  }

  public static atan(z: Complex): Complex;
  public static atan(real: number, imag?: number): Complex;
  public static atan(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static atan(r: Complex | number, i = 0): Complex {
    return atan(Complex, from(Complex, r, i));
  }

  public static atanh(z: Complex): Complex;
  public static atanh(real: number, imag?: number): Complex;
  public static atanh(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static atanh(r: Complex | number, i = 0): Complex {
    return atanh(Complex, from(Complex, r, i));
  }

  public static cbrt(z: Complex): Complex;
  public static cbrt(real: number, imag?: number): Complex;
  public static cbrt(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static cbrt(r: Complex | number, i = 0): Complex {
    return cbrt(Complex, from(Complex, r, i));
  }

  public static conj(z: Complex): Complex;
  public static conj(real: number, imag?: number): Complex;
  public static conj(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static conj(r: Complex | number, i = 0): Complex {
    return conj(Complex, from(Complex, r, i));
  }

  public static cos(z: Complex): Complex;
  public static cos(real: number, imag?: number): Complex;
  public static cos(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static cos(r: Complex | number, i = 0): Complex {
    return cos(Complex, from(Complex, r, i));
  }

  public static cosh(z: Complex): Complex;
  public static cosh(real: number, imag?: number): Complex;
  public static cosh(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static cosh(r: Complex | number, i = 0): Complex {
    return cosh(Complex, from(Complex, r, i));
  }

  public static exp(z: Complex): Complex;
  public static exp(real: number, imag?: number): Complex;
  public static exp(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static exp(r: Complex | number, i = 0): Complex {
    return exp(Complex, from(Complex, r, i));
  }

  public static log(z: Complex): Complex;
  public static log(real: number, imag?: number): Complex;
  public static log(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static log(r: Complex | number, i = 0): Complex {
    return log(Complex, from(Complex, r, i));
  }

  public static proj(z: Complex): Complex;
  public static proj(real: number, imag?: number): Complex;
  public static proj(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static proj(r: Complex | number, i = 0): Complex {
    return proj(Complex, from(Complex, r, i));
  }

  public static sin(z: Complex): Complex;
  public static sin(real: number, imag?: number): Complex;
  public static sin(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static sin(r: Complex | number, i = 0): Complex {
    return sin(Complex, from(Complex, r, i));
  }

  public static sinh(z: Complex): Complex;
  public static sinh(real: number, imag?: number): Complex;
  public static sinh(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static sinh(r: Complex | number, i = 0): Complex {
    return sinh(Complex, from(Complex, r, i));
  }

  public static sqrt(z: Complex): Complex;
  public static sqrt(real: number, imag?: number): Complex;
  public static sqrt(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static sqrt(r: Complex | number, i = 0): Complex {
    return sqrt(Complex, from(Complex, r, i));
  }

  public static tan(z: Complex): Complex;
  public static tan(real: number, imag?: number): Complex;
  public static tan(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static tan(r: Complex | number, i = 0): Complex {
    return tan(Complex, from(Complex, r, i));
  }

  public static tanh(z: Complex): Complex;
  public static tanh(real: number, imag?: number): Complex;
  public static tanh(...args: [z: Complex] | [real: number, imag?: number]): Complex;
  public static tanh(r: Complex | number, i = 0): Complex {
    return tanh(Complex, from(Complex, r, i));
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
