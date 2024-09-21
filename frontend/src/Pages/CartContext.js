// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (productId) => {
        console.log('Removing product with ID:', productId);
        setCart((prevCart) => {
            console.log('Current cart:', prevCart);
            return prevCart.filter(item => item._id !== productId);
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
