import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer"; // Import the Footer component

// Dummy Products
const dummyProducts = [
  { id: 1, name: "Kids Jacket", description: "Warm jacket", price: 30, imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/jacket/l/t/c/11-12-years-1-no-kidbpink-j1-killer-original-imah9bdwgtgm6r55.jpeg?q=70" },
  { id: 2, name: "Stylish Sneakers", description: "Comfortable running shoes", price: 50, imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/8/5/n/-original-imaggdfe5qdf7yqj.jpeg?q=70" },
  { id: 3, name: "Classic Watch", description: "Elegant wristwatch", price: 80, imageUrl: "https://rukminim2.flixcart.com/image/612/612/l4ei1e80/watch/s/l/d/2-trending-black-round-men-sport-watch-silicone-strap-for-boys-original-imagfbyy2qzq8yjp.jpeg?q=70" },
  { id: 4, name: "Trendy Backpack", description: "Lightweight and stylish", price: 40, imageUrl: "https://rukminim2.flixcart.com/image/612/612/kzzw5u80/backpack/f/8/q/casual-unisex-travel-bag-office-messenger-school-backpack-fft-original-imagbwfjyxr27wdf.jpeg?q=70" },
  { id: 5, name: "Smart Headphones", description: "Crystal clear sound", price: 100, imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/smart-headphone/f/z/m/helmet-c5001-hgd-edyell-original-imah3ygguddngqjm.jpeg?q=70" },
  { id: 6, name: "Wireless Earbuds", description: "High-quality sound & noise cancellation", price: 60, imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/6/9/q/bullets-360-tws-earbuds-with-100-hrs-playtime-50ms-low-latency-original-imah88ay9x2n4hcy.jpeg?q=70" },
  { id: 7, name: "Leather Wallet", description: "Premium leather finish", price: 25, imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/wallet-card-wallet/j/e/i/men-casual-black-leather-wallet-1-1-wallet-for-men-3-wallet-original-imah8mrfyhynywnk.jpeg?q=70" },
  { id: 8, name: "Gaming Mouse", description: "RGB lighting with high precision", price: 45, imageUrl: "https://rukminim2.flixcart.com/image/612/612/khuvxjk0-0/mouse/l/t/6/zeb-transformer-m-zebronics-original-imafxrugfftphbkk.jpeg?q=70" },
  { id: 9, name: "Sports Water Bottle", description: "Durable and leakproof", price: 15, imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/water-bottle/l/0/w/-original-imagwyy5r2vguh5c.jpeg?q=70" },
  { id: 10, name: "Portable Power Bank", description: "Fast charging with high capacity", price: 55, imageUrl: "https://rukminim2.flixcart.com/image/612/612/xif0q/power-bank/t/6/d/-original-imagzvxf5yhagpnd.jpeg?q=70" }
];

const categories = ["Men", "Women", "Kids"];

const Home = () => {
  const handleAddToCart = (product) => {
    console.log("Added to Cart:", product);
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [rating, setRating] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensure the container takes at least the full viewport height
        overflowX: "hidden", // Prevent horizontal scroll
      }}
    >
      {/* Filter Sidebar and Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexGrow: 1, // Allow this section to grow and fill the remaining space
        }}
      >
        {/* Filter Sidebar */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "250px",
            p: 2,
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            overflowX: "hidden", // Make the filter sidebar scrollable
            bgcolor: "#fff",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Filters
          </Typography>
          <List>
            {categories.map((category) => (
              <ListItem
                key={category}
                button
                onClick={() => setSelectedCategory(category)}
                sx={{
                  bgcolor: selectedCategory === category ? "primary.light" : "transparent",
                  borderRadius: "4px",
                  "&:hover": { bgcolor: "primary.light" },
                }}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel>Price Range</FormLabel>
            <Slider value={priceRange} onChange={(e, newValue) => setPriceRange(newValue)} valueLabelDisplay="auto" min={0} max={200} />
          </FormControl>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Ratings</FormLabel>
            <RadioGroup value={rating} onChange={(e) => setRating(e.target.value)}>
              {["4 & above", "3 & above", "2 & above", "1 & above"].map((rate) => (
                <FormControlLabel key={rate} value={rate} control={<Radio />} label={rate} />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Mobile Filter Button */}
        <IconButton
          sx={{ display: { md: "none" }, position: "absolute", top: 10, left: 10, zIndex: 1201 }}
          onClick={() => setOpenFilter(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="left"
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          sx={{ "& .MuiDrawer-paper": { width: 250 } }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Filters
            </Typography>
            <List>
              {categories.map((category) => (
                <ListItem
                  key={category}
                  button
                  onClick={() => setSelectedCategory(category)}
                  sx={{
                    bgcolor: selectedCategory === category ? "primary.light" : "transparent",
                    borderRadius: "4px",
                    "&:hover": { bgcolor: "primary.light" },
                  }}
                >
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Price Range</FormLabel>
              <Slider value={priceRange} onChange={(e, newValue) => setPriceRange(newValue)} valueLabelDisplay="auto" min={0} max={200} />
            </FormControl>
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Ratings</FormLabel>
              <RadioGroup value={rating} onChange={(e) => setRating(e.target.value)}>
                {["4 & above", "3 & above", "2 & above", "1 & above"].map((rate) => (
                  <FormControlLabel key={rate} value={rate} control={<Radio />} label={rate} />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden", px: { xs: 2, sm: 3, md: 4 } }}>
          <Container sx={{ mt: 4, maxWidth: "1200px" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textAlign: { xs: "center", sm: "left" } }}>
              Explore Our Latest Collection ✨
            </Typography>
            <Grid container spacing={{ xs: 3, sm: 4 }} justifyContent="flex-start" sx={{ borderBottom: "1px solid #ddd", pb: 2 }}>
              {dummyProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      position: "relative",
                      padding: "8px", // Add padding to ensure the card stays inside the border
                      borderRadius: "12px",
                      overflow: "hidden", // Clip content outside the border
                      maxWidth: "100%", // Ensure the card does not exceed the container width
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0, // Position the border correctly
                        border: "2px solid transparent",
                        borderRadius: "12px",
                        animation: "borderAnimation 2s infinite linear",
                        zIndex: 1,
                      },
                      "@keyframes borderAnimation": {
                        "0%": { borderColor: "#ff6b6b" },
                        "50%": { borderColor: "#4ecdc4" },
                        "100%": { borderColor: "#ff6b6b" },
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", zIndex: 2 }}>
                      <ProductCard product={product} onAddToCart={handleAddToCart} />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;