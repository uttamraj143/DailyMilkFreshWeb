import { useState } from "react";
import OrdersListing from "components/Orders/OrdersListing";
import OrderPage from "components/Orders/OrderPage";
import MiniNavbar from "components/common/MiniNavbar";
import { ReactComponent as CartIcon } from "components/svgs/cartIcon.svg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "./Orders.scss";

export default function Orders() {
  const [currentUser, setCurrentUser] = useState(null);
  const [sortNumbers, setSortNumbers] = useState(false);
  const [sortName, setSortName] = useState(false);
  const [sortLocation, setSortLocation] = useState(false);
  const [page, setPage] = useState(1);
  const [sortOrders, setSortOrders] = useState([]);

  const [orders] = useState([
    {
      QRNumber: "25",
      date: "14 June 2021, 08: 36",
      status: "booked",
    },
    {
      QRNumber: "26",
      date: "14 June 2021, 08: 36",
      status: "pickedup",
    },
    {
      QRNumber: "27",
      date: "14 June 2021, 08: 36",
      status: "intransit",
    },
    {
      QRNumber: "28",
      date: "14 June 2021, 08: 36",
      status: "delivered",
    },
    {
      QRNumber: "29",
      date: "14 June 2021, 08: 36",
      status: "cancelled",
    },
    {
      QRNumber: "126",
      date: "14 June 2021, 08: 36",
      status: "pickedup",
    },
    {
      QRNumber: "127",
      date: "14 June 2021, 08: 36",
      status: "intransit",
    },
    {
      QRNumber: "128",
      date: "14 June 2021, 08: 36",
      status: "delivered",
    },
    {
      QRNumber: "129",
      date: "14 June 2021, 08: 36",
      status: "cancelled",
    },
    {
      QRNumber: "130",
      date: "14 June 2021, 08: 36",
      status: "pickedup",
    },
    {
      QRNumber: "131",
      date: "14 June 2021, 08: 36",
      status: "intransit",
    },
    {
      QRNumber: "132",
      date: "14 June 2021, 08: 36",
      status: "delivered",
    },
    {
      QRNumber: "133",
      date: "14 June 2021, 08: 36",
      status: "cancelled",
    },
    {
      QRNumber: "134",
      date: "14 June 2021, 08: 36",
      status: "pickedup",
    },
    {
      QRNumber: "135",
      date: "14 June 2021, 08: 36",
      status: "intransit",
    },
    {
      QRNumber: "136",
      date: "14 June 2021, 08: 36",
      status: "delivered",
    },
    {
      QRNumber: "137",
      date: "14 June 2021, 08: 36",
      status: "cancelled",
    },
    {
      QRNumber: "30",
      date: "14 June 2021, 08: 36",
      status: "intransit",
    },
    {
      QRNumber: "31",
      date: "14 June 2021, 08: 36",
      status: "intransit",
    },
  ]);

  const [users, setUsers] = useState([
    {
      customername: "subramanyam P",
      Products: ["Cow Milk", "Buffallo Milk"],
      address: "Ashok nagar",
      QRNumber: "25",
    },
    {
      customername: "Chai",
      Products: ["Cow Milk", "Buffallo Milk"],
      address: "Ashok nagar",
      QRNumber: "26",
    },
    {
      customername: "Ravi kumar",
      Products: ["Cow Milk", "Buffallo Milk"],
      address: "Lingampally",
      QRNumber: "27",
    },
    {
      customername: "Uttam Kumar",
      Products: ["Buffallo Milk"],
      address: "Gopanpally",
      date: "14 June 2021, 08: 36",
      QRNumber: "28",
    },
    {
      date: "14 June 2021, 08: 36",
      customername: "Sai",
      address: "Lingampally",
      Products: ["Cow Milk", "Buffallo Milk"],
      QRNumber: "29",
    },
    {
      customername: "Krishna",
      Products: ["Cow Milk", "Buffallo Milk"],
      date: "14 June 2021, 08: 36",
      address: "Nallagandla",
      QRNumber: "30",
    },
    {
      date: "14 June 2021, 08: 36",
      customername: "Chai",
      Products: ["Cow Milk"],
      address: "Nallagandla",
      QRNumber: "31",
    },
    {
      customername: "neeraj",
      Products: ["Cow Milk", "Buffallo Milk"],
      date: "14 June 2021, 08: 36",
      address: "Lingampally",
      QRNumber: "32",
    },
    {
      Products: ["Cow Milk", "Buffallo Milk"],
      customername: "subramanyam",
      date: "14 June 2021, 08: 36",
      address: "Nallagandla",
      QRNumber: "33",
    },
    {
      Products: ["Cow Milk", "Buffallo Milk"],
      customername: "subramanyam",
      date: "14 June 2021, 08: 36",
      address: "Nallagandla",
      QRNumber: "126",
    },
    {
      Products: ["Cow Milk", "Buffallo Milk"],
      customername: "subramanyam",
      date: "14 June 2021, 08: 36",
      address: "Nallagandla",
      QRNumber: "127",
    },
    {
      Products: ["Cow Milk", "Buffallo Milk"],
      customername: "subramanyam",
      date: "14 June 2021, 08: 36",
      address: "Nallagandla",
      QRNumber: "128",
    },
    {
      Products: ["Cow Milk", "Buffallo Milk"],
      customername: "subramanyam",
      date: "14 June 2021, 08: 36",
      address: "Nallagandla",
      QRNumber: "129",
    },
    {
      Products: ["Cow Milk", "Buffallo Milk"],
      customername: "subramanyam",
      date: "14 June 2021, 08: 36",
      address: "Nallagandla",
      QRNumber: "130",
    },
    {
      Products: ["Cow Milk", "Buffallo Milk"],
      customername: "subramanyam",
      date: "14 June 2021, 08: 36",
      address: "Nallagandla",
      QRNumber: "131",
    },
    {
      Products: ["Cow Milk", "Buffallo Milk"],
      customername: "subramanyam",
      date: "14 June 2021, 08: 36",
      address: "Nallagandla",
      QRNumber: "132",
    },
    {
      Products: ["Cow Milk", "Buffallo Milk"],
      customername: "subramanyam",
      date: "14 June 2021, 08: 36",
      address: "Nallagandla",
      QRNumber: "133",
    },
  ]);

  const currentUserSelection = (user) => {
    setCurrentUser(user);
  };

  const clearCurrentUser = () => {
    setCurrentUser(null);
  };

  const sortByName = () => {
    if (sortName) {
      setUsers(
        users.sort((a, b) => a.customername.localeCompare(b.customername))
      );
      setSortName(!sortName);
    } else {
      setUsers(
        users.sort((a, b) => b.customername.localeCompare(a.customername))
      );
      setSortName(!sortName);
    }
  };

  const sortByNumber = (e) => {
    if (sortNumbers) {
      setUsers(
        users
          .slice(0)
          .sort((a, b) => parseInt(a.QRNumber) - parseInt(b.QRNumber))
      );
      setSortNumbers(!sortNumbers);
    } else {
      setUsers(
        users
          .slice(0)
          .sort((a, b) => parseInt(b.QRNumber) - parseInt(a.QRNumber))
      );
      setSortNumbers(!sortNumbers);
    }
  };

  const sortByLocation = (e) => {
    if (sortLocation) {
      setUsers(users.sort((a, b) => a.address.localeCompare(b.address)));
      setSortLocation(!sortLocation);
    } else {
      setUsers(users.sort((a, b) => b.address.localeCompare(a.address)));
      setSortLocation(!sortLocation);
    }
  };

  const modifyOrders = (e, val) => {
    e.preventDefault();
    setPage(val);
    const slicedArray = orders.slice(val - 1, val);
    console.log(slicedArray);
    return setSortOrders(slicedArray);
  };

  return (
    <div className="Orders__main-container">
      <div className="Orders__main-heading">
        <div className="General-main-heading">
          <CartIcon /> {"  "} My Orders
        </div>
      </div>
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
            users={users}
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
    </div>
  );
}
