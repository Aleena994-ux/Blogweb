import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);

  const categories = ["Tech", "Lifestyle", "Travel", "Food", "Education"];

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  const handleDelete = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
  };

  const handleUpdate = () => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === editingBlog.id ? editingBlog : blog
    );
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setEditingBlog(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setEditingBlog({ ...editingBlog, image: file });
    }
  };

  const groupedBlogs = blogs.reduce((acc, blog) => {
    if (!acc[blog.category]) acc[blog.category] = [];
    acc[blog.category].push(blog);
    return acc;
  }, {});

  const displayedCategories =
    selectedCategory && selectedCategory !== ""
      ? [selectedCategory]
      : categories;

  return (
    <Box sx={{ padding: "40px" }}>
      {/* Filter */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Display Blogs */}
      {displayedCategories.map((cat) =>
        (groupedBlogs[cat] || []).length > 0 ? (
          <Box key={cat} sx={{ mt: 4 }}>
            {selectedCategory === "" && (
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: "goldenrod",
                  textAlign: "center",
                }}
              >
                {cat}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
              }}
            >
              {(groupedBlogs[cat] || []).map((blog) => (
                <Card
                  key={blog.id}
                  sx={{
                    width: "300px",
                    height: editingBlog?.id === blog.id ? "auto" : "420px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                >
                  {editingBlog?.id === blog.id ? (
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        alignItems: "center",
                        backgroundColor: "#fafafa",
                      }}
                      elevation={3}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        Edit Blog
                      </Typography>

                      <TextField
                        label="Title"
                        value={editingBlog.title}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, title: e.target.value })
                        }
                        fullWidth
                        size="small"
                      />

                      <TextField
                        label="Content"
                        value={editingBlog.content}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, content: e.target.value })
                        }
                        fullWidth
                        multiline
                        rows={3}
                        size="small"
                      />

                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "0.9rem", mt: 1 }}
                      >
                        Category
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select
                          value={editingBlog.category}
                          onChange={(e) =>
                            setEditingBlog({ ...editingBlog, category: e.target.value })
                          }
                        >
                          {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                              {cat}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        sx={{ mt: 1 }}
                      >
                        Add Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </Button>

                      {editingBlog.image && (
                        <Box sx={{ mt: 1 }}>
                          <img
                            src={editingBlog.image}
                            alt="Preview"
                            style={{
                              width: "100%",
                              maxHeight: "120px",
                              objectFit: "contain",
                              borderRadius: "8px",
                            }}
                          />
                        </Box>
                      )}

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                        sx={{ mt: 1 }}
                      >
                        Save
                      </Button>
                    </Paper>
                  ) : (
                    <>
                      {blog.image && (
                        <CardMedia
                          component="img"
                          height="200"
                          image={blog.image}
                          alt={blog.title}
                          sx={{
                            objectFit: "contain",
                            backgroundColor: "#f0f0f0",
                          }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", textAlign: "center" }}
                        >
                          {blog.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {blog.content}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 2,
                          p: 1,
                        }}
                      >
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(blog)}
                          sx={{
                            border: "1px solid #1976d2",
                            "&:hover": { backgroundColor: "#e3f2fd" },
                          }}
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(blog.id)}
                          sx={{
                            border: "1px solid #d32f2f",
                            "&:hover": { backgroundColor: "#ffebee" },
                          }}
                        >
                          <FaTrash />
                        </IconButton>
                      </Box>
                    </>
                  )}
                </Card>
              ))}
            </Box>
          </Box>
        ) : null
      )}
    </Box>
  );
};

export default Blog;
