import Complex from '../../complex';

const arg = (_: typeof Complex, z: Complex): number => z._arg;

export default jest.fn(arg);
