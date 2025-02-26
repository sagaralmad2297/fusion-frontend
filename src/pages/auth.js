import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signup, login } from '../store/slices/signupSlice';

const Auth = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData));
    } else {
      dispatch(login({ email: formData.email, password: formData.password }));
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center">
        {isSignup ? 'Sign Up' : 'Login'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {isSignup && (
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        )}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
        </Button>
        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          onClick={() => setIsSignup(!isSignup)}
          fullWidth
          sx={{ mt: 1 }}
        >
          {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;