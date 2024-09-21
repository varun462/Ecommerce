import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, FormWrapper, Title, Form, Label, Input, Button, ErrorMessage } from '../style';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/signup', { email, password });

            if (response.data.message === "Email already in use") {
                toast.error('Account already exists. Please login.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    style: { backgroundColor: 'red', color: 'white' }
                });
            } else {
                toast.success('Signup successful!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    style: { backgroundColor: 'green', color: 'white' }
                });
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            //setError('Error signing up');
            toast.error('Error signing up. Please try again.', {
                position: "top-right",
                autoClose: 1000,
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
                <Title>Signup</Title>
                <Form onSubmit={handleSubmit}>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <div>
                        <Label>Name:</Label>
                        <Input type="text" required></Input>
                    </div>
                    <div>
                        <Label>Date Of Birth:</Label>
                        <Input type="date" required></Input>
                    </div>
                    <div>
                        <Label>Email:</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label>Password:</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit">Signup</Button>
                </Form>
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h4>If you already have an account</h4>
                    <Link to="/login" style={{ padding: 0, margin: '0 0 0 10px', color: 'red' }}>
                        Login
                    </Link>
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

export default SignupForm;
