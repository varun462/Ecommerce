import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './order.css';

const OrderPage = () => {
    const { cart } = useCart();
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState({});

    if (cart.length === 0) {
        return <div className="empty-cart">Your cart is empty.</div>;
    }

    const handleCheckout = () => {
        // Prepare the product data to send
        const productsData = cart.map(product => ({
            name: product.title,
            quantity: quantities[product._id] || 1,
            price: product.price
        }));

        // Navigate to the payment page with product data
        navigate('/payment', { state: { products: productsData } });
    };

    const handleQuantityChange = (productId, newQuantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: newQuantity
        }));
    };

    const totalPrice = Object.keys(quantities).reduce((total, productId) => {
        const product = cart.find(item => item._id === productId);
        const quantity = quantities[productId];
        return total + (product.price * quantity);
    }, 0);

    return (
        <div className="order-page">
            <h2>Order Page</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(product => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>
                                <input
                                    type="number"
                                    value={quantities[product._id] || 1}
                                    onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                                    min="1"
                                    className="quantity-input"
                                />
                            </td>
                            <td>
                                <button className="purchase-button" onClick={handleCheckout}>Proceed To Checkout</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="total-price">
                <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
            </div>
        </div>
    );
};

export default OrderPage;
