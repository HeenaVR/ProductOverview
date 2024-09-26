import { render, fireEvent } from "@testing-library/react-native";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  const mockSetSearchQuery = jest.fn();
  const mockOnFilterPress = jest.fn();

  const props = {
    searchQuery: "Sample Query",
    setSearchQuery: mockSetSearchQuery,
    onFilterPress: mockOnFilterPress,
  };

  beforeEach(() => {
    mockSetSearchQuery.mockClear();
    mockOnFilterPress.mockClear();
  });

  it("should render correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchBar {...props} />
    );
    expect(getByPlaceholderText("Search products...")).toBeTruthy();
    expect(getByText("Filter")).toBeTruthy();
  });

  it("should display the correct search query in TextInput", () => {
    const { getByDisplayValue } = render(<SearchBar {...props} />);
    expect(getByDisplayValue("Sample Query")).toBeTruthy();
  });

  it("should call setSearchQuery when text is changed", () => {
    const { getByPlaceholderText } = render(<SearchBar {...props} />);
    const textInput = getByPlaceholderText("Search products...");

    fireEvent.changeText(textInput, "New Query");
    expect(mockSetSearchQuery).toHaveBeenCalledWith("New Query");
    expect(mockSetSearchQuery).toHaveBeenCalledTimes(1);
  });

  it("should call onFilterPress when the filter button is pressed", () => {
    const { getByText } = render(<SearchBar {...props} />);
    const filterButton = getByText("Filter");

    fireEvent.press(filterButton);
    expect(mockOnFilterPress).toHaveBeenCalledTimes(1);
  });
});
