import sut from './arg';

test.each([
  [1, 0, 0],
  [-1, 0, Math.PI],
  [0, 1, 0.5 * Math.PI],
  [0, -1, -0.5 * Math.PI],
  [3, 4, 0.9272952180016122],
  [3, -4, -0.9272952180016122],
  [-3, 4, 2.214297435588181],
  [-3, -4, -2.214297435588181],
  [3e307, 4e307, 0.9272952180016122],
  [3e-307, 4e-307, 0.9272952180016122],
])('should return argument', (testReal, testImag, expectedArg) => {
  const actualArg = sut(testReal, testImag);

  expect(actualArg).toBeCloseTo(expectedArg, 14);
});
