import Complex from '../../complex';

export default jest.fn((z: Complex): number => z._imag);
