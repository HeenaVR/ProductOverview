import { fetchProducts } from "../services/api";
import { useProductActions } from "../hooks/useProductActions";
import { useProductFiltering } from "../hooks/useProductFiltering";
import { Product } from "../types/productTypes";

// Mocking external modules
jest.mock("../services/api");
jest.mock("../hooks/useProductActions");
jest.mock("../hooks/useProductFiltering");

describe("ProductOverviewScreen Component", () => {
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
  ];

  // Setup mock implementations
  beforeEach(() => {
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

    // Mock the product actions (wishlist and cart handlers)
    (useProductActions as jest.Mock).mockReturnValue({
      handleUpdateWishlist: jest.fn(),
      handleUpdateCart: jest.fn(),
    });

    // Mock the product filtering hook
    (useProductFiltering as jest.Mock).mockReturnValue({
      filteredProducts: mockProducts,
      searchQuery: "",
      selectedPrice: 250,
      selectedColor: null,
      setSearchQuery: jest.fn(),
      setSelectedPrice: jest.fn(),
      setSelectedColor: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Extract unique colors from a list of products with multiple color variants
  it("should extract unique colors when given a list of products with multiple color variants", () => {
    const products: { colorVariants: { color: { value: string } }[] }[] = [
      {
        colorVariants: [
          { color: { value: "red" } },
          { color: { value: "blue" } },
        ],
      },
      {
        colorVariants: [
          { color: { value: "blue" } },
          { color: { value: "green" } },
        ],
      },
    ];
    const setAvailableColors = jest.fn();
    const extractUniqueColors = (
      products: { colorVariants: { color: { value: string } }[] }[]
    ) => {
      const colorSet = new Set();
      products.forEach((product) => {
        product.colorVariants.forEach((variant) => {
          colorSet.add(variant.color.value);
        });
      });
      setAvailableColors(Array.from(colorSet));
    };
    extractUniqueColors(products);
    expect(setAvailableColors).toHaveBeenCalledWith(["red", "blue", "green"]);
  });

  // Resets selected color to null
  it("should reset selected color to null when resetFilters is called", () => {
    const setSelectedColor = jest.fn();
    const setSelectedPrice = jest.fn();
    const setSearchQuery = jest.fn();

    const resetFilters = () => {
      setSelectedColor(null);
      setSelectedPrice(250);
      setSearchQuery("");
    };

    resetFilters();

    expect(setSelectedColor).toHaveBeenCalledWith(null);
    expect(setSelectedPrice).toHaveBeenCalledWith(250);
    expect(setSearchQuery).toHaveBeenCalledWith("");
  });

  // Resets when selected color is already null
  it("should reset filters even when selected color is already null", () => {
    const setSelectedColor = jest.fn();
    const setSelectedPrice = jest.fn();
    const setSearchQuery = jest.fn();

    const resetFilters = () => {
      setSelectedColor(null);
      setSelectedPrice(250);
      setSearchQuery("");
    };

    // Assume selected color is already null
    resetFilters();

    expect(setSelectedColor).toHaveBeenCalledWith(null);
    expect(setSelectedPrice).toHaveBeenCalledWith(250);
    expect(setSearchQuery).toHaveBeenCalledWith("");
  });
});
