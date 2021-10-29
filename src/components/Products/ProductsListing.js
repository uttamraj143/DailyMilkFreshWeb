import Paper from "@mui/material/Paper";
import { useState } from "react";
import { updateProduct } from "store/products";

export default function ProductsListing(props) {
  const [product, setProduct] = useState(props.products);
  const orderStatusColor = (status) => {
    if (status === 1) return "Orders__blue";
    if (status === 0) return "Orders__yellow";
    return "Orders__grey";
  };

  const changeAvailability = (e) => {
    let newff = product.availability === 0 ? 1 : 0;

    e.preventDefault();
    setProduct({
      ...product,
      availability: newff,
    });

    let data = {
      availability: newff.toString(),
    };
    updateProduct(props.access_token, product.id, data);
  };

  return (
    <div className="Products__card-container">
      <Paper className="Products__order" elevation={2}>
        <div className="Products__customername">
          <div className="Products__cust-id">In Stock </div>
          <div
            onClick={(e) => changeAvailability(e)}
            className={
              "Products__status " + orderStatusColor(product.availability)
            }
          >
            {product.availability === 1 ? "Available" : "Not available"}
          </div>
        </div>

        <div className="Products__products-row">
          <div className="Products__cust-heading">Name</div>
          <div className="Products__right-column">{product.name}</div>
        </div>
        <div className="Products__products-row">
          <div className="Products__date">Description</div>
          <div className="Products__right-column">{product.description}</div>
        </div>
        <div className="Products__products-row">
          <div className="Products__product-id">Price</div>
          <div className="Products__right-column">{product.price}</div>
        </div>
        <div className="Products__products-row">
          <div className="Products__date">Product Type</div>
          <div className="Products__right-column">{product.product_type}</div>
        </div>
      </Paper>
    </div>
  );
}
