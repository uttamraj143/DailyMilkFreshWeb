import Paper from "@mui/material/Paper";
// import { useState } from "react";

export default function OrdersListing(props) {
  const openCustomer = (e, userqr) => {
    e.preventDefault();
    props.currentUserSelection(userqr); // emitting data to parent
  };

  const orderStatusColor = (id) => {
    if (id === "booked") return "Orders__blue";
    if (id === "delivered") return "Orders__green";
    if (id === "cancelled") return "Orders__red";
    if (id === "intransit") return "Orders__orange";
    if (id === "pickedup") return "Orders__yellow";
    return "Orders__grey";
  };

  const goToMaps = (e, a, b) => {
    e.preventDefault();
    let url = `https://www.google.com/maps/search/?api=1&query= ${a} , ${b}`;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="Orders__card-container">
      {props.orders.map((order, index) => {
        return (
          <Paper key={index} className="Orders__order" elevation={2}>
            <div className="Orders__date-address-row">
              <div className="Orders__date">{order.modified_at}</div>
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
                onClick={(e) => openCustomer(e, order.id)}
                className={
                  "Orders__status " +
                  orderStatusColor(order.delivery_status.toString())
                }
              >
                {order.delivery_status}
              </div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Customer</div>
              <div className="cust-idnumber">{order.user_name}</div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Agent</div>
              <div className="cust-idnumber">{order.agent_name}</div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Delivery Type</div>
              <div className="cust-idnumber">{order.delivery_type}</div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Google Location</div>
              <div
                onClick={(e) => goToMaps(e, order.lat, order.lng)}
                className="cust-idnumber Orders__status "
              >
                Click Here - Maps
              </div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Quantity </div>
              <div className="cust-idnumber">{order.quantity}</div>
            </div>

            <div className="Orders__products-row">
              <div className="Orders__product-id">Products</div>
              <div className="Orders__product">{order.product}</div>
            </div>
          </Paper>
        );
      })}
    </div>
  );
}
