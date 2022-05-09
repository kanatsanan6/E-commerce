import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SlideCarousel.css";
import Card from "./Card";

function SlideCarousel({products}) {
  const showProductId = ["1", "4", "8"];
  return (
    <div className="slidecarousel">
      <Carousel variant="dark">
        {showProductId.map((productId) => (
          <Carousel.Item>
            <Card products={products} id={productId} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default SlideCarousel;
