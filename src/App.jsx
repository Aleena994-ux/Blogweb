import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Carousel from "./pages/Carousel";
import Crud from "./pages/Crud";
import Footer from "./components/Footer";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <Header setSelectedCategory={setSelectedCategory} />
      <Routes>
        <Route path="/" element={<Carousel />} />
        <Route
          path="/crud"
          element={<Crud  />}
        />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
