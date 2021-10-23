import { useState, useEffect, useContext } from "react";
import UserContext from "UserContext";
import { listDeliveryTypes } from "store/deliveries";
import AssignUsers from "components/Deliveries/AssignUsers";

import ListDeliveryTypes from "components/Deliveries/ListDeliveryTypes";
import "./Deliveries.scss";

export default function Deliveries() {
  const userInfo = useContext(UserContext);
  const [deliverytotal, setDeliveryTypes] = useState([]);
  const [addDeliveryTypeToggle, toggleType] = useState(false);

  useEffect(() => {
    const getDeliveryTypes = () => {
      listDeliveryTypes(userInfo.access_token)
        .then((res) => {
          setDeliveryTypes(res.data.data);
        })
        .catch((res) => {
          console.log(res);
          if (res && res.response && res.response.status === 401) {
            userInfo.refreshAccessToken();
          }
        });
    };
    getDeliveryTypes();
  }, [userInfo.access_token, userInfo]);

  return (
    <div className="Deliveries__main-container">
      <button className="Deliveries__add-button">Add new Delivery Type</button>

      {deliverytotal.length && (
        <ListDeliveryTypes deliverytotal={deliverytotal} />
      )}

      <div className="mmm">
        <AssignUsers />
      </div>
    </div>
  );
}
