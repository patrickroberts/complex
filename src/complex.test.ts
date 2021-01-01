import _ from './__fixtures__/any/number';
import mock from './__fixtures__/mock';

import Complex from './complex';
import Component from './internal/component';
import principal from './internal/principal';
import real from './accessors/real';
import imag from './accessors/imag';
import abs from './accessors/abs';
import arg from './accessors/arg';
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

jest.mock('./internal/principal');
jest.mock('./accessors/real');
jest.mock('./accessors/imag');
jest.mock('./accessors/abs');
jest.mock('./accessors/arg');
jest.mock('./static/from');
jest.mock('./static/cartesian');
jest.mock('./static/polar');
jest.mock('./static/exp');
jest.mock('./static/log');
jest.mock('./methods/add');
jest.mock('./methods/subtract');
jest.mock('./methods/multiply');
jest.mock('./methods/divide');
jest.mock('./methods/pow');

beforeEach(() => {
  mock(principal).mockClear();
  mock(real).mockClear();
  mock(imag).mockClear();
  mock(abs).mockClear();
  mock(arg).mockClear();
  mock(from).mockClear();
  mock(cartesian).mockClear();
  mock(polar).mockClear();
  mock(exp).mockClear();
  mock(log).mockClear();
  mock(add).mockClear();
  mock(subtract).mockClear();
  mock(multiply).mockClear();
  mock(divide).mockClear();
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

describe.each<['real' | 'imag' | 'abs' | 'arg', typeof real]>([
  ['real', real],
  ['imag', imag],
  ['abs', abs],
  ['arg', arg],
])('accessors', (accessor, impl) => {
  describe(`Complex.prototype.${accessor}`, () => {
    it(`should delegate to ${accessor}`, () => {
      const expected = {} as number;
      const z = new Complex(_, _, _, _, _);

      expect(impl).not.toHaveBeenCalled();
      mock(impl).mockReturnValueOnce(expected);

      const actual = z[accessor];

      expect(impl).toHaveBeenCalledWith(z);
      expect(actual).toBe(expected);
    });
  });
});

describe('Complex.cartesian', () => {
  it('should delegate to cartesian', () => {
    const testReal = {} as number;
    const testImag = {} as number;
    const expected = {} as Complex;

    mock(cartesian).mockReturnValueOnce(expected);

    const actual = Complex.cartesian(testReal, testImag);

    expect(cartesian).toHaveBeenCalledWith(Complex, testReal, testImag);
    expect(actual).toBe(expected);
  });

  it('should delegate to cartesian with default imaginary value of 0', () => {
    const testReal = {} as number;
    const expected = {} as Complex;

    mock(cartesian).mockReturnValueOnce(expected);

    const actual = Complex.cartesian(testReal);

    expect(cartesian).toHaveBeenCalledWith(Complex, testReal, 0);
    expect(actual).toBe(expected);
  });
});

describe('Complex.polar', () => {
  it('should delegate to polar', () => {
    const testAbs = {} as number;
    const testArg = {} as number;
    const expected = {} as Complex;

    mock(polar).mockReturnValueOnce(expected);

    const actual = Complex.polar(testAbs, testArg);

    expect(polar).toHaveBeenCalledWith(Complex, testAbs, testArg);
    expect(actual).toBe(expected);
  });

  it('should delegate to polar with default argument of 0', () => {
    const testAbs = {} as number;
    const expected = {} as Complex;

    mock(polar).mockReturnValueOnce(expected);

    const actual = Complex.polar(testAbs);

    expect(polar).toHaveBeenCalledWith(Complex, testAbs, 0);
    expect(actual).toBe(expected);
  });
});

describe.each<['exp' | 'log', typeof exp]>([
  ['exp', exp],
  ['log', log],
])('static methods', (method, impl) => {
  describe(`Complex.${method}`, () => {
    it(`should delegate to ${method} with Complex value`, () => {
      const z = {} as Complex;
      const expected = {} as Complex;

      mock(from).mockReturnValueOnce(z);
      mock(impl).mockReturnValueOnce(expected);

      const actual = Complex[method](z);

      expect(from).toHaveBeenCalledWith(Complex, z, 0);
      expect(impl).toHaveBeenCalledWith(Complex, z);
      expect(actual).toBe(expected);
    });

    it(`should delegate to ${method} with real and imaginary values`, () => {
      const testReal = {} as number;
      const testImag = {} as number;
      const z = {} as Complex;
      const expected = {} as Complex;

      mock(from).mockReturnValueOnce(z);
      mock(impl).mockReturnValueOnce(expected);

      const actual = Complex[method](testReal, testImag);

      expect(from).toHaveBeenCalledWith(Complex, testReal, testImag);
      expect(impl).toHaveBeenCalledWith(Complex, z);
      expect(actual).toBe(expected);
    });
  });
});

describe.each<['add' | 'subtract' | 'multiply' | 'divide' | 'pow', typeof add]>([
  ['add', add],
  ['subtract', subtract],
  ['multiply', multiply],
  ['divide', divide],
  ['pow', pow],
])('methods', (method, impl) => {
  describe(`Complex.prototype.${method}`, () => {
    it(`should delegate to ${method} with Complex value`, () => {
      const lhs = new Complex(_, _, _, _, _);
      const rhs = {} as Complex;
      const expected = {} as Complex;

      mock(from).mockReturnValueOnce(rhs);
      mock(impl).mockReturnValueOnce(expected);

      const actual = lhs[method](rhs);

      expect(from).toHaveBeenCalledWith(Complex, rhs, 0);
      expect(impl).toHaveBeenCalledWith(Complex, lhs, rhs);
      expect(actual).toBe(expected);
    });

    it(`should delegate to ${method} with real and imaginary values`, () => {
      const lhs = new Complex(_, _, _, _, _);
      const testReal = {} as number;
      const testImag = {} as number;
      const rhs = {} as Complex;
      const expected = {} as Complex;

      mock(from).mockReturnValueOnce(rhs);
      mock(impl).mockReturnValueOnce(expected);

      const actual = lhs[method](testReal, testImag);

      expect(from).toHaveBeenCalledWith(Complex, testReal, testImag);
      expect(impl).toHaveBeenCalledWith(Complex, lhs, rhs);
      expect(actual).toBe(expected);
    });
  });
});
