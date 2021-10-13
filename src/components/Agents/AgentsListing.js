import Paper from "@mui/material/Paper";

export default function OrdersListing(props) {
  return (
    <div className="Agents__card-container">
      {props.agents.map((user, index) => {
        return (
          <Paper key={index} className="Agents__order" elevation={2}>
            <div className="Agents__customername">
              <div className="Agents__cust-id">
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
                &nbsp; User Type
              </div>
              <div className={"Agents__status "}>Agent</div>
            </div>

            <div className="Agents__products-row">
              <div className="Agents__cust-heading">Customer</div>
              <div className="Agents__right-column">{user.name}</div>
            </div>
            <div className="Agents__products-row">
              <div className="Agents__date">Phone</div>
              <div className="Agents__right-column">{user.phone_no}</div>
            </div>
            <div className="Agents__products-row">
              <div className="Agents__product-id">Email</div>
              <div className="Agents__right-column">{user.email_id}</div>
            </div>
            <div className="Agents__products-row">
              <div className="Agents__date">Address</div>
              <div className="Agents__right-column">{user.address}</div>
            </div>
            <div className="Agents__date-address-row">
              <div className="Agents__date">Joined Date</div>
              <div className="Agents__right-column">
                {new Date(user.created_at).toLocaleString()}
              </div>
            </div>
          </Paper>
        );
      })}
    </div>
  );
}
