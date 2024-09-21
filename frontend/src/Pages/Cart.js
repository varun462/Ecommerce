import React, { useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

import './cart.css';

const CartPage = () => {
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Cart:', cart);
    }, [cart]);

    const handleBuy = async () => {
       
        try {
            //await axios.post('http://localhost:3001/api/buy', { items: [item] });
            //alert('Purchase successful!');
            navigate('/order');
            //removeFromCart(item._id);  // Remove the item from the cart after successful purchase
        } catch (error) {
            console.error('Error during purchase:', error);
            alert('Purchase failed!');
        }
    };

    return (
        <div className='flex-container'>
            <h1 style={{color:"red"}}>Cart Section</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className='item-container'>
                    {cart.map((item) => (
                        <div id="mini-container"key={item._id} style={{ border: '1px solid #ccc', padding: '16px', margin: '16px' }}>
                            <img src={item.image} alt={item.name} style={{ width: '100px' }} />
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                            <button onClick={() => removeFromCart(item._id)}>Remove</button>
                            <button onClick={() => handleBuy(item)}>Buy Now</button> {/* Buy button for single item */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartPage;
