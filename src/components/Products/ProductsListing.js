import Paper from "@mui/material/Paper";

export default function OrdersListing(props) {
  return (
    <div className="Products__card-container">
      {props.products.map((product, index) => {
        return (
          <Paper key={index} className="Products__order" elevation={2}>
            <div className="Products__customername">
              <div className="Products__cust-id">In Stock </div>
              <div className={"Products__status "}>
                {product.availability === 1 ? "Available" : "Not available"}
              </div>
            </div>

            <div className="Products__products-row">
              <div className="Products__cust-heading">Name</div>
              <div className="Products__right-column">{product.name}</div>
            </div>
            <div className="Products__products-row">
              <div className="Products__date">Description</div>
              <div className="Products__right-column">
                {product.description}
              </div>
            </div>
            <div className="Products__products-row">
              <div className="Products__product-id">Price</div>
              <div className="Products__right-column">{product.price}</div>
            </div>
            <div className="Products__products-row">
              <div className="Products__date">Product Type</div>
              <div className="Products__right-column">
                {product.product_type}
              </div>
            </div>
          </Paper>
        );
      })}
    </div>
  );
}
