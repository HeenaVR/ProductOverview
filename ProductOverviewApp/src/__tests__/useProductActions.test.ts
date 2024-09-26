import { renderHook, act } from "@testing-library/react-hooks";
import { useProductActions } from "../hooks/useProductActions";

describe("useProductActions Hook", () => {
  it("should initialize wishlist and cart as empty arrays", () => {
    const { result } = renderHook(() => useProductActions());
    expect(result.current.wishlist).toEqual([]);
    expect(result.current.cart).toEqual([]);
  });

  it("should add a product to the wishlist when inWishlist is true", () => {
    const { result } = renderHook(() => useProductActions());
    const productId = "product1";
    const colorIndex = 1;

    act(() => {
      result.current.handleUpdateWishlist(productId, colorIndex, true);
    });

    expect(result.current.wishlist).toContain("product1-1");
  });

  it("should remove a product from the wishlist when inWishlist is false", () => {
    const { result } = renderHook(() => useProductActions());
    const productId = "product1";
    const colorIndex = 1;

    act(() => {
      result.current.handleUpdateWishlist(productId, colorIndex, true);
    });

    act(() => {
      result.current.handleUpdateWishlist(productId, colorIndex, false);
    });

    expect(result.current.wishlist).not.toContain("product1-1");
  });

  it("should add a product to the cart when inCart is true", () => {
    const { result } = renderHook(() => useProductActions());
    const productId = "product2";
    const colorIndex = 2;

    act(() => {
      result.current.handleUpdateCart(productId, colorIndex, true);
    });

    expect(result.current.cart).toContain("product2-2");
  });

  it("should remove a product from the cart when inCart is false", () => {
    const { result } = renderHook(() => useProductActions());
    const productId = "product2";
    const colorIndex = 2;

    act(() => {
      result.current.handleUpdateCart(productId, colorIndex, true);
    });

    act(() => {
      result.current.handleUpdateCart(productId, colorIndex, false);
    });

    expect(result.current.cart).not.toContain("product2-2");
  });

  it("should generate unique keys correctly for product and color combinations", () => {
    const { result } = renderHook(() => useProductActions());
    const key1 = result.current.generateUniqueKey("product1", 0);
    const key2 = result.current.generateUniqueKey("product1", 1);
    const key3 = result.current.generateUniqueKey("product2", 0);

    expect(key1).toBe("product1-0");
    expect(key2).toBe("product1-1");
    expect(key3).toBe("product2-0");
  });
});
