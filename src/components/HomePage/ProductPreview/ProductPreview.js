import React from "react";
import NormalDetail from "./NormalDetail";
import "./ProductPreview.css";

function ProductPreview({products}) {
  
  return (
    <div className="productpreview">
      {products.map((product) => (
        <div>
          <NormalDetail product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductPreview;
