// Dummy product data for the shopping app
export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null
}

export const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    description: "Premium noise-cancelling wireless headphones with 30hr battery.",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Classic Watch",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Accessories",
    description: "Elegant minimalist watch with leather strap.",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Running Shoes",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Footwear",
    description: "Lightweight running shoes with cushioned sole.",
    rating: 4.6,
  },
  {
    id: "4",
    name: "Backpack",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Bags",
    description: "Durable laptop backpack with multiple compartments.",
    rating: 4.4,
  },
  {
    id: "5",
    name: "Sunglasses",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "Accessories",
    description: "UV protection polarized sunglasses.",
    rating: 4.7,
  },
  {
    id: "6",
    name: "Water Bottle",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Lifestyle",
    description: "Insulated stainless steel 500ml bottle.",
    rating: 4.9,
  },
  {
    id: "7",
    name: "Bluetooth Speaker",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
    description: "Portable waterproof Bluetooth speaker.",
    rating: 4.5,
  },
  {
    id: "8",
    name: "Desk Lamp",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Home",
    description: "LED desk lamp with adjustable brightness.",
    rating: 4.3,
  },
]
