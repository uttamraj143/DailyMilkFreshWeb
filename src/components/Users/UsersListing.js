import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import userIcon from "svgs/singlePerson.svg";

export default function OrdersListing(props) {
  let navigate = useNavigate();
  const openUser = (e, id) => {
    e.preventDefault();
    navigate(`/agents/${id}`);
  };

  return (
    <div className="Users__card-container">
      {props.users.map((user, index) => {
        return (
          <Paper
            onClick={(e) => openUser(e, user.user_id)}
            key={index}
            className="Users__order"
            elevation={2}
          >
            <div className="Users__customername">
              <div className="Users__cust-id">
                <span>
                  <img src={userIcon} alt="user" />
                </span>
                &nbsp; User Type
              </div>
              <div className={"Users__status "}>User</div>
            </div>

            <div className="Users__products-row">
              <div className="Users__cust-heading">Customer Name</div>
              <div className="Users__right-column">{user.name}</div>
            </div>
            <div className="Users__products-row">
              <div className="Users__date">Phone</div>
              <div className="Users__right-column">{user.phone_no}</div>
            </div>
            <div className="Users__products-row">
              <div className="Users__product-id">Email</div>
              <div className="Users__right-column">{user.email_id}</div>
            </div>
            <div className="Users__products-row">
              <div className="Users__date">Address</div>
              <div className="Users__right-column">{user.address}</div>
            </div>
            <div className="Users__date-address-row">
              <div className="Users__date">Joined Date</div>
              <div className="Users__right-column">
                {new Date(user.created_at).toLocaleString()}
              </div>
            </div>
          </Paper>
        );
      })}
    </div>
  );
}
