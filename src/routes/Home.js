import React from "react";
import Header from "../components/HomePage/Header/Header";
import SlideCarousel from "../components/HomePage/Carousel/SlideCarousel"
import AllProduct from "../components/HomePage/ProductPreview/AllProduct";

function Home() {
  return (
    <div>
      <Header />
      <SlideCarousel />
      <AllProduct />
    </div>
  );
}

export default Home;
