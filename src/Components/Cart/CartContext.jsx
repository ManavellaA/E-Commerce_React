import React, { useState, createContext, useMemo, useCallback } from "react";

export const context = createContext();

const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(false);

  const isInCart = useCallback(
    (item) => cart.find((entry) => entry.id === item.id),
    [cart]
  );

  const onAdd = useCallback((item, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((entry) => entry.id === item.id);

      if (existingItem) {
        return prevCart.map((entry) =>
          entry.id === item.id
            ? {
                ...entry,
                cantidad: Math.min(entry.cantidad + quantity, entry.stock),
              }
            : entry
        );
      }

      return [...prevCart, { ...item, cantidad: quantity }];
    });
  }, []);

  const removeItem = useCallback((item) => {
    setCart((prevCart) => prevCart.filter((entry) => entry.id !== item.id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const addItem = useCallback((item) => {
    setCart((prevCart) =>
      prevCart.map((entry) =>
        entry.id === item.id
          ? {
              ...entry,
              cantidad: Math.min(entry.cantidad + 1, entry.stock),
            }
          : entry
      )
    );
  }, []);

  const substractItem = useCallback((item) => {
    setCart((prevCart) =>
      prevCart.map((entry) =>
        entry.id === item.id
          ? {
              ...entry,
              cantidad: Math.max(entry.cantidad - 1, entry.inicial),
            }
          : entry
      )
    );
  }, []);

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    [cart]
  );

  const reStock = useCallback(
    (dataBase) =>
      Promise.all(
        cart.map((item) => {
          const newStock = Math.max(item.stock - item.cantidad, 0);
          return dataBase.collection("items").doc(item.id).update({ stock: newStock });
        })
      ),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      onAdd,
      clearCart,
      removeItem,
      addItem,
      substractItem,
      setShow,
      show,
      isInCart,
      total,
      reStock,
    }),
    [
      cart,
      onAdd,
      clearCart,
      removeItem,
      addItem,
      substractItem,
      show,
      isInCart,
      total,
      reStock,
    ]
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export default CartContext;
