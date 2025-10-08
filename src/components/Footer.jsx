import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#222",
        color: "#fff",
        py: 4,
        px: 2,
        mt: 6,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        My Blog Website
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Link href="/" color="inherit" underline="hover" sx={{ mx: 1 }}>
          Home
        </Link>
        <Link href="/about" color="inherit" underline="hover" sx={{ mx: 1 }}>
          About
        </Link>
        <Link href="/contact" color="inherit" underline="hover" sx={{ mx: 1 }}>
          Contact
        </Link>
      </Box>

      <Box sx={{ mb: 2 }}>
        <IconButton color="inherit" href="https://facebook.com">
          <FaFacebook />
        </IconButton>
        <IconButton color="inherit" href="https://twitter.com">
          <FaTwitter />
        </IconButton>
        <IconButton color="inherit" href="https://instagram.com">
          <FaInstagram />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={{ color: "#aaa" }}>
        © {new Date().getFullYear()} My Blog Website. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
