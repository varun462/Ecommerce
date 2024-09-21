import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './productstyle.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for the toast

import { Container, FormWrapper, Title, Form, Label, Input, Button, ErrorMessage } from '../style';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://ecommerce-5-730y.onrender.com/api/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);

            if (user.role === 'admin') {
                toast.success('Admin login successful!', {
                    position: "top-right",
                    autoClose: 3000, // Adjust this as needed
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 100,
                    theme: 'colored',
                    style: { backgroundColor: '#d4edda', color: '#155724' }
                });
                setTimeout(() => {
                    navigate('/admin');
                }, 3000); // Delay to show the toast
            } else {
                toast.success('User login successful!', {
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
                setTimeout(() => {
                    navigate('/products');
                }, 3000); // Delay to show the toast
            }
        } catch (error) {
            setError('Error logging in');
            toast.error('Error logging in. Please check your credentials.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                style: { backgroundColor: '#f8d7da', color: '#721c24' }
            });
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Login</Title>
                <Form onSubmit={handleSubmit}>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <div>
                        <Label>Email:</Label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <Label>Password:</Label>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <Button type="submit">Login</Button>
                </Form>
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h4>If you don't have an account</h4>
                    <Link to="/signup" style={{ padding: 0, margin: '0 0 0 10px', color: 'red' }}>Create Account</Link>
                </div>
            </FormWrapper>

            {/* ToastContainer for displaying the notifications */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Container>
    );
};

export default LoginForm;
