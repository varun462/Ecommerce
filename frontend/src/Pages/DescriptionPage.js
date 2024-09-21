import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Descryption.css';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from './CartContext';

const DescriptionPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { product,description, image } = location.state || {};

    const handleAddToCart = () => {
        // Logic to add the product to cart
        toast.success('Product Added Successfully! to Cart', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            style: { backgroundColor: '#d4edda', color: '#155724' }
        });
        addToCart(product);
    };

    return (
        <div className="description-container">
            <div className="image-container">
                {image && <img src={image} alt="Product" />}
            </div>
            <div className="description-content">
                <h1>Product Description</h1>
                <p>{description}</p>
                <div className="button-container">
                    <button className="back-button" onClick={() => navigate('/products')}>Back to Products</button>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default DescriptionPage;
