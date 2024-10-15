import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const { signup } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(name, email, password);
            navigate('/login');
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={5}>
                <Typography variant="h5">Sign Up</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignupPage;
