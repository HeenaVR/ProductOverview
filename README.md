# ProductOverview E-commerce Application

A React Native application built to present an attractive and informative product overview, allowing users to search for and filter products efficiently. The app aims to reduce return rates by enabling customers to make informed purchasing decisions through detailed product displays and filtering options.

## Demo:
https://github.com/user-attachments/assets/e1d2f3c8-8b61-4788-8b0d-2fd4ed68e7ee

![Copy of Untitled Design](https://github.com/user-attachments/assets/e799c339-8da3-4692-a42a-9ddb737c10d8)


## Features

- **Product Listing**: Displays detailed product information, including:
  - Article Name
  - Available Colors
  - Retail Price
  - Product Images
- **Filtering**: Users can filter the product list by:
  - Price
  - Color
- **Image Carousel**: Scrollable, horizontal carousel for multiple product images (front, back, flat, outfit).
- **Dynamic Color Selection**: Selecting a different color updates the displayed product image to reflect the chosen variant.
- **Wishlist & Cart Functionality**: Users can add/remove products from the wishlist or shopping cart, with interactive icons reflecting the current status.

## Technical Stack

- **React Native with TypeScript**: Provides type safety and robust development practices for scalable code.
- **TypeScript ESLint**: Integrated ESLint with TypeScript for code linting and enforcing best practices across the codebase.
- **Expo**: Used for cross-platform development, testing, and deployment on both iOS and Android.
- **REST API (Mocked)**: Simulated API to fetch product data for the application.
- **Local JSON Server**: Utilized to serve product data locally, making it easy to mock and manage API responses during development.
- **Lazy Loading of Images**: Product images are lazily loaded using expo-image, ensuring optimal performance by only loading images as they enter the viewport.
- **Cross-Platform Compatibility**: The application is optimized for both Android and iOS.

## Test Coverage

- Implemented unit tests for critical components and features, achieving good code coverage. The tests ensure reliable behavior for:
  - Product display
  - Filtering logic
  - Wishlist & Cart functionality

## Future Improvements

- Achieving Better Code Coverage with Enhanced Test Cases 💻💻: Expand unit and integration tests to cover more scenarios, edge cases, and complex interactions, ensuring higher reliability and stability.

