import Paper from '@material-ui/core/Paper';

export default function OrdersListing(props) {
  const orderStatus = (userqr) => {
    let statss = props.orders.find((item) => item.QRNumber === userqr);
    return statss
      ? statss.status.charAt(0).toUpperCase() + statss.status.slice(1)
      : 'Not Available';
  };

  const orderStatusColor = (userqr) => {
    let statss = props.orders.find((item) => item.QRNumber === userqr);
    if (statss && statss.status === 'booked') return 'Orders__blue';
    if (statss && statss.status === 'pickedup') return 'Orders__yellow';
    if (statss && statss.status === 'intransit') return 'Orders__orange';
    if (statss && statss.status === 'delivered') return 'Orders__green';
    if (statss && statss.status === 'cancelled') return 'Orders__red';
    return 'Orders__grey';
  };

  const orderDate = (userqr) => {
    let dateItem = props.orders.find((item) => item.QRNumber === userqr);
    return dateItem ? dateItem.date : new Date(Date.now()).toLocaleString();
  };

  const openCustomer = (e, userqr) => {
    e.preventDefault();
    props.currentUserSelection(userqr); // emitting data to parent
  };

  return (
    <div className="Orders__card-container">
      {props.users.map((user, index) => {
        return (
          <Paper
            key={index}
            onClick={(e) => openCustomer(e, user.QRNumber)}
            className="Orders__order"
            elevation={2}
          >
            <div className="Orders__date-address-row">
              <div className="Orders__date">{orderDate(user.QRNumber)}</div>
              <div className="Orders__address">{user.address}</div>
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
                &nbsp; {user.QRNumber}
              </div>
              <div
                className={'Orders__status ' + orderStatusColor(user.QRNumber)}
              >
                {orderStatus(user.QRNumber)}
              </div>
            </div>

            <div className="Orders__customername">
              <div className="Orders__cust-heading">Customer</div>
              <div className="cust-idnumber">{user.customername}</div>
            </div>

            <div className="Orders__products-row">
              <div className="Orders__product-id">Products</div>
              <div className="Orders__product">{user.Products}</div>
            </div>
            <div className="Orders__products-row">
              <div className="Orders__date">Scan QR</div>
              <div className="Orders__address">scanned</div>
            </div>
          </Paper>
        );
      })}
    </div>
  );
}
