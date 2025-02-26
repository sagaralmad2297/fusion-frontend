import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import {
  Favorite as FavoriteFilled,
  FavoriteBorder as FavoriteOutlined,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";
import AuthDialog from "./Authdailog";

const ProductCard = ({ product, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false); // State to control AuthDialog
  const [pendingAction, setPendingAction] = useState(null); // Store pending action (addToCart or toggleFavorite)

  useEffect(() => {
    if (product?.id) {
      const savedStatus = localStorage.getItem(`favorite-${product.id}`);
      setIsFavorite(savedStatus ? JSON.parse(savedStatus) : false);
    }
  }, [product?.id]);

  // Check if the user is logged in (has a token in localStorage)
  const isLoggedIn = !!localStorage.getItem("token");

  // Handle Add to Cart
  const handleAddToCart = (event) => {
    event.stopPropagation();
    if (!isLoggedIn) {
      setPendingAction("addToCart"); // Set pending action
      setIsAuthDialogOpen(true); // Open AuthDialog
    } else {
      onAddToCart?.(product); // Perform the action if logged in
    }
  };

  // Handle Toggle Favorite
  const toggleFavorite = (event) => {
    event.stopPropagation();
    if (!isLoggedIn) {
      setPendingAction("toggleFavorite"); // Set pending action
      setIsAuthDialogOpen(true); // Open AuthDialog
    } else {
      setIsFavorite((prev) => {
        const newStatus = !prev;
        localStorage.setItem(`favorite-${product.id}`, JSON.stringify(newStatus));
        return newStatus;
      });
    }
  };

  // Handle AuthDialog Close
  const handleAuthDialogClose = () => {
    setIsAuthDialogOpen(false); // Close AuthDialog
  };

  // Handle AuthDialog Success (user logged in)
  const handleAuthDialogSuccess = () => {
    if (pendingAction === "addToCart") {
      onAddToCart?.(product); // Perform the pending Add to Cart action
    } else if (pendingAction === "toggleFavorite") {
      setIsFavorite((prev) => {
        const newStatus = !prev;
        localStorage.setItem(`favorite-${product.id}`, JSON.stringify(newStatus));
        return newStatus;
      });
    }
    setPendingAction(null); // Clear pending action
  };

  return (
    <>
      <Card
        sx={{
          width: { xs: "100%", sm: "96%", md: "96%", lg: "100%" },
          minHeight: "auto",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={product?.imageUrl}
          alt={product?.name || "Product"}
          sx={{ objectFit: "contain" }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: { xs: "0.85rem", sm: "1rem" } }}
          >
            {product?.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}
          >
            {product?.description}
          </Typography>
          <Typography
            variant="h6"
            sx={{ mt: 1, color: "#1976d2", fontSize: { xs: "0.9rem", sm: "1rem" } }}
          >
            ${product?.price}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CartIcon />}
              sx={{
                flex: 1,
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
                minWidth: { xs: "100px", sm: "120px" },
                whiteSpace: "nowrap",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
              onClick={handleAddToCart}
              aria-label="Add to Cart"
            >
              Add to Cart
            </Button>
            <IconButton
              color="primary"
              onClick={toggleFavorite}
              aria-label="Toggle Favorite"
            >
              {isFavorite ? (
                <FavoriteFilled sx={{ color: "red" }} />
              ) : (
                <FavoriteOutlined />
              )}
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* AuthDialog */}
      <AuthDialog
        open={isAuthDialogOpen}
        onClose={handleAuthDialogClose}
        onSuccess={handleAuthDialogSuccess} // Callback after successful login
      />
    </>
  );
};

export default ProductCard;