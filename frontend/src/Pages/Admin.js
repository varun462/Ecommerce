// src/components/AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/products/add', { id, name, description, price, image }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProducts([...products, response.data]);
            setId('');
            setName('');
            setDescription('');
            setPrice('');
            setImage('');
            alert('Product added successfully');
            navigate('/admin');
        } catch (error) {
            alert('Error adding product');
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:3001/api/products/delete/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
            alert('Product deleted successfully');
        } catch (error) {
            alert('Error deleting product');
        }
    };

    return (
        <div className="admin-container">
            <div className="form-section">
                <h2>Admin Panel</h2>
                <form onSubmit={handleAddProduct}>
                    <h3>Add Product</h3>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Image URL:</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
            <div className="product-list">
                <h3>Product List</h3>
                {products.map(product => (
                    <div key={product._id} className="product-item">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;