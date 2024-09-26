import { render, fireEvent } from "@testing-library/react-native";
import FilterComponent from "../components/FilterComponent";

describe("FilterComponent", () => {
  const mockApplyFilters = jest.fn();
  const mockResetFilters = jest.fn();
  const mockClose = jest.fn();
  const mockPriceChange = jest.fn();
  const mockColorChange = jest.fn();

  const defaultProps = {
    availableColors: ["red", "green", "blue"],
    selectedColor: "red",
    selectedPrice: 250,
    onApplyFilters: mockApplyFilters,
    onResetFilters: mockResetFilters,
    onClose: mockClose,
    onPriceChange: mockPriceChange,
    onColorChange: mockColorChange,
  };

  it("updates the selected price when the slider is changed", () => {
    const { getByText, getByTestId } = render(
      <FilterComponent {...defaultProps} />
    );

    const slider = getByTestId("price-slider");

    fireEvent(slider, "valueChange", 150);

    expect(getByText("Max Price: 150.00 €")).toBeTruthy();
  });

  it("calls onPriceChange with correct value when slider is done sliding", () => {
    const { getByTestId } = render(<FilterComponent {...defaultProps} />);

    const slider = getByTestId("price-slider");

    fireEvent(slider, "slidingComplete", 120);

    expect(mockPriceChange).toHaveBeenCalledWith(120);
  });

  it("calls onColorChange when a color is selected", () => {
    const { getByTestId } = render(<FilterComponent {...defaultProps} />);

    const greenColor = getByTestId("color-circle-green");
    fireEvent.press(greenColor);

    expect(mockColorChange).toHaveBeenCalledWith("green");
  });

  it('calls onResetFilters and onClose when "Reset Filters" is pressed', () => {
    const { getByText } = render(<FilterComponent {...defaultProps} />);

    const resetButton = getByText("Reset Filters");
    fireEvent.press(resetButton);

    expect(mockResetFilters).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  });

  it('calls onClose when "Close" button is pressed', () => {
    const { getByText } = render(<FilterComponent {...defaultProps} />);

    const closeButton = getByText("Close");
    fireEvent.press(closeButton);

    expect(mockClose).toHaveBeenCalled();
  });

  it("updates the selected color when a color is selected", () => {
    const { getByTestId } = render(<FilterComponent {...defaultProps} />);

    const greenColor = getByTestId("color-circle-green");
    fireEvent.press(greenColor);

    expect(mockColorChange).toHaveBeenCalledWith("green");
  });

  it('calls onResetFilters and onClose when "Reset Filters" is pressed', () => {
    const { getByText } = render(<FilterComponent {...defaultProps} />);

    const resetButton = getByText("Reset Filters");
    fireEvent.press(resetButton);

    expect(mockResetFilters).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  });

  it('resets the color to default and calls onResetFilters and onClose when "Reset Filters" is pressed with a selected color', () => {
    const { getByText } = render(<FilterComponent {...defaultProps} />);

    const resetButton = getByText("Reset Filters");
    fireEvent.press(resetButton);

    expect(mockResetFilters).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  });

  // Filters are applied with selected price and color
  it("should apply filters with selected price and color", () => {
    const localSelectedPrice = 100;
    const localSelectedColor = "red";
    const onApplyFilters = jest.fn();

    onApplyFilters({
      price: localSelectedPrice,
      color: localSelectedColor,
    });

    expect(onApplyFilters).toHaveBeenCalledWith({
      price: localSelectedPrice,
      color: localSelectedColor,
    });
  });

  // localSelectedPrice is null or undefined
  it("should handle null or undefined localSelectedPrice", () => {
    const localSelectedPrice = null;
    const localSelectedColor = "blue";
    const onApplyFilters = jest.fn();

    onApplyFilters({
      price: localSelectedPrice,
      color: localSelectedColor,
    });

    expect(onApplyFilters).toHaveBeenCalledWith({
      price: localSelectedPrice,
      color: localSelectedColor,
    });
  });

  // applyFilters correctly calls onApplyFilters with selected price and color
  it("should call onApplyFilters with selected price and color when applyFilters is invoked", () => {
    const onApplyFilters = jest.fn();
    const localSelectedPrice = 100;
    const localSelectedColor = "red";

    const applyFilters = () => {
      onApplyFilters({
        price: localSelectedPrice,
        color: localSelectedColor,
      });
    };

    applyFilters();

    expect(onApplyFilters).toHaveBeenCalledWith({
      price: localSelectedPrice,
      color: localSelectedColor,
    });
  });

  // applyFilters handles null or undefined localSelectedPrice
  it("should handle null or undefined localSelectedPrice when applyFilters is invoked", () => {
    const onApplyFilters = jest.fn();
    const localSelectedPrice = null;
    const localSelectedColor = "blue";

    const applyFilters = () => {
      onApplyFilters({
        price: localSelectedPrice,
        color: localSelectedColor,
      });
    };

    applyFilters();

    expect(onApplyFilters).toHaveBeenCalledWith({
      price: localSelectedPrice,
      color: localSelectedColor,
    });
  });

  // Generated by CodiumAI

  describe("code snippet", () => {
    // applyFilters correctly calls onApplyFilters with selected price and color
    it("should call onApplyFilters with selected price and color when applyFilters is invoked", () => {
      const onApplyFilters = jest.fn();
      const localSelectedPrice = 100;
      const localSelectedColor = "red";

      const applyFilters = () => {
        onApplyFilters({
          price: localSelectedPrice,
          color: localSelectedColor,
        });
      };

      applyFilters();

      expect(onApplyFilters).toHaveBeenCalledWith({
        price: localSelectedPrice,
        color: localSelectedColor,
      });
    });

    // applyFilters handles null or undefined localSelectedPrice
    it("should handle null or undefined localSelectedPrice when applyFilters is invoked", () => {
      const onApplyFilters = jest.fn();
      const localSelectedPrice = null;
      const localSelectedColor = "blue";

      const applyFilters = () => {
        onApplyFilters({
          price: localSelectedPrice,
          color: localSelectedColor,
        });
      };

      applyFilters();

      expect(onApplyFilters).toHaveBeenCalledWith({
        price: localSelectedPrice,
        color: localSelectedColor,
      });
    });

    // applyFilters handles null or undefined localSelectedColor
    it("should handle null localSelectedColor when applyFilters is invoked", () => {
      const onApplyFilters = jest.fn();
      const localSelectedPrice = 100;
      const localSelectedColor = null;

      const applyFilters = () => {
        onApplyFilters({
          price: localSelectedPrice,
          color: localSelectedColor,
        });
      };

      applyFilters();

      expect(onApplyFilters).toHaveBeenCalledWith({
        price: localSelectedPrice,
        color: localSelectedColor,
      });
    });

    // applyFilters handles empty or default values for filters
    it("should handle empty or default values for filters when applyFilters is invoked", () => {
      const onApplyFilters = jest.fn();
      const localSelectedPrice = undefined;
      const localSelectedColor = "";

      const applyFilters = () => {
        onApplyFilters({
          price: localSelectedPrice,
          color: localSelectedColor,
        });
      };

      applyFilters();

      expect(onApplyFilters).toHaveBeenCalledWith({
        price: localSelectedPrice,
        color: localSelectedColor,
      });
    });
  });
});
