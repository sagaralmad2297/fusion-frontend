import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import {
  Search as SearchIcon,
  Favorite as WishlistIcon,
  ShoppingCart as CartIcon,
  AccountCircle as UserIcon,
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AuthDialog from "./Authdailog";

// Define the shining animation
const shine = keyframes`
  0% {
    background-color: #1976d2; /* Base blue color */
  }
  50% {
    background-color: #1e88e5; /* Lighter blue color */
  }
  100% {
    background-color: #1976d2; /* Back to base blue color */
  }
`;

const ShiningAppBar = styled(AppBar)({
  animation: `${shine} 2s infinite`, // Apply the animation
});

const Search = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  padding: "4px 12px",
  maxWidth: "600px",
}));

const StyledInputBase = styled(InputBase)({
  flex: 1,
  fontSize: "16px",
  paddingRight: "8px",
});

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Check if a token exists in localStorage
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      <ShiningAppBar
        position="fixed"
        sx={{
          zIndex: 1100,
          color: "#fff",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          {/* Brand Name */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              flexShrink: 0,
            }}
          >Fusion
          </Typography>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Search sx={{ width: { xs: "100%", sm: "80%", md: "60%" } }}>
              <StyledInputBase placeholder="Search for products, brands and more" inputProps={{ "aria-label": "search" }} />
              <SearchIcon sx={{ color: "blue" }} />
            </Search>
          </Box>

          {/* Icons Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
            <IconButton color="inherit">
              <WishlistIcon />
            </IconButton>
            <IconButton color="inherit">
              <CartIcon />
            </IconButton>

            {/* Conditionally render Login button or User menu */}
            {!isLoggedIn ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
                onClick={() => setDialogOpen(true)} // Open the dialog
              >
                Login
              </Button>
            ) : (
              <>
                <IconButton color="inherit" onClick={handleMenu}>
                  <UserIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </ShiningAppBar>

      {/* Add Padding to Prevent Overlap */}
      <Box sx={{ height: "64px" }} />

      {/* Reusable Auth Dialog */}
      <AuthDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default Navbar;