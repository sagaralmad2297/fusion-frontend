import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  FormControl,
  FormLabel,
  Slider,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Fade,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import Footer from "../components/Footer";

const categories = ["Men", "Women", "Kids"];

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state?.products);
  const data = products.data?.products;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflowX: "hidden" }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, flexGrow: 1 }}>
        <Box sx={{ display: { xs: "none", md: "block" }, width: "250px", p: 2, borderRight: "1px solid #ddd", bgcolor: "#fff" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Filters</Typography>
          <List>
            {categories.map((category) => (
              <ListItem key={category} button onClick={() => setSelectedCategory(category)}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel>Price Range</FormLabel>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={200}
            />
          </FormControl>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden", px: { xs: 2, sm: 3, md: 4 } }}>
          <Container sx={{ mt: 4, maxWidth: "1200px" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textAlign: { xs: "center", sm: "left" } }}>
              Explore Our Latest Collection ✨
            </Typography>
            <Grid container spacing={{ xs: 3, sm: 4 }}>
              {status === "loading"
                ? Array.from(new Array(8)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Skeleton variant="rectangular" width="100%" height={250} sx={{ borderRadius: "12px" }} />
                      <Skeleton width="80%" sx={{ mt: 1 }} />
                      <Skeleton width="60%" sx={{ mt: 1 }} />
                    </Grid>
                  ))
                : data &&
                  data.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <Fade in={true} timeout={500}>
                        <Box>
                          <ProductCard product={product} />
                        </Box>
                      </Fade>
                    </Grid>
                  ))}
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
