import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";

const Crud = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const categories = ["Tech", "Lifestyle", "Travel", "Food", "Education"];

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  const handleAddBlog = () => {
    if (!title || !content || !category) {
      alert("Please fill all fields before adding a blog.");
      return;
    }

    const newBlog = { id: Date.now(), title, content, category, image };
    let updatedBlogs;

    if (editingId) {
      updatedBlogs = blogs.map((blog) =>
        blog.id === editingId ? { ...blog, title, content, category, image } : blog
      );
      setEditingId(null);
    } else {
      updatedBlogs = [...blogs, newBlog];
    }

    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setTitle("");
    setContent("");
    setCategory("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setImage(file);
    }
  };

  return (
    <Box
      sx={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          "linear-gradient(to right, #f9f9f9, #f3f3f3)",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: "30px",
          width: "90%",
          maxWidth: "600px",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 3,
            color: "#333",
          }}
        >
          {editingId ? "Edit Blog" : "Create New Blog"}
        </Typography>

        {/* Input Fields */}
        <TextField
          label="Blog Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{
            mb: 2,
          
              borderRadius: "12px",
              backgroundColor: "#fafafa",
              "& fieldset": { borderColor: "#ccc" },
              "&:hover fieldset": { borderColor: "#007bff" },
              "&.Mui-focused fieldset": { borderColor: "#007bff" },
            
          }}
        />

        <TextField
          label="Content"
          variant="outlined"
          multiline
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#fafafa",
              "& fieldset": { borderColor: "#ccc" },
              "&:hover fieldset": { borderColor: "#007bff" },
              "&.Mui-focused fieldset": { borderColor: "#007bff" },
            },
          }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              borderRadius: "12px",
              backgroundColor: "#fafafa",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#007bff",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#007bff",
              },
            }}
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          component="label"
          sx={{
            color: "#007bff",
            borderColor: "#007bff",
            borderRadius: "12px",
            mb: 2,
            textTransform: "none",
            "&:hover": {
              borderColor: "#0056b3",
              backgroundColor: "#e3f2fd",
            },
          }}
        >
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>

        {image && (
          <Box
            sx={{
              marginBottom: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={image}
              alt="preview"
              style={{
                maxWidth: "200px",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleAddBlog}
          sx={{
            mt: 1,
            py: 1.2,
            borderRadius: "12px",
            backgroundColor: "#007bff",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          {editingId ? "Update Blog" : "Add Blog"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Crud;
