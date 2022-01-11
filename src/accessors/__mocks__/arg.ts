import Complex from '../../complex';

const arg = (z: Complex): number => z._arg;

export default jest.fn(arg);
