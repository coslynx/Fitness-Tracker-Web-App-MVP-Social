import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert, Snackbar } from '@mui/material';
import { API_URL } from '../utils/constants';
import { useAuthContext } from '../hooks/useAuthContext';
import { LoginCredentials } from '../utils/types';
import axios from 'axios';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { loginUser, isLoading, error } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const credentials: LoginCredentials = { email, password };

        try {
            await loginUser(credentials);
            setErrorMessage('');
            setOpenSnackbar(false);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage('Invalid credentials');
            setOpenSnackbar(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>

            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isLoading}
            >
                Login
            </Button>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

const LoginPage: React.FC = () => {
    return (
        <div className="login-container">
            <LoginForm />
        </div>
    );
};

export default LoginPage;