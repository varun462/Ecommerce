import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './productstyle.css';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const { addToCart, cart } = useCart(); // Access the cart
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10); // Number of products per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://ecommerce-5-730y.onrender.com/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handledescription = (product,description, image) => {
        navigate('/DescriptionPage', { state: {product, description, image } });
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const logout = async () => {
        try {
            const response = await axios.post('https://ecommerce-5-730y.onrender.com/api/Logout');
            localStorage.removeItem('token');
            navigate('/login');
            console.log(response.data);
            console.log(response.data.message); // Logout successful
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div id='full'>
            <div className='header'>
                <h1>Product Page</h1>
                <input
                    className='search'
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '16px' }}
                />
                <button onClick={logout} className='logout'>Logout</button>

                {/* Cart Symbol */}
                <div className="cart-icon" onClick={() => navigate('/cart')}>
                    <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                    <span className="cart-count">{cart.length}</span>
                </div>
            </div>

            <div className='grid-container'>
                {currentProducts.map((product) => (
                    <div className="item-container" key={product._id}>
                        <img src={product.image} alt={product.title} style={{ width: '100%' }} />
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price}</p>
                        <p>{product.category}</p>
                        <div className='button-container'>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                            <button onClick={() => handledescription(product,product.description, product.image)}>Description</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className='page'>
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                    <button className='page-button' key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
