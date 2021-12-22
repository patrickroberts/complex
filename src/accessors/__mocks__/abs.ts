import Complex from '../../complex';

const abs = (_: typeof Complex, z: Complex): number => z._abs;

export default jest.fn(abs);
