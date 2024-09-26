export interface Product {
  id: string;
  detail: string;
  price: number;
  colorVariants: Array<{
    shoppingCart: boolean;
    wishList: boolean;
    color: { value: string };
    pictures: { front: string; back: string; flat: string; outfit: string };
  }>;
}
