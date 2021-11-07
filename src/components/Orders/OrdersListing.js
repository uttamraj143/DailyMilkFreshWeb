import Paper from "@mui/material/Paper";
import { useState } from "react";

export default function OrdersListing(props) {
  const [orderstatus] = useState([
    "booked",
    "intransit",
    "delivered",
    "pickedup",
    "red",
  ]);

  const orderStatus = (userqr) => {
    let statss = orderstatus[userqr];
    return statss ? statss : "Not Available";
  };

  const orderStatusColor = (id) => {
    if (id == 0) return "Orders__blue"; // booked
    if (2) return "Orders__green"; //delivered
    if (3) return "Orders__red"; //cancelled
    if (6) return "Orders__orange"; //intransit
    if (4) return "Orders__yellow"; // pickedup
    // if (6) return "Orders__orange"; //intransit
    return "Orders__grey";
  };

  const orderDate = (userqr) => {
    let dateItem = props.orders.find((item) => item.QRNumber === userqr);
    return dateItem ? dateItem.date : new Date(Date.now()).toLocaleString();
  };

  const openCustomer = (e, userqr) => {
    e.preventDefault();
    props.currentUserSelection(userqr); // emitting data to parent
  };

  const customername = (id) => {
    let nameItem = props.users.find((item) => item.user_id === id);
    let status = nameItem?.name;
    return status;
  };

  const orderType = (id) => {
    let nameItem =
      props.deliveryTypes &&
      props.deliveryTypes.find((item) => item.delivery_type === id);
    return nameItem && nameItem.name;
  };

  const orderProducts = (id) => {
    let nameItem = props.products.find((item) => item.product_type === id);
    return nameItem && nameItem.name;
  };

  return (
    <div className="Orders__card-container">
      {props.orders.map((order, index) => {
        return (
          <Paper
            key={index}
            onClick={(e) => openCustomer(e, order.id)}
            className="Orders__order"
            elevation={2}
          >
            <div className="Orders__date-address-row">
              <div className="Orders__date">{orderDate(order.modified_at)}</div>
              <div className="Orders__address">{order.address}</div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-id">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </span>
                &nbsp; {order.id}
              </div>
              <div
                className={
                  "Orders__status " + orderStatusColor(order.delivery_status)
                }
              >
                {orderStatus(order.delivery_status)}
              </div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Customer</div>
              <div className="cust-idnumber">{customername(order.user_id)}</div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Agent</div>
              <div className="cust-idnumber">
                {customername(order.agent_id)}
              </div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Delivery Type</div>
              <div className="cust-idnumber">
                {orderType(order.delivery_type)}
              </div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Quantity </div>
              <div className="cust-idnumber">{order.quantity}</div>
            </div>

            <div className="Orders__products-row">
              <div className="Orders__product-id">Products</div>
              <div className="Orders__product">
                {orderProducts(order.product_type)}
              </div>
            </div>
          </Paper>
        );
      })}
    </div>
  );
}
