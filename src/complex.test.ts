import _ from './__fixtures__/any/number';
import mock from './__fixtures__/mock';

import Complex from './complex';
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

jest.mock('./internal/principal');
jest.mock('./accessors/real');
jest.mock('./accessors/imag');
jest.mock('./accessors/abs');
jest.mock('./accessors/arg');
jest.mock('./accessors/norm');
jest.mock('./methods/add');
jest.mock('./methods/sub');
jest.mock('./methods/mul');
jest.mock('./methods/div');
jest.mock('./methods/pow');

beforeEach(() => {
  mock(principal).mockClear();
  mock(real).mockClear();
  mock(imag).mockClear();
  mock(abs).mockClear();
  mock(arg).mockClear();
  mock(norm).mockClear();
  mock(add).mockClear();
  mock(sub).mockClear();
  mock(mul).mockClear();
  mock(div).mockClear();
  mock(pow).mockClear();
});

describe('constructor', () => {
  it('should initialize components', () => {
    const testReal = {} as number;
    const testImag = {} as number;
    const testAbs = {} as number;

    const actual = new Complex(testReal, testImag, testAbs, _, _);

    expect(actual._real).toBe(testReal);
    expect(actual._imag).toBe(testImag);
    expect(actual._abs).toBe(testAbs);
  });

  it('should restrict argument to the principal branch', () => {
    const testArg = {} as number;
    const expectedArg = {} as number;

    mock(principal).mockReturnValueOnce(expectedArg);

    const actual = new Complex(_, _, _, testArg, _);

    expect(principal).toHaveBeenCalledWith(testArg);
    expect(actual._arg).toBe(expectedArg);
  });

  it('should initialize computed components mask', () => {
    const testHas = {} as Component;

    const actual = new Complex(_, _, _, _, testHas);

    expect(actual._has).toBe(testHas);
  });
});

describe.each<['real' | 'imag' | 'abs' | 'arg' | 'norm', typeof real]>([
  ['real', real],
  ['imag', imag],
  ['abs', abs],
  ['arg', arg],
  ['norm', norm],
])('accessors', (name, impl) => {
  describe(`Complex.prototype.${name}`, () => {
    it(`should delegate to ${name}`, () => {
      const expected = {} as number;
      const z = new Complex(_, _, _, _, _);

      expect(impl).not.toHaveBeenCalled();
      mock(impl).mockReturnValueOnce(expected);

      const actual = z[name];

      expect(impl).toHaveBeenCalledWith(z);
      expect(actual).toBe(expected);
    });

    it('should throw TypeError if called on incompatible receiver', () => {
      const get = Object.getOwnPropertyDescriptor(Complex.prototype, name)!.get!;
      const z = {} as Complex;

      expect(() => get.call(z)).toThrow(
        new TypeError(
          `Method get Complex.prototype.${name} called on incompatible receiver`,
        ),
      );
      expect(impl).not.toHaveBeenCalled();
    });
  });
});

describe.each<['add' | 'sub' | 'mul' | 'div' | 'pow', typeof add]>([
  ['add', add],
  ['sub', sub],
  ['mul', mul],
  ['div', div],
  ['pow', pow],
])('methods', (name, impl) => {
  describe(`Complex.prototype.${name}`, () => {
    it(`should delegate to ${name}`, () => {
      const lhs = new Complex(_, _, _, _, _);
      const rhs = {} as Complex;
      const expected = {} as Complex;

      mock(impl).mockReturnValueOnce(expected);

      const actual = lhs[name](rhs);

      expect(impl).toHaveBeenCalledWith(Complex, lhs, rhs);
      expect(actual).toBe(expected);
    });

    it('should throw TypeError if called on incompatible receiver', () => {
      const method = Complex.prototype[name];
      const lhs = {} as Complex;
      const rhs = {} as Complex;

      expect(() => method.call(lhs, rhs)).toThrow(
        new TypeError(
          `Method Complex.prototype.${name} called on incompatible receiver`,
        ),
      );
      expect(impl).not.toHaveBeenCalled();
    });
  });
});
