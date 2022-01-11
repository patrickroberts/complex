import Complex from '../../complex';

const real = (z: Complex): number => z._real;

export default jest.fn(real);
