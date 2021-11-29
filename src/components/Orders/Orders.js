import { useState, useEffect, useContext, useCallback } from "react";
import UserContext from "UserContext";
import OrdersListing from "components/Orders/OrdersListing";
import OrderPage from "components/Orders/OrderPage";
import MiniNavbar from "components/common/MiniNavbar";
import { ReactComponent as CartIcon } from "svgs/cartIcon.svg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Spinner from "components/common/Spinner";
import Skeleton from "@mui/material/Skeleton";
import { listAgentUsers } from "store/assignUsers";
import { listUsers } from "store/user";
import { listProducts } from "store/products";
import { listDeliveryTypes } from "store/deliveries";
import ExportData from "components/Dashboard/ExportData";
import "./Orders.scss";

export default function Orders() {
  const userInfo = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  // const [sortNumbers, setSortNumbers] = useState(false);
  const [addexport, exportToggle] = useState(false);
  // const [sortName, setSortName] = useState(false);
  // const [sortLocation, setSortLocation] = useState(false);
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [convertedOrders, setConvertedOrders] = useState([]);
  const [sortOrders, setSortOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [spinner, toggleSpinner] = useState(false);
  const [products, setProducts] = useState([]);
  const [deliveryTypes, setDeliveryTypes] = useState([]);

  const { access_token, refreshAccessToken } = userInfo;

  useEffect(() => {
    toggleSpinner(true);
    listUsers(null, access_token)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((res) => {
        console.log(res);
        if (res && res.response && res.response.status === 401) {
          refreshAccessToken();
        }
      });
    listDeliveryTypes(access_token)
      .then((res) => {
        setDeliveryTypes(res.data.data);
      })
      .catch((res) => {
        console.log(res);
        if (res && res.response && res.response.status === 401) {
          refreshAccessToken();
        }
      });
    listProducts(null, access_token)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((res) => {
        console.log(res);
        if (res && res.response && res.response.status === 401) {
          refreshAccessToken();
        }
      });
    listAgentUsers(access_token)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((res) => {
        console.log(res);
        if (res && res.response && res.response.status === 401) {
          refreshAccessToken();
        }
      });
    setTimeout(() => {
      toggleSpinner(false);
    }, 2000);
  }, [access_token, refreshAccessToken]);

  const currentUserSelection = (user) => {
    setCurrentUser(user);
  };

  const clearCurrentUser = () => {
    setCurrentUser(null);
  };

  const sortByName = () => {
    return;
    // if (sortName) {
    //   setUsers(users.sort((a, b) => a.name.localeCompare(b.name)));
    //   setSortName(!sortName);
    // } else {
    //   setUsers(users.sort((a, b) => b.name.localeCompare(a.name)));
    //   setSortName(!sortName);
    // }
  };

  const sortByNumber = (e) => {
    return;
    // if (sortNumbers) {
    //   setUsers(orders.slice(0).sort((a, b) => parseInt(a.id) - parseInt(b.id)));
    //   setSortNumbers(!sortNumbers);
    // } else {
    //   setUsers(orders.slice(0).sort((a, b) => parseInt(b.id) - parseInt(a.id)));
    //   setSortNumbers(!sortNumbers);
    // }
  };

  const sortByLocation = (e) => {
    return;
    // if (sortLocation) {
    //   setUsers(users.sort((a, b) => a.address.localeCompare(b.address)));
    //   setSortLocation(!sortLocation);
    // } else {
    //   setUsers(users.sort((a, b) => b.address.localeCompare(a.address)));
    //   setSortLocation(!sortLocation);
    // }
  };

  const modifyOrders = useCallback(
    (e, val) => {
      e && e.preventDefault();
      setPage(val);
      const slicedArray = convertedOrders.slice((val - 1) * 6, val * 6);
      setSortOrders(slicedArray);
    },
    [convertedOrders]
  );

  const nnn = useCallback(() => {
    const orderstatus = ["booked", "intransit", "delivered", "pickedup", "red"];

    const orderStatus = (userqr) => {
      let statss = orderstatus[userqr];
      return statss ? statss : "Not Available";
    };

    const orderDate = (userqr) => {
      let dateItem = orders.find((item) => item.QRNumber === userqr);
      return dateItem ? dateItem.date : new Date(Date.now()).toLocaleString();
    };

    const customername = (id) => {
      let nameItem = users.find((item) => item.user_id === id);
      let status = nameItem?.name;
      return status;
    };

    const orderType = (id) => {
      let nameItem = deliveryTypes.find((item) => item.delivery_type === id);
      return nameItem && nameItem.name;
    };

    const orderProducts = (id) => {
      let nameItem = products.find((item) => item.product_type === id);
      return nameItem && nameItem.name;
    };

    setConvertedOrders([]);
    orders.forEach((item) => {
      let abc = {
        user_id: item.user_id,
        delivery_id: item.delivery_id,
        user_name: customername(item.user_id),
        agent_name: customername(item.agent_id),
        delivery_type: orderType(item.delivery_type),
        product: orderProducts(item.product_type),
        delivery_status: orderStatus(item.delivery_status),
        quantity: item.quantity,
        price: item.price,
        lat: item.lat,
        lng: item.long,
        id: item.id,
        modified_at: orderDate(item.modified_at),
      };

      setConvertedOrders((prevData) => [...prevData, abc]);
    });
  }, [orders, deliveryTypes, products, users]);

  useEffect(() => {
    modifyOrders(null, 1);
  }, [convertedOrders, modifyOrders]);

  useEffect(() => {
    nnn();
  }, [orders, nnn]);

  return (
    <div className="Orders__main-container">
      {spinner ? (
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
        <>
          <div className="Orders__main-heading">
            <div className="General-main-heading">
              <CartIcon /> {"  "} My Orders
            </div>
            <div>
              <button
                className="Users__refresh-button"
                onClick={(e) => exportToggle(!addexport)}
              >
                {addexport ? "Back to Orders" : "Export current data"}
              </button>
            </div>
          </div>
          {addexport ? (
            <ExportData
              users={users}
              deliveryTypes={deliveryTypes}
              products={products}
              orders={convertedOrders}
            />
          ) : (
            <>
              <MiniNavbar
                isVisible={currentUser}
                clearCurrentUser={clearCurrentUser}
                sortByName={sortByName}
                sortByNumber={sortByNumber}
                sortByLocation={sortByLocation}
              ></MiniNavbar>
              {currentUser ? (
                <OrderPage order={currentUser}></OrderPage>
              ) : (
                <div>
                  <OrdersListing
                    currentUserSelection={currentUserSelection}
                    orders={sortOrders}
                    // users={users}
                    // deliveryTypes={deliveryTypes}
                    // products={products}
                  ></OrdersListing>
                  <div className="Orders__pagination">
                    <Stack spacing={2}>
                      <Pagination
                        onChange={(event, val) => modifyOrders(event, val)}
                        variant="outlined"
                        color="primary"
                        boundaryCount={2}
                        count={
                          orders.length % 6 === 0
                            ? orders.length / 6
                            : Math.floor(orders.length / 6) + 1
                        }
                        page={page}
                      />
                    </Stack>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
