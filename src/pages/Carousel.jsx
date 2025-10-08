
import React from "react";
import Slider from "react-slick";
import { Container, Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Blog from "./Blog";

const Carousel = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: false,
  };

  const slides = [
    "https://i.pinimg.com/1200x/ee/12/4d/ee124d919be2ea159dec3e75203872b3.jpg",
    "https://i.pinimg.com/1200x/e2/b4/0f/e2b40ff4bc9cd11aa30d6aaaf1d17d37.jpg",
    "https://i.pinimg.com/1200x/4a/3a/eb/4a3aeb0c75f735f3864b574aeeafdcc8.jpg",
  ];

  return (
    
    <Container sx={{ mt: 5 }}>
        
      <Box sx={{ maxWidth: "1200px", margin: "auto" }}>
        <Slider {...carouselSettings}>
          {slides.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`slide${index}`}
                style={{
                  width: "100%",
                  height: "700px",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))}
        </Slider>
      </Box>
      <Blog/>
    </Container>

  
  );
};
  

export default Carousel;
