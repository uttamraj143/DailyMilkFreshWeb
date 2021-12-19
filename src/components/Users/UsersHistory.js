import { getHistory } from "store/deliveries";
import { useEffect, useContext } from "react";
import UserContext from "UserContext";

export default function UsersHistory() {
  let userInfo = useContext(UserContext);
  let { access_token } = userInfo;
  useEffect(() => {
    let curr_id = window.location.pathname.split("/")[2];
    let data = {
      customer_user_id: curr_id,
      from: new Date().toISOString(),
      to: new Date().toISOString(),
    };
    if (curr_id) {
      getHistory(access_token, data);
    }
  });
  return (
    <div className="main-container">
      Show QR code with Name
      <p>dsds</p>
      List History
    </div>
  );
}
