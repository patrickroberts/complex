import Complex from '../../complex';

const abs = (z: Complex): number => z._abs;

export default jest.fn(abs);
