import { useState } from 'react';
import OrdersListing from 'components/Orders/OrdersListing';
import OrderPage from 'components/Orders/OrderPage';
import MiniNavbar from 'components/common/MiniNavbar';
import './Orders.scss';

export default function Orders() {
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([
    {
      QRNumber: 'AN25',
      date: '14 June 2021, 08: 36',
      status: 'booked',
    },
    {
      QRNumber: 'AN26',
      date: '14 June 2021, 08: 36',
      status: 'pickedup',
    },
    {
      QRNumber: 'AN27',
      date: '14 June 2021, 08: 36',
      status: 'intransit',
    },
    {
      QRNumber: 'AN28',
      date: '14 June 2021, 08: 36',
      status: 'delivered',
    },
    {
      QRNumber: 'AN29',
      date: '14 June 2021, 08: 36',
      status: 'cancelled',
    },
    {
      QRNumber: 'AN30',
      date: '14 June 2021, 08: 36',
      status: 'intransit',
    },
    {
      QRNumber: 'AN31',
      date: '14 June 2021, 08: 36',
      status: 'intransit',
    },
  ]);

  const [users, setUsers] = useState([
    {
      customername: 'subramanyam P',
      Products: ['Cow Milk', 'Buffallo Milk'],
      address: 'Ashok nagar',
      QRNumber: 'AN25',
    },
    {
      customername: 'Chai',
      Products: ['Cow Milk', 'Buffallo Milk'],
      address: 'Ashok nagar',
      QRNumber: 'AN26',
    },
    {
      customername: 'Ravi kumar',
      Products: ['Cow Milk', 'Buffallo Milk'],
      address: 'Lingampally',
      QRNumber: 'AN27',
    },
    {
      customername: 'Uttam Kumar',
      Products: ['Buffallo Milk'],
      address: 'Gopanpally',
      date: '14 June 2021, 08: 36',
      QRNumber: 'AN28',
    },
    {
      date: '14 June 2021, 08: 36',
      customername: 'Sai',
      address: 'Lingampally',
      Products: ['Cow Milk', 'Buffallo Milk'],
      QRNumber: 'AN29',
    },
    {
      customername: 'Krishna',
      Products: ['Cow Milk', 'Buffallo Milk'],
      date: '14 June 2021, 08: 36',
      address: 'Nallagandla',
      QRNumber: 'AN30',
    },
    {
      date: '14 June 2021, 08: 36',
      customername: 'Chai',
      Products: ['Cow Milk'],
      address: 'Nallagandla',
      QRNumber: 'LN25',
    },
    {
      customername: 'neeraj',
      Products: ['Cow Milk', 'Buffallo Milk'],
      date: '14 June 2021, 08: 36',
      address: 'Lingampally',
      QRNumber: 'LN25',
    },
    {
      Products: ['Cow Milk', 'Buffallo Milk'],
      customername: 'subramanyam',
      date: '14 June 2021, 08: 36',
      address: 'Nallagandla',
      QRNumber: 'LN25',
    },
  ]);

  const currentUserSelection = (user) => {
    setCurrentUser(user);
  };

  const clearCurrentUser = () => {
    setCurrentUser(null);
  };

  return (
    <div className="Orders__main-container">
      <MiniNavbar
        isVisible={currentUser}
        clearCurrentUser={clearCurrentUser}
      ></MiniNavbar>
      {currentUser ? (
        <OrderPage order={currentUser}></OrderPage>
      ) : (
        <OrdersListing
          currentUserSelection={currentUserSelection}
          orders={orders}
          users={users}
        ></OrdersListing>
      )}
    </div>
  );
}
