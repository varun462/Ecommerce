import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct the import
import SignupForm from './Pages/signup';
import LoginForm from './Pages/Login';
import HomePage from './Pages/Home';
import AdminPage from './Pages/Admin';
import ProductsPage from './Pages/Product';
import { CartProvider } from './Pages/CartContext';
import CartPage from './Pages/Cart';
import OrderPage from './Pages/Order';
import DescriptionPage from './Pages/DescriptionPage'; 
import PaymentPage from './Pages/payment';


const App = () => {
   

    return (
        <CartProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/products"  element={<ProductsPage/>}/>
                <Route path="/admin" element={<AdminPage/>} />
                <Route path="/cart" element={<CartPage />} />
                <Route path='/order' element={<OrderPage/>}/>
                <Route path="/DescriptionPage" element={<DescriptionPage/>} />
                <Route path="/payment" element={<PaymentPage />} />
            </Routes>
        </Router>
        </CartProvider>
    );
};

export default App;
