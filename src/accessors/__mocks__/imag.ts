import Complex from '../../complex';

const imag = (z: Complex): number => z._imag;

export default jest.fn(imag);
