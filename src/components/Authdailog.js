import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
  Box,
  Grid,
  DialogTitle,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material"; // Import Snackbar and Alert
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { loginUser } from "../store/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const AuthDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const { login, status } = useSelector((state) => state?.login);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State to store Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // State to store Snackbar severity

  // Show Snackbar based on status
  useEffect(() => {
    if (status === "succeeded") {
      setSnackbarMessage("Logged in successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      onClose(); // Close the dialog
    } else if (status === "failed") {
      setSnackbarMessage("Please enter correct credentials.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [status, onClose]);

  // Reset to Login form whenever the dialog is opened
  useEffect(() => {
    if (open) {
      setIsLogin(true); // Always show Login form when dialog opens
    }
  }, [open]);

  // Formik configuration for Login
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Login form submitted:", values);
      dispatch(loginUser({ email: values.email, password: values.password }));
    },
  });

  // Formik configuration for Signup
  const signupFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Signup form submitted:", values);
      onClose(); // Close the dialog after submission
    },
  });

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Do not close Snackbar on clickaway
    }
    setSnackbarOpen(false); // Close Snackbar
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        {/* Close Button (Cross Mark) */}
        <DialogTitle
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: 0,
            margin: 0,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              color: "#000", // Black color for the icon
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Light hover effect
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Grid container>
          {/* Blue Left Side */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              backgroundColor: "#2874f0", // Flipkart's blue color
              color: "#fff", // White text
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center", // Center content horizontally
              position: "relative", // Needed for absolute positioning of the shining overlay
              overflow: "hidden", // Ensure the shining overlay doesn't overflow
            }}
          >
            {/* Text */}
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
            >
              {isLogin ? "Login" : "Welcome to Fusion"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "center", mb: 3, fontSize: "1.1rem" }}
            >
              {isLogin
                ? "Get access to your Orders, Wishlist, and Recommendations"
                : "Create your account and start shopping"}
            </Typography>

            {/* Image Container */}
            <Box
              sx={{
                width: "100%", // Make the container responsive
                maxWidth: "300px", // Limit the maximum width
                borderRadius: "8px", // Add rounded corners
                position: "relative", // Needed for absolute positioning of the shining overlay
                overflow: "hidden", // Ensure the shining overlay doesn't overflow
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Free image from Pexels (clothing store related)
                alt="Fashion Illustration"
                sx={{
                  width: "100%", // Make the image responsive
                  display: "block", // Ensure the image is a block element
                }}
              />

              {/* Shining Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)", // Gradient for shining effect
                  animation: "shine 3s infinite", // Shine animation
                }}
              />
            </Box>
          </Grid>

          {/* White Right Side (Form) */}
          <Grid item xs={12} md={7}>
            <DialogContent sx={{ padding: "40px 32px" }}>
              {isLogin ? (
                // Login Form
                <form onSubmit={loginFormik.handleSubmit}>
                  <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    name="email"
                    value={loginFormik.values.email}
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    error={loginFormik.touched.email && !!loginFormik.errors.email}
                    helperText={loginFormik.touched.email && loginFormik.errors.email}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    name="password"
                    value={loginFormik.values.password}
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    error={
                      loginFormik.touched.password && !!loginFormik.errors.password
                    }
                    helperText={
                      loginFormik.touched.password && loginFormik.errors.password
                    }
                    sx={{ mb: 2 }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: "#fb641b", // Orange button
                      color: "#fff",
                      fontWeight: "bold",
                      mb: 2,
                      "&:hover": {
                        backgroundColor: "#e55b16", // Darker orange on hover
                      },
                    }}
                  >
                    Login
                  </Button>
                </form>
              ) : (
                // Signup Form
                <form onSubmit={signupFormik.handleSubmit}>
                  <TextField
                    margin="dense"
                    label="Username"
                    type="text"
                    fullWidth
                    name="username"
                    value={signupFormik.values.username}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    error={
                      signupFormik.touched.username && !!signupFormik.errors.username
                    }
                    helperText={
                      signupFormik.touched.username && signupFormik.errors.username
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    name="email"
                    value={signupFormik.values.email}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    error={signupFormik.touched.email && !!signupFormik.errors.email}
                    helperText={
                      signupFormik.touched.email && signupFormik.errors.email
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    name="password"
                    value={signupFormik.values.password}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    error={
                      signupFormik.touched.password && !!signupFormik.errors.password
                    }
                    helperText={
                      signupFormik.touched.password && signupFormik.errors.password
                    }
                    sx={{ mb: 2 }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: "#fb641b", // Orange button
                      color: "#fff",
                      fontWeight: "bold",
                      mb: 2,
                      "&:hover": {
                        backgroundColor: "#e55b16", // Darker orange on hover
                      },
                    }}
                  >
                    Create Account
                  </Button>
                </form>
              )}

              <Divider sx={{ mb: 2 }} />

              <Typography
                variant="body2"
                sx={{ textAlign: "center", color: "#2874f0", marginTop: "150px" }} // Blue text
              >
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsLogin(!isLogin)}
                  underline="hover"
                  sx={{ color: "#2874f0", fontWeight: "bold" }} // Blue and bold link
                >
                  {isLogin ? "Create an account" : "Login"}
                </Link>
              </Typography>
            </DialogContent>
          </Grid>
        </Grid>

        {/* CSS for Shining Animation */}
        <style>
          {`
            @keyframes shine {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
          `}
        </style>
      </Dialog>

      {/* Snackbar for showing messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Auto-close after 6 seconds
        
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position at top-right
      >
        <Alert
          onClose={handleSnackbarClose} // Pass the close handler to Alert
          severity={snackbarSeverity} // "success" or "error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthDialog;