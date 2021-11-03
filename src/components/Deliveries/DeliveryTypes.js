import { useState, useEffect, useContext } from "react";
import UserContext from "UserContext";
import { listDeliveryTypes, addDeliveryTypes } from "store/deliveries";
import { ReactComponent as UsersIcon } from "components/svgs/userBadge.svg";

import ListDeliveryTypes from "components/Deliveries/ListDeliveryTypes";
import "./Deliveries.scss";

export default function DeliveryTypes() {
  const userInfo = useContext(UserContext);
  const [deliverytotal, setDeliveryTypes] = useState([]);
  const [addDeliveryTypeToggle, toggleType] = useState(false);
  const [deliveryTypeName, setDeliveryTypeName] = useState(null);
  const [deliveryTypeDescription, setDeliveryTypeDescription] = useState(null);

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
  }, [userInfo.access_token, userInfo, addDeliveryTypeToggle]);
  // need to change addDeliveryTypeToggle in useeffect after submit

  const addDeliverytype = (e) => {
    e.preventDefault();
    toggleType(!addDeliveryTypeToggle);
  };

  const submitDeliveryType = (e) => {
    e.preventDefault();
    if (!deliveryTypeName || !deliveryTypeDescription) return;
    let data = {
      name: deliveryTypeName,
      description: deliveryTypeDescription,
    };
    addDeliveryTypes(userInfo.access_token, data).then((res) => {
      if ((res.status = 200)) toggleType(!addDeliveryTypeToggle);
      setDeliveryTypeName("");
      setDeliveryTypeDescription("");
    });
  };

  return (
    <div className="Deliveries__main-container">
      <div className="Orders__main-heading">
        <div className="General-main-heading">
          <UsersIcon /> {"  "} Delivery Types
        </div>
        <div>
          <button
            className="Users__refresh-button"
            onClick={(e) => addDeliverytype(e)}
          >
            {addDeliveryTypeToggle ? "Cancel Adding" : "Add new Delivery Type"}
          </button>
        </div>
      </div>

      {!addDeliveryTypeToggle ? (
        deliverytotal.map((item, index) => {
          return (
            <ListDeliveryTypes
              access_token={userInfo.access_token}
              key={index}
              deliverytype={item}
            />
          );
        })
      ) : (
        <>
          <div className="Login__col-3">
            <input
              className="Login__input-focus-effect"
              placeholder="name"
              type="text"
              value={deliveryTypeName}
              onChange={(e) => setDeliveryTypeName(e.target.value)}
            />
          </div>
          <div className="Login__col-3">
            <input
              className="Login__input-focus-effect"
              placeholder="description"
              type="text"
              value={deliveryTypeDescription}
              onChange={(e) => setDeliveryTypeDescription(e.target.value)}
            />
          </div>
          <div className="Login__col-3">
            <button
              className="Users__refresh-button"
              onClick={(e) => submitDeliveryType(e)}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
