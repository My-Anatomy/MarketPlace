// src/mock/products.js
export const MOCK_PRODUCTS = [
  {
    _id: "demo1",
    title: "Demo Product 1",
    description: "This is a sample product description for the first demo product!",
    price: 150,
    category: { name: "Gadgets" },
    location: "Chennai",
    createdAt: new Date().toISOString(),
    status: "",
    isWishlisted: false,
    images: [
      "https://images.pexels.com/photos/3945669/pexels-photo-3945669.jpeg",
    ],
    seller: {
      name: "Demo User A",
      avatar: "",
    },
  },
  {
    _id: "demo2",
    title: "Demo Product 2",
    description: "Second product, for showing a grid/list view in the catalog.",
    price: 99,
    category: { name: "Books" },
    location: "Bengaluru",
    createdAt: new Date().toISOString(),
    status: "",
    isWishlisted: true,
    images: [
      "https://images.pexels.com/photos/3935708/pexels-photo-3935708.jpeg",
    ],
    seller: {
      name: "Demo User B",
      avatar: "",
    },
  },
  // Add more products if desired
];
