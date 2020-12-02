import mock from '../__fixtures__/mock';
import Spy from '../__fixtures__/spy';

import Complex from '../complex';
import Component from '../component';
import real from '../accessors/real';
import imag from '../accessors/imag';
import * as add from './add';

jest.mock('../accessors/real');
jest.mock('../accessors/imag');

const cartesian = jest.spyOn(Complex, 'cartesian');

beforeEach(() => {
  cartesian.mockReset();
  mock(real).mockReset();
  mock(imag).mockReset();
});

describe('add', () => {
  const sut = add.default;

  test.each([
    [[0, 0], [0, 0], [0, 0]],
    [[1, 2], [3, 4], [4, 6]],
    [[-1, 2], [3, -4], [2, -2]],
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

describe('Complex.prototype.add', () => {
  let sut: Spy<typeof add.default>;

  beforeAll(() => {
    sut = jest.spyOn(add, 'default');
  });

  afterAll(() => {
    sut.mockRestore();
  });

  it('should delegate to add', () => {
    const a = new Complex(1, 2, 0, 0, Component.CARTESIAN);
    const b = new Complex(3, 4, 0, 0, Component.CARTESIAN);

    const actual = a.add(b);

    expect(sut).toHaveBeenCalledWith(Complex, a, b);
    expect(sut).toHaveReturnedWith(actual);
  });
});
