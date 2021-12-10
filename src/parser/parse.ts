import { Grammar, Parser } from 'nearley';
import grammar, { Expression } from './grammar';

const parser = new Parser(Grammar.fromCompiled(grammar));
const state = parser.save();

const feed = (chunk: string) => {
  try {
    return parser.feed(chunk);
  } catch (error: any) {
    const { token, offset } = error;
    const { value } = token;
    const column = offset + 1;
    const padding = ' '.repeat(offset);

    throw new SyntaxError(`Unexpected ${value} at column ${column}:\n\n${chunk}\n${padding}^`);
  }
};

const parse = (expression: string): Expression => {
  parser.restore(state);

  const { results } = feed(expression);

  if (results.length === 0) {
    throw new SyntaxError('Unexpected end of input');
  }

  return results[0];
};

export default parse;