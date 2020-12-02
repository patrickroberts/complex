import mock from '../__fixtures__/mock';
import Spy from '../__fixtures__/spy';

import Complex from '../complex';
import Component from '../component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import * as subtract from './subtract';

jest.mock('../accessors/real');
jest.mock('../accessors/imag');

const cartesian = jest.spyOn(Complex, 'cartesian');

beforeEach(() => {
  cartesian.mockReset();
  mock(real).mockReset();
  mock(imag).mockReset();
});

describe('subtract', () => {
  const sut = subtract.default;

  test.each([
    [[0, 0], [0, 0], [0, 0]],
    [[1, 2], [3, 4], [-2, -2]],
    [[-1, 2], [3, -4], [-4, 6]],
  ])('should compute cartesian components', (lhs, rhs, expected) => {
    const a = new Complex(lhs[0], lhs[1], 0, 0, Component.CARTESIAN);
    const b = new Complex(rhs[0], rhs[1], 0, 0, Component.CARTESIAN);

    mock(real).mockImplementation((z) => z._real);
    mock(imag).mockImplementation((z) => z._imag);

    sut(Complex, a, b);

    expect(real).toHaveBeenCalledWith(a);
    expect(real).toHaveBeenCalledWith(b);
    expect(imag).toHaveBeenCalledWith(a);
    expect(imag).toHaveBeenCalledWith(b);
    expect(cartesian).toHaveBeenCalledWith(expected[0], expected[1]);
  });
});

describe('Complex.prototype.subtract', () => {
  let sut: Spy<typeof subtract.default>;

  beforeAll(() => {
    sut = jest.spyOn(subtract, 'default');
  });

  afterAll(() => {
    sut.mockRestore();
  });

  it('should delegate to subtract', () => {
    const a = new Complex(1, 2, 0, 0, Component.CARTESIAN);
    const b = new Complex(3, 4, 0, 0, Component.CARTESIAN);

    const actual = a.subtract(b);

    expect(sut).toHaveBeenCalledWith(Complex, a, b);
    expect(sut).toHaveReturnedWith(actual);
  });
});
