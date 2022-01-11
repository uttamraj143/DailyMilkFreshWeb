import { getSingleProduct } from "store/products";
import { useEffect, useContext, useState } from "react";
import UserContext from "UserContext";
import Paper from "@mui/material/Paper";
import MySnack from "components/common/MySnack";
import Skeleton from "@mui/material/Skeleton";
import Spinner from "components/common/Spinner";

export default function UsersHistory() {
  let userInfo = useContext(UserContext);
  const [spinner, toggleSpinner] = useState(false);
  let { access_token } = userInfo;
  const [alertmessage, setalertmessage] = useState(null);

  useEffect(() => {
    getCustomerData();
  }, []);

  const getCustomerData = () => {
    toggleSpinner(true);
    let curr_id = window.location.pathname.split("/")[2];

    if (curr_id) {
      getSingleProduct(curr_id, access_token)
        .then((res) => {
          toggleSpinner(false);
          setalertmessage("Data Fetched");
        })
        .catch((res) => {
          if (res && res.response && res.response.status === 401) {
            toggleSpinner(true);
            setalertmessage("Refreshing");
            userInfo.refreshAccessToken();
          }
          toggleSpinner(false);
          setalertmessage("Cannot connect to API ");
        });
    }
  };

  //   const modifyHistoryData = (hist) => {
  //     // setHistoryData(hist);
  //     hist.forEach((item, index) => {
  //       let abc = {
  //         id: index + 1,
  //         user_name: item.UserDetail.name,
  //         // agent_name: item.UserDetail.name,
  //         delivery_type: item.DeliveryType.name,
  //         product: item.Product.name,
  //         quantity: item.quantity,
  //         price: item.price,
  //         delivered_at: new Date(item.delivered_at).toLocaleString("en-Gb"),
  //       };
  //       setHistoryData((prevData) => [...prevData, abc]);
  //     });
  //   };

  return (
    <div className="main-container">
      {!spinner ? (
        <>
          <Paper className="AssignUsers__sub" elevation={2}>
            Customer Unique Scan Code
          </Paper>
        </>
      ) : (
        <div className="Agents__spinners">
          <Spinner />
          <Skeleton animation="wave" height={100} width="80%" />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={210}
            height={118}
          />
        </div>
      )}
      {alertmessage && <MySnack message={alertmessage} />}
    </div>
  );
}
