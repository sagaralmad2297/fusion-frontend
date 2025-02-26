import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#172337",
        color: "#fff",
        padding: "40px 20px",
        marginTop: "40px",
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* Company Section */}
        <Grid item xs={6} sm={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Company
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              About Us
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Careers
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Blog
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Press
            </Link>
          </Box>
        </Grid>

        {/* Help Section */}
        <Grid item xs={6} sm={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Help
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Payments
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Shipping
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Cancellation & Returns
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              FAQ
            </Link>
          </Box>
        </Grid>

        {/* Policy Section */}
        <Grid item xs={6} sm={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Policy
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Return Policy
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Terms of Use
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Security
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Privacy
            </Link>
          </Box>
        </Grid>

        {/* Social Section */}
        <Grid item xs={6} sm={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Social
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="#" color="inherit">
              <Facebook />
            </Link>
            <Link href="#" color="inherit">
              <Twitter />
            </Link>
            <Link href="#" color="inherit">
              <Instagram />
            </Link>
            <Link href="#" color="inherit">
              <LinkedIn />
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright Section */}
      <Box
        sx={{
          borderTop: "1px solid #444",
          paddingTop: "20px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © 2023 Fassio. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;