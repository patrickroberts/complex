import Complex from '../../complex';

export default jest.fn((_: typeof Complex, z: Complex): number => z._real);
