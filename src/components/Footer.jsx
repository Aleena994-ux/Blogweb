import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#222",
        color: "#fff",
        textAlign: "center",
        p: 3,
        mt: 5,
      }}
    >
      <Typography>© 2025 Blogifyy. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
