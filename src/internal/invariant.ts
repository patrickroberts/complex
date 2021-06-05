import Complex from '../complex';

const invariant = (Ctor: typeof Complex, z: Complex): void => {
  if (!(z instanceof Ctor)) {
    throw new TypeError('Complex method called on incompatible receiver');
  }
};

export default invariant;
