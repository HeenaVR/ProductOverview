export const loadAsync = jest.fn();
export const unloadAsync = jest.fn();
export const isLoadedAsync = jest.fn(() => Promise.resolve(true));
