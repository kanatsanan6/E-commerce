import React from "react";
import { Carousel } from "react-bootstrap";
import "./SlideCarousel.css";
import Card from "./Card";
import "bootstrap/dist/css/bootstrap.css";

function SlideCarousel({ products }) {
  const showProductId = ["1", "4", "8"];
  return (
    <div className="slidecarousel">
      <Carousel variant="dark" fade={true}>
        {showProductId.map((productId, index) => (
          <Carousel.Item key={index}>
            <Card products={products} id={productId} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default SlideCarousel;
