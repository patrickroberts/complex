import { BinaryExpression, CallExpression, Identifier, Literal, UnaryExpression } from './grammar';
import sut from './parse';

describe('parse', () => {
  it('should throw on unexpected end of input', () => {
    expect(() => sut('')).toThrowError('Unexpected end of input');
  });

  test.each(
    [')', ',', '*', '/', '%'],
  )('should throw on unexpected tokens', (token) => {
    expect(() => sut(token)).toThrowError(
      `Unexpected ${token} at column 1:\n\n${token}\n^`,
    );
  });

  test.each(
    ['$', 'A', 'Z', '_', 'a', 'z', 'b$', 'c0', 'd9', 'eA', 'fZ', 'h_', 'ia', 'jz'],
  )('should parse an identifier', (name) => {
    expect(sut(name)).toEqual<Identifier>({
      type: 'Identifier', name,
    });
  });

  test.each<BinaryExpression['operator']>(
    ['+', '-', '*', '/', '%', '**'],
  )('should parse a binary expression', (operator) => {
    expect(sut(`a ${operator} b`)).toEqual<BinaryExpression>({
      type: 'BinaryExpression',
      operator,
      left: { type: 'Identifier', name: 'a' },
      right: { type: 'Identifier', name: 'b' },
    });
  });

  describe.each<UnaryExpression['operator']>(['+', '-'])('unary expressions', (operator) => {
    it('should parse a unary expression', () => {
      expect(sut(`${operator} a`)).toEqual<UnaryExpression>({
        type: 'UnaryExpression',
        operator,
        argument: { type: 'Identifier', name: 'a' },
      });
    });

    it('should disallow unary expression before exponentiation', () => {
      const expression = `${operator} a ** b`;

      expect(() => sut(expression)).toThrowError(
        `Unexpected * at column 6:\n\n${expression}\n     ^`,
      );
    });

    it('should disambiguate unary expression in exponentiation', () => {
      const expression = `(${operator} a) ** b`;

      expect(sut(expression)).toEqual<BinaryExpression>({
        type: 'BinaryExpression',
        operator: '**',
        left: {
          type: 'UnaryExpression',
          operator,
          argument: { type: 'Identifier', name: 'a' },
        },
        right: { type: 'Identifier', name: 'b' },
      });
    });

    it('should disambiguate exponentiation in unary expression', () => {
      const expression = `${operator}(a ** b)`;

      expect(sut(expression)).toEqual<UnaryExpression>({
        type: 'UnaryExpression',
        operator,
        argument: {
          type: 'BinaryExpression',
          operator: '**',
          left: { type: 'Identifier', name: 'a' },
          right: { type: 'Identifier', name: 'b' },
        },
      });
    });
  });

  test.each(
    ['0.', '1.e2', '30.4', '56.7E-89', '.012', '.3e+4', '0', '0E56', '789', '0b0', '0B11', '0o7', '0O531', '0xa', '0XF90A'],
  )('should parse a literal', (expression) => {
    expect(sut(expression)).toEqual<Literal>({
      type: 'Literal',
      value: Number(expression),
    });
  });

  it('should disallow leading zero integer literal', () => {
    expect(() => sut('09')).toThrowError(
      'Unexpected 9 at column 2:\n\n09\n ^',
    );
  });

  test.each<[string, number[]]>(
    [['f', []], ['g', [1]], ['h', [2, 3]]],
  )('should parse a call expression', (name, values) => {
    const expression = `${name}(${values.join(', ')})`;

    expect(sut(expression)).toEqual<CallExpression>({
      type: 'CallExpression',
      callee: { type: 'Identifier', name },
      arguments: values.map((value): Literal => ({
        type: 'Literal',
        value,
      })),
    });
  });
});
