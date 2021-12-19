import { useState, useEffect, useContext } from "react";
import UserContext from "UserContext";
import { ReactComponent as CartIcon } from "svgs/cartIcon.svg";
import { listAgentDelivery, listDeliveryTypes } from "store/deliveries";
import ListAgentDeliveries from "components/Deliveries/ListAgentDeliveries";
import Spinner from "components/common/Spinner";
import Skeleton from "@mui/material/Skeleton";
import "../Orders/Orders.scss";
import "./Deliveries.scss";

export default function Deliveries() {
  const userInfo = useContext(UserContext);
  const [deliveries, setDeliveries] = useState([]);
  const { access_token, userDetails, refreshAccessToken } = userInfo;
  const [deliveryTypes, setDeliveryTypes] = useState([]);
  const [spinner, toggleSpinner] = useState(false);

  useEffect(() => {
    toggleSpinner(true);
    listAgentDelivery(userDetails.user_id, access_token)
      .then((res) => {
        setDeliveries(res.data.data);
      })
      .catch((res) => {
        toggleSpinner(true);
        if (res && res.response && res.response.status === 401) {
          refreshAccessToken();
        }
      });
    listDeliveryTypes(access_token)
      .then((res) => {
        setDeliveryTypes(res.data.data);
        setTimeout(() => {
          toggleSpinner(false);
        }, 1000);
      })
      .catch((res) => {
        toggleSpinner(true);
      });
  }, [userDetails.user_id, access_token, refreshAccessToken]);

  return (
    <div className="main-container">
      <div className="Orders__main-heading">
        <div className="General-main-heading">
          <CartIcon /> {"  "} Agent Deliveries
        </div>
      </div>
      <div>
        {spinner && !deliveries.length ? (
          <>
            <Spinner />
            <Skeleton animation="wave" height={100} width="80%" />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={210}
              height={118}
            />
          </>
        ) : (
          <ListAgentDeliveries
            agent={userInfo.userDetails.name}
            // refreshdata={refreshdata}
            deliveryTypes={deliveryTypes}
            deliveries={deliveries}
          />
        )}
      </div>
    </div>
  );
}
