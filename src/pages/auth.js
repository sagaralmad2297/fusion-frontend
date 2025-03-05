import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/slices/signupSlice";
import { loginUser } from "../store/slices/loginSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const { status, error, data: signupResponse } = useSelector((state) => state.signup); // Select signup response
  console.log("resssssssssssssssssereeee",signupResponse)
  const { status: loginStatus, error: loginError } = useSelector((state) => state.login);
  

  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (isSignup && !formData.username)) {
      return;
    }

    if (isSignup) {
      console.log("reererr")
      dispatch(signupUser(formData));
    } else {
      console.log("yeeeeeeeeeeeeee")
     
    }
  };

  // Log the response when signupResponse updates
  useEffect(() => {
    if (signupResponse) {
      console.log("Signup Response:", signupResponse);
    }
  }, [signupResponse]);

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center">
        {isSignup ? "Sign Up" : "Login"}
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
            autoComplete="username"
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
          autoComplete="email"
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
          autoComplete="current-password"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={status === "loading" || loginStatus === "loading"}
        >
          {status === "loading" || loginStatus === "loading" ? "Loading..." : isSignup ? "Sign Up" : "Login"}
        </Button>
        {error || loginError ? (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error || loginError}
          </Typography>
        ) : null}
        <Button onClick={() => setIsSignup(!isSignup)} fullWidth sx={{ mt: 1 }}>
          {isSignup ? "Switch to Login" : "Switch to Sign Up"}
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;
