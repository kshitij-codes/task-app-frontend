const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
	key: jest.fn(),
	length: 0,
};

global.localStorage = localStorageMock;
