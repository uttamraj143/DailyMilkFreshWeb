import { useState } from 'react';
import OrdersListing from 'components/Orders/OrdersListing';
import OrderPage from 'components/Orders/OrderPage';
import MiniNavbar from 'components/common/MiniNavbar';
import './Orders.scss';

export default function Orders() {
  const [currentUser, setCurrentUser] = useState(null);
  const [sortNumbers, setSortNumbers] = useState(false);
  const [sortName, setSortName] = useState(false);
  const [sortLocation, setSortLocation] = useState(false);

  const [orders, setOrders] = useState([
    {
      QRNumber: '25',
      date: '14 June 2021, 08: 36',
      status: 'booked',
    },
    {
      QRNumber: '26',
      date: '14 June 2021, 08: 36',
      status: 'pickedup',
    },
    {
      QRNumber: '27',
      date: '14 June 2021, 08: 36',
      status: 'intransit',
    },
    {
      QRNumber: '28',
      date: '14 June 2021, 08: 36',
      status: 'delivered',
    },
    {
      QRNumber: '29',
      date: '14 June 2021, 08: 36',
      status: 'cancelled',
    },
    {
      QRNumber: '30',
      date: '14 June 2021, 08: 36',
      status: 'intransit',
    },
    {
      QRNumber: '31',
      date: '14 June 2021, 08: 36',
      status: 'intransit',
    },
  ]);

  const [users, setUsers] = useState([
    {
      customername: 'subramanyam P',
      Products: ['Cow Milk', 'Buffallo Milk'],
      address: 'Ashok nagar',
      QRNumber: '25',
    },
    {
      customername: 'Chai',
      Products: ['Cow Milk', 'Buffallo Milk'],
      address: 'Ashok nagar',
      QRNumber: '26',
    },
    {
      customername: 'Ravi kumar',
      Products: ['Cow Milk', 'Buffallo Milk'],
      address: 'Lingampally',
      QRNumber: '27',
    },
    {
      customername: 'Uttam Kumar',
      Products: ['Buffallo Milk'],
      address: 'Gopanpally',
      date: '14 June 2021, 08: 36',
      QRNumber: '28',
    },
    {
      date: '14 June 2021, 08: 36',
      customername: 'Sai',
      address: 'Lingampally',
      Products: ['Cow Milk', 'Buffallo Milk'],
      QRNumber: '29',
    },
    {
      customername: 'Krishna',
      Products: ['Cow Milk', 'Buffallo Milk'],
      date: '14 June 2021, 08: 36',
      address: 'Nallagandla',
      QRNumber: '30',
    },
    {
      date: '14 June 2021, 08: 36',
      customername: 'Chai',
      Products: ['Cow Milk'],
      address: 'Nallagandla',
      QRNumber: '31',
    },
    {
      customername: 'neeraj',
      Products: ['Cow Milk', 'Buffallo Milk'],
      date: '14 June 2021, 08: 36',
      address: 'Lingampally',
      QRNumber: '32',
    },
    {
      Products: ['Cow Milk', 'Buffallo Milk'],
      customername: 'subramanyam',
      date: '14 June 2021, 08: 36',
      address: 'Nallagandla',
      QRNumber: '33',
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
      setUsers(users.sort((a, b) => a.customername.localeCompare(b.customername)));
      setSortName(!sortName);
    } else {
      setUsers(users.sort((a, b) => b.customername.localeCompare(a.customername)));
      setSortName(!sortName);
    }
  };

  const sortByNumber = (e) => {
    if (sortNumbers) {
      setUsers(users.slice(0).sort((a, b) => parseInt(a.QRNumber) - parseInt(b.QRNumber)));
      setSortNumbers(!sortNumbers);
    } else {
      setUsers(users.slice(0).sort((a, b) => parseInt(b.QRNumber) - parseInt(a.QRNumber)));
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

  return (
    <div className='Orders__main-container'>
      <MiniNavbar
        isVisible={currentUser}
        clearCurrentUser={clearCurrentUser}
        sortByName={sortByName}
        sortByNumber={sortByNumber}
        sortByLocation={sortByLocation}></MiniNavbar>
      {currentUser ? (
        <OrderPage order={currentUser}></OrderPage>
      ) : (
        <OrdersListing
          currentUserSelection={currentUserSelection}
          orders={orders}
          users={users}></OrdersListing>
      )}
    </div>
  );
}
