export default function ListAgentDeliveryProducts(props) {
  const orderstatus = [
    "booked",
    "deliveredO",
    "deliveredS",
    "cancelled",
    "intransit",
    "pickedup",
  ];

  const orderStatusColor = (id) => {
    if (id === "booked") return "Orders__blue";
    if (id === "deliveredO") return "Orders__green";
    if (id === "deliveredS") return "Orders__green";
    if (id === "cancelled") return "Orders__red";
    if (id === "intransit") return "Orders__orange";
    if (id === "pickedup") return "Orders__yellow";
    return "Orders__grey";
  };

  const openCustomer = (
    e,
    delivery_id,
    user_id,
    quantity,
    del_type,
    product_type
  ) => {
    e.preventDefault();
    props.setCurrentUser({
      delivery_id,
      user_id,
      quantity,
      del_type,
      product_type,
    });
  };

  const orderStatus = (userqr) => {
    let statss = orderstatus[userqr];
    return statss ? statss : "Not Available";
  };

  const orderType = (id) => {
    let nameItem = props.deliveryTypes.find(
      (item) => item.delivery_type === id
    );
    return nameItem && nameItem.name;
  };

  return (
    <>
      {props.products.map((product, index) => {
        return (
          <div key={index}>
            <div className="Deliveries__products-row">
              <div className="Orders__product-id">Delivery Status</div>
              <div
                onClick={(e) =>
                  openCustomer(
                    e,
                    props.delivery_id,
                    props.user_id,
                    product.quantity,
                    product.delivery_type,
                    product.product_type
                  )
                }
                className={
                  "Orders__status " +
                  orderStatusColor(orderStatus(product.delivery_status))
                }
              >
                {orderStatus(product.delivery_status)}
              </div>
            </div>

            {/* <div className="Orders__date">
                {new Date(order.Product.modified_at).toLocaleString("en-GB")}
              </div> */}

            <div className="Orders__products-row">
              <div className="Orders__product-id">Products</div>
              <div className="Orders__product">
                {product.name} - {product.quantity}
              </div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Price </div>
              <div className="cust-idnumber"> &#8377; {product.price}/- </div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Delivery Type</div>
              <div className="cust-idnumber">
                {orderType(product.delivery_type)}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
