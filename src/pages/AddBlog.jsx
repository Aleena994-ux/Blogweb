import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Paper } from "@mui/material";
import commonAPI from "../service/commonAPI";
import BASEURL from "../service/serverURL";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const categories = ["Tech", "Lifestyle", "Travel", "Food", "Education"];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (id) {
      setEditingId(id);
      // Fetch blog data
      commonAPI("GET", `${BASEURL}/blogs/${id}`, {}).then(res => {
        const data = res.data;
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setAuthor(data.author);
        setImageUrl(data.imageUrl || "");
      });
    }
  }, [location.search]);

  const handleSave = async () => {
    if (!title || !content || !category || !author) {
      alert("Please fill all fields.");
      return;
    }

    const blogData = { title, content, category, author, imageUrl };

    if (editingId) {
      await commonAPI("PUT", `${BASEURL}/blogs/${editingId}`, blogData);
      alert("Blog updated successfully!");
    } else {
      await commonAPI("POST", `${BASEURL}/blogs`, blogData);
      alert("Blog added successfully!");
    }

    navigate("/");
  };

  return (
    <Box
      sx={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f3f3f3",
      }}
    >
      <Paper
        sx={{
          padding: "30px",
          width: "90%",
          maxWidth: "600px",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
        elevation={5}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
        >
          {editingId ? "Edit Blog" : "Create New Blog"}
        </Typography>

        <TextField
          label="Blog Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Author Name"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL(optional)"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" fullWidth onClick={handleSave}>
          {editingId ? "Update Blog" : "Add Blog"}
        </Button>
      </Paper>
    </Box>
  );
};

export default AddBlog;
