// /client/app/login/page.js
'use client';

import React, { useState } from 'react';
import { Container, Card, Typography, TextField, Button, Box, Link } from '@mui/material';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [aadhaar, setAadhaar] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin 
            ? 'http://localhost:4000/api/users/login' 
            : 'http://localhost:4000/api/users/signup';

        const body = isLogin 
            ? { email, password } 
            : { email, password, aadhaar_number: aadhaar };
            
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            alert(data.message); // Show success message
            // Here you would typically redirect the user or save a token
            
        } catch (error) {
            console.error(error);
            alert(error.message); // Show error message
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
            <Card sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Welcome to Van Mitra
                </Typography>
                <Typography component="h2" variant="subtitle1" sx={{ mt: 1 }}>
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isLogin && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="aadhaar"
                            label="Aadhaar Number"
                            type="text"
                            id="aadhaar"
                            value={aadhaar}
                            onChange={(e) => setAadhaar(e.target.value)}
                        />
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </Button>
                    <Link href="#" variant="body2" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </Link>
                </Box>
            </Card>
        </Container>
    );
}