import { fetchProducts } from '../services/api';

// Mock the fetch function
global.fetch = jest.fn();

describe('fetchProducts', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks after each test
  });

  it('should fetch products successfully', async () => {
    const mockResponse = [
      { id: "1", detail: "Red Shirt", price: 50 },
      { id: "2", detail: "Blue Jeans", price: 100 },
    ];

    // Setup the mock implementation for fetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const products = await fetchProducts();
    expect(products).toEqual(mockResponse); // Validate the returned data
    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/articles");
  });

  it('should throw an error when the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchProducts()).rejects.toThrow("Network response was not ok"); // Expecting the error thrown
  });

  it('should log an error message on network failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(); // Mock console.error
    const mockError = new Error("Network error");

    (fetch as jest.Mock).mockRejectedValueOnce(mockError); // Simulate fetch error

    await expect(fetchProducts()).rejects.toThrow(mockError); // Expect the function to throw the same error
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error fetching product data:", mockError); // Validate logging

    consoleErrorSpy.mockRestore(); // Restore original console.error
  });
});
