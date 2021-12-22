import Complex from '../../complex';

const imag = (_: typeof Complex, z: Complex): number => z._imag;

export default jest.fn(imag);
