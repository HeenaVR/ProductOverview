import { useState } from "react";

export const useProductActions = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const generateUniqueKey = (productId: string, colorIndex: number) => {
    return `${productId}-${colorIndex}`;
  };

  const handleUpdateWishlist = (
    productId: string,
    colorIndex: number,
    inWishlist: boolean
  ) => {
    const uniqueKey = generateUniqueKey(productId, colorIndex);
    setWishlist((prevWishlist) =>
      inWishlist
        ? [...prevWishlist, uniqueKey]
        : prevWishlist.filter((key) => key !== uniqueKey)
    );
  };

  const handleUpdateCart = (
    productId: string,
    colorIndex: number,
    inCart: boolean
  ) => {
    const uniqueKey = generateUniqueKey(productId, colorIndex);
    setCart((prevCart) =>
      inCart
        ? [...prevCart, uniqueKey]
        : prevCart.filter((key) => key !== uniqueKey)
    );
  };

  return { wishlist, cart, handleUpdateWishlist, handleUpdateCart };
};
