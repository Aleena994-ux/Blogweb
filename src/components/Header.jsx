import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCrudPage = location.pathname === "/crud";

  return (
    <Box sx={{ backgroundColor: "white", color: "black" }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        {/* Logo */}
        <Box component="img"
          src="https://cdn-icons-png.flaticon.com/128/3669/3669981.png"
          alt="Logo"
          sx={{ height: "50px" }}
        />

        {/* Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
          onClick={() => (isCrudPage ? navigate("/") : navigate("/crud"))}
        >
          {isCrudPage ? "View Blogs" : "Get Started"}
        </Button>
      </Box>

      {/*  Text */}
      <Box sx={{ padding: "50px 20px", textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          {isCrudPage ? "Start Blogging" : "Inspire. Create. Share"}
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: "800px", margin: "auto" }}>
          {isCrudPage
            ? "Create, edit, and manage your blogs here."
            : "Discover amazing content, explore new ideas, and connect with inspiration. This is your starting point for something great."}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
