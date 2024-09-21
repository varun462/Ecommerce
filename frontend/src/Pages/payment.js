import React from 'react';
import { useLocation } from 'react-router-dom';
import './payment.css';

const PaymentPage = () => {
    const location = useLocation();
    const { products } = location.state || {}; // Get products data from the location state

    const handlePayment = (e) => {
        e.preventDefault();
        // Add payment processing logic here
        alert('Payment processed successfully!');
    };

    if (!products) {
        return <div>No products available for payment.</div>;
    }

    const totalPrice = products.reduce((total, product) => total + (product.price * product.quantity), 0);

    return (
        <div className="payment-page">
            <h2>Payment Page</h2>
            <div className="product-info">
                <h3>Product Information</h3>
                {products.map((product, index) => (
                    <div key={index} className="product-details">
                        <p><strong>Name:</strong> {product.name}</p>
                        <p><strong>Quantity:</strong> {product.quantity}</p>
                        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                    </div>
                ))}
                <div className="total-price">
                    <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
                </div>
            </div>
            <form onSubmit={handlePayment}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" required placeholder="Enter Your Name" />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" required placeholder="Enter Your Address" />
                </div>
                <button type="submit" className="payment-button">Pay Now</button>
            </form>
        </div>
    );
};

export default PaymentPage;
