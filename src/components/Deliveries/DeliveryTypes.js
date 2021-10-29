import { useState, useEffect, useContext } from "react";
import UserContext from "UserContext";
import { listDeliveryTypes } from "store/deliveries";

import ListDeliveryTypes from "components/Deliveries/ListDeliveryTypes";
import "./Deliveries.scss";

export default function DeliveryTypes() {
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

  const addDeliverytype = (e) => {
    e.preventDefault();
    toggleType(!addDeliveryTypeToggle);
  };

  return (
    <div className="Deliveries__main-container">
      <button
        onClick={(e) => addDeliverytype(e)}
        className="Users__refresh-button"
      >
        Add new Delivery Type
      </button>

      {deliverytotal.map((item, index) => {
        return <ListDeliveryTypes key={index} deliverytype={item} />;
      })}
    </div>
  );
}
