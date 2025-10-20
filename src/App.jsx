import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddBlog from "./pages/AddBlog";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/crud" element={<AddBlog />} />
        <Route path="/crud/:id" element={<AddBlog />} />
        <Route path="/blog-detail" element={<BlogDetail />} />
       </Routes>
      <Footer />
    </>
  );
}

export default App;
