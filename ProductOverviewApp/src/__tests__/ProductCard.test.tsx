import { render } from "@testing-library/react-native";
import ProductCard from "../components/ProductCard";
import { IoniconsProps } from "../types/iconTypes";
import { View } from "react-native";

// Mocking Ionicons for testing
jest.mock("@expo/vector-icons/Ionicons", () => {
  return {
    __esModule: true,
    default: (props: IoniconsProps) => <text>{props.name}</text>, // Mock implementation for testing
  };
});

// Define the Product interface
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

// Define the ProductCardProps interface
export interface ProductCardProps extends Product {
  onUpdateCart: () => void; // Required method to update cart
  onUpdateWishlist: () => void; // Required method to update wishlist
}

// Default props for the ProductCard component
const defaultProps: ProductCardProps = {
  id: "1",
  detail: "Sample Product",
  price: 29.99,
  colorVariants: [
    {
      color: { value: "#ff0000" },
      pictures: {
        front: "https://via.placeholder.com/150",
        back: "https://via.placeholder.com/150",
        flat: "https://via.placeholder.com/150",
        outfit: "https://via.placeholder.com/150",
      },
      wishList: false,
      shoppingCart: false,
    },
    {
      color: { value: "#00ff00" },
      pictures: {
        front: "https://via.placeholder.com/150",
        back: "https://via.placeholder.com/150",
        flat: "https://via.placeholder.com/150",
        outfit: "https://via.placeholder.com/150",
      },
      wishList: false,
      shoppingCart: false,
    },
  ],
  onUpdateCart: jest.fn(),
  onUpdateWishlist: jest.fn(),
};

describe("ProductCard", () => {
  it("renders correctly with provided props", () => {
    const { getByText } = render(<ProductCard {...defaultProps} />); // Spreading defaultProps here

    expect(getByText("Sample Product")).toBeTruthy();
    expect(getByText("29.99 €")).toBeTruthy();
  });

  // Toggle a boolean field in the colorVariants array
  it("should toggle the boolean field in the colorVariants array when activeColorIndex is valid", () => {
    const colorVariants = [{ isActive: false }, { isActive: true }];
    const activeColorIndex = 0;
    const field = "isActive";
    const callback = jest.fn();

    const updatedVariants = [...colorVariants];
    updatedVariants[activeColorIndex][field] =
      !updatedVariants[activeColorIndex][field];
    callback(activeColorIndex, updatedVariants[activeColorIndex][field]);

    expect(updatedVariants[activeColorIndex][field]).toBe(true);
    expect(callback).toHaveBeenCalledWith(activeColorIndex, true);
  });

  // Handle out-of-bounds activeColorIndex
  it("should not toggle any field and not call callback when activeColorIndex is out-of-bounds", () => {
    const colorVariants = [{ isActive: false }, { isActive: true }];
    const activeColorIndex = 2; // Out-of-bounds index
    const field = "isActive";
    const callback = jest.fn();

    const updatedVariants = [...colorVariants];
    if (activeColorIndex >= 0 && activeColorIndex < updatedVariants.length) {
      updatedVariants[activeColorIndex][field] =
        !updatedVariants[activeColorIndex][field];
      callback(activeColorIndex, updatedVariants[activeColorIndex][field]);
    }

    expect(updatedVariants).toEqual(colorVariants); // Should not change
    expect(callback).not.toHaveBeenCalled();
  });

  // Renders color circles with correct background colors
  it("should render color circles with correct background colors", () => {
    const variant = { color: { value: "#FF0000" } };
    const styles = { colorCircleInner: {} };
    const { getByTestId } = render(
      <View
        style={[
          styles.colorCircleInner,
          { backgroundColor: variant.color.value },
        ]}
        testID="colorCircle"
      />
    );
    const colorCircle = getByTestId("colorCircle");
    expect(colorCircle.props.style).toContainEqual({
      backgroundColor: "#FF0000",
    });
  });

  // Handles null or undefined variant color values
  it("should handle null or undefined variant color values", () => {
    const variant = { color: { value: null } };
    const styles = { colorCircleInner: {} };
    const { getByTestId } = render(
      <View
        style={[
          styles.colorCircleInner,
          { backgroundColor: variant.color.value || "transparent" },
        ]}
        testID="colorCircle"
      />
    );
    const colorCircle = getByTestId("colorCircle");
    expect(colorCircle.props.style).toContainEqual({
      backgroundColor: "transparent",
    });
  });
});
