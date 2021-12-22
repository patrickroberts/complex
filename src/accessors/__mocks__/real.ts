import Complex from '../../complex';

const real = (_: typeof Complex, z: Complex): number => z._real;

export default jest.fn(real);
