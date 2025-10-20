import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { FaPenFancy, FaSearch, FaBook, FaEdit, FaDesktop, FaShareAlt } from "react-icons/fa";
import commonAPI from "../service/commonAPI";
import BASEURL from "../service/serverURL";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getBlogs = async () => {
    const result = await commonAPI("GET", `${BASEURL}/blogs`, {});
    setBlogs(result.data || []);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleDelete = async (id) => {
    await commonAPI("DELETE", `${BASEURL}/blogs/${id}`, {});
    getBlogs();
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  // About section features
  const features = [
    { icon: <FaPenFancy size={30} />, title: "Write Blogs", desc: "Easily create and publish your own blogs." },
    { icon: <FaSearch size={30} />, title: "Search Blogs", desc: "Find blogs by title or category quickly." },
    { icon: <FaBook size={30} />, title: "Read Blogs", desc: "Enjoy reading detailed blogs with images." },
    { icon: <FaEdit size={30} />, title: "Edit Blogs", desc: "Update your content anytime you want." },
    { icon: <FaDesktop size={30} />, title: "Access Anywhere", desc: "Read and write blogs seamlessly from any device or browser." },
    { icon: <FaShareAlt size={30} />, title: "Global Community", desc: "Share ideas and learn from bloggers all over the world." },
  ];

  return (
    <Box sx={{ padding: "40px", minHeight: "100vh" }}>
      {/* Banner Image */}
      <Box
        component="img"
        src="/bg1.jpg"
        alt="Blog Banner"
        sx={{
          width: "100%",
          maxWidth: "1200px",
          height: "500px",
          objectFit: "cover",
          borderRadius: "1px",
          mb: 4,
          display: "block",
          margin: "auto",
        }}
      />

      {/* About Section */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, mt: 8, textAlign: "center", color: "#222" }}
        >

        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
            gap: 4,
            textAlign: "center",
          }}
        >
          {features.map((f, idx) => (
            <Box key={idx} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box sx={{ color: "#9e5d20ff", mb: 1 }}>{f.icon}</Box>
              <Typography sx={{ fontWeight: "bold", color: "#222", mb: 0.5 }}>{f.title}</Typography>
              <Typography sx={{ color: "#333", fontSize: "0.9rem" }}>{f.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", pt: 5, mb: 4 }}>
        <TextField
          label="Search by title or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "80%", sm: "60%", md: "40%" } }}
        />
      </Box>

      {/* Blog Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 4,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {filteredBlogs.map((blog) => (
          <Paper
            key={blog.id}
            elevation={6}
            sx={{
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
              padding: "20px 15px",
              textAlign: "center",
              width: "500px",
              height: "470px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: blog.imageUrl ? "flex-start" : "center",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 6px 25px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            {/* Category */}
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: "#9e5d20ff",
                color: "white",
                px: 1.5,
                py: 0.5,
                borderRadius: "15px",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              {blog.category}
            </Box>

            {/* Blog Image */}
            <Box sx={{ mt: "auto" }}>
              {blog.imageUrl && (
                <Box
                  component="img"
                  src={blog.imageUrl}
                  alt={blog.title}
                  sx={{
                    width: "100%",
                    height: "175px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    mb: 2,
                  }}
                />
              )}

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#9e5d20ff",
                  mb: 1,
                }}
              >
                {blog.title}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ color: "#555", fontWeight: 500, mb: 1 }}
              >
                By: {blog.author}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  mb: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {blog.content}
              </Typography>
            </Box>


            {/* Read More Button */}
            <Button
              variant="text"
              sx={{ color: "#9e5d20ff", fontWeight: "bold", mb: 2 }}
              onClick={() => navigate(`/blog-detail?id=${blog.id}`)}
            >
              Read More
            </Button>

            {/* Edit & Delete Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#9e5d20ff",
                  "&:hover": { backgroundColor: "#daa520" },
                }}
                onClick={() => navigate(`/crud?id=${blog.id}`)}
              >
                Edit
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "#9e5d20ff",
                  color: "#9e5d20ff",
                  "&:hover": {
                    borderColor: "#daa520",
                    color: "#d7ad43ff",
                  },
                }}
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Blog;
