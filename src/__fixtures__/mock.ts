import Callable from './callable';
import Constructible from './constructible';

type Mock<T extends Callable | Constructible> =
  T extends Callable ?
    jest.Mock<ReturnType<T>, Parameters<T>> :
    T extends Constructible ?
      jest.Mock<InstanceType<T>, ConstructorParameters<T>> :
      never;

export { Mock };

export default <T extends Callable | Constructible> (
  fn: T,
): Mock<T> => fn as unknown as Mock<T>;
