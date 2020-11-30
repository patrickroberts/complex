export default <T extends (...args: any) => any>(fn: T):
jest.Mock<ReturnType<T>, Parameters<T>> => fn as unknown as jest.Mock<ReturnType<T>, Parameters<T>>;
