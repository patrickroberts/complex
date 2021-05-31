import Callable from './callable';
import Constructible from './constructible';

type Spy<T extends Callable | Constructible> =
  T extends Callable ?
    jest.SpyInstance<ReturnType<T>, Parameters<T>> :
    T extends Constructible ?
      jest.SpyInstance<InstanceType<T>, ConstructorParameters<T>> :
      never;

export default Spy;
