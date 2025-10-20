import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import commonAPI from "../service/commonAPI";
import BASEURL from "../service/serverURL";

const BlogDetail = () => {
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get("id");
        if (id) {
            commonAPI("GET", `${BASEURL}/blogs/${id}`, {}).then(res => {
                setBlog(res.data);
            });
        }
    }, [location.search]);

    if (!blog) return <Typography sx={{ textAlign: "center", mt: 10 }}>Loading...</Typography>;

    return (
        <Box sx={{ padding: "40px", minHeight: "100vh", position: "relative" }}>

            <Box
                sx={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    cursor: "pointer",
                    zIndex: 10,
                }}
                onClick={() => navigate(-1)}
            >
                <FiArrowLeft size={28} color="#9e5d20" />
            </Box>

            {/* Blog Image */}
            {blog.imageUrl && (
                <Box
                    component="img"
                    src={blog.imageUrl}
                    alt={blog.title}
                    sx={{
                        display: "block",
                        maxWidth: "700px",
                        width: "100%",
                        maxHeight: "500px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        mb: 3,
                        ml: { xs: 2, sm: 4, md: 10 },
                    }}
                />
            )}


            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                {blog.title}
            </Typography>


            <Typography variant="subtitle1" sx={{ mb: 3, color: "#555" }}>
                By: {blog.author} | Category: {blog.category}
            </Typography>


            <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.8 }}>
                {blog.content}
            </Typography>
        </Box>
    );
};

export default BlogDetail;
