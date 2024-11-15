// src/contexts/CartContext.js
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => setCartItems([...cartItems, item]);
  const removeFromCart = (id) =>
    setCartItems(cartItems.filter((item) => item.id !== id));

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);