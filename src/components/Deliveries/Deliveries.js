import { useState, useEffect, useContext } from "react";
import UserContext from "UserContext";
import { ReactComponent as CartIcon } from "svgs/cartIcon.svg";
import Paper from "@mui/material/Paper";
import { listAgentDelivery } from "store/deliveries";

import "./Deliveries.scss";

export default function Deliveries() {
  const userInfo = useContext(UserContext);
  const [deliveries, setDeliveries] = useState([]);
  const { access_token, userDetails } = userInfo;

  useEffect(() => {
    listAgentDelivery(userDetails.user_id, access_token).then((res) => {
      setDeliveries(res.data.data);
    });
  }, [userDetails.user_id, access_token]);

  return (
    <div className="Deliveries__main-container">
      <div className="Orders__main-heading">
        <div className="General-main-heading">
          <CartIcon /> {"  "} Orders
        </div>
      </div>

      <div>
        {deliveries.map((item, index) => {
          return (
            <Paper key={index} className="Agents__order" elevation={2}>
              <div> delivery_id : {item.delivery_id}</div>

              <div> quantity: {item.quantity}</div>
              <div> price: {item.price}</div>
              <div> total price : {item.price * item.quantity}</div>
              <div> delivery_status: {item.delivery_status}</div>
              <div> delivery_type: {item.delivery_type}</div>
              <div>modified_at : {item.modified_at}</div>
            </Paper>
          );
        })}
      </div>
    </div>
  );
}
