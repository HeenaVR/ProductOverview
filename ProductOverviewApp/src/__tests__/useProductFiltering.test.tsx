import { renderHook, act } from "@testing-library/react-hooks";
import { useProductFiltering } from "../hooks/useProductFiltering";
import { Product } from "../types/productTypes";

describe("useProductFiltering", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      detail: "Red Shirt",
      price: 50,
      colorVariants: [
        {
          color: { value: "red" },
          pictures: {
            front: "url-to-front-image",
            back: "url-to-back-image",
            flat: "url-to-flat-image",
            outfit: "url-to-outfit-image",
          },
          shoppingCart: false,
          wishList: false,
        },
      ],
    },
    {
      id: "2",
      detail: "Blue Jeans",
      price: 100,
      colorVariants: [
        {
          color: { value: "blue" },
          pictures: {
            front: "url-to-front-image",
            back: "url-to-back-image",
            flat: "url-to-flat-image",
            outfit: "url-to-outfit-image",
          },
          shoppingCart: false,
          wishList: false,
        },
      ],
    },
    {
      id: "3",
      detail: "Green Hat",
      price: 150,
      colorVariants: [
        {
          color: { value: "green" },
          pictures: {
            front: "url-to-front-image",
            back: "url-to-back-image",
            flat: "url-to-flat-image",
            outfit: "url-to-outfit-image",
          },
          shoppingCart: false,
          wishList: false,
        },
      ],
    },
    {
      id: "4",
      detail: "Yellow Jacket",
      price: 200,
      colorVariants: [
        {
          color: { value: "yellow" },
          pictures: {
            front: "url-to-front-image",
            back: "url-to-back-image",
            flat: "url-to-flat-image",
            outfit: "url-to-outfit-image",
          },
          shoppingCart: false,
          wishList: false,
        },
      ],
    },
    {
      id: "5",
      detail: "Black Shoes",
      price: 300,
      colorVariants: [
        {
          color: { value: "black" },
          pictures: {
            front: "url-to-front-image",
            back: "url-to-back-image",
            flat: "url-to-flat-image",
            outfit: "url-to-outfit-image",
          },
          shoppingCart: false,
          wishList: false,
        },
      ],
    },
  ];

  it("should filter products based on search query", () => {
    const { result } = renderHook(() => useProductFiltering(mockProducts));
    act(() => {
      result.current.setSearchQuery("Red");
    });
    expect(result.current.filteredProducts).toEqual([mockProducts[0]]);
  });

  it("should filter products based on selected price", () => {
    const { result } = renderHook(() => useProductFiltering(mockProducts));
    act(() => {
      result.current.setSelectedPrice(150);
    });
    expect(result.current.filteredProducts).toEqual(mockProducts.slice(0, 3)); // Products priced 150 and below
  });

  it("should filter products based on selected color", () => {
    const { result } = renderHook(() => useProductFiltering(mockProducts));
    act(() => {
      result.current.setSelectedColor("red");
    });
    expect(result.current.filteredProducts).toEqual([mockProducts[0]]); // Only Red Shirt should be returned
  });

  it("should apply multiple filters (search and color)", () => {
    const { result } = renderHook(() => useProductFiltering(mockProducts));
    act(() => {
      result.current.setSearchQuery("Shirt");
      result.current.setSelectedColor("red");
    });
    expect(result.current.filteredProducts).toEqual([mockProducts[0]]); // Only the Red Shirt matches both filters
  });

  it("should apply multiple filters (search and price)", () => {
    const { result } = renderHook(() => useProductFiltering(mockProducts));
    act(() => {
      result.current.setSearchQuery("Hat");
      result.current.setSelectedPrice(200);
    });
    expect(result.current.filteredProducts).toEqual([mockProducts[2]]); // Only the Green Hat should be returned
  });

  it("should return an empty array when no products match the filters", () => {
    const { result } = renderHook(() => useProductFiltering(mockProducts));
    act(() => {
      result.current.setSearchQuery("Non-existent product");
    });
    expect(result.current.filteredProducts).toEqual([]); // No product matches
  });
});
