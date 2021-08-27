import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import './Orders.scss';

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      date: '14 June 2021, 08: 36',
      customername: 'Uttam',
      Products: ['Cow Milk', 'Buffallo Milk'],
      address: 'Ashok nagar',
      QRNumber: 'AN25',
    },
    {
      date: '14 June 2021, 08: 36',
      customername: 'Chai',
      Products: ['Cow Milk', 'Buffallo Milk'],
      address: 'Ashok nagar',
      QRNumber: 'AN25',
    },
    {
      date: '14 June 2021, 08: 36',
      customername: 'Uttam Utterapally',
      Products: ['Cow Milk', 'Buffallo Milk'],
      address: 'Lingampally',
      QRNumber: 'LN25',
    },
    {
      customername: 'Uttam Kumar',
      Products: ['Buffallo Milk'],
      address: 'Gopanpally',
      date: '14 June 2021, 08: 36',
      QRNumber: 'LN25',
    },
    {
      date: '14 June 2021, 08: 36',
      customername: 'Sai',
      address: 'Lingampally',
      Products: ['Cow Milk', 'Buffallo Milk'],
      QRNumber: 'LN25',
    },
    {
      customername: 'Krishna',
      Products: ['Cow Milk', 'Buffallo Milk'],
      date: '14 June 2021, 08: 36',
      address: 'Nallagandla',
      QRNumber: 'LN25',
    },
    {
      date: '14 June 2021, 08: 36',
      customername: 'Chai',
      Products: ['Cow Milk'],
      address: 'Nallagandla',
      QRNumber: 'LN25',
    },
    {
      customername: 'Ravi',
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

  return (
    <div className="Orders__main-container">
      <div className="Orders__card-container">
        {orders.map((item, index) => {
          return (
            <Paper key={index} className="item" elevation={2}>
              <div className="Orders__date-address-row">
                <div className="Orders__date">{item.date}</div>
                <div className="Orders__address">{item.address}</div>
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
                  ID
                </div>
                <div className="Orders__qrnumber">{item.QRNumber}</div>
              </div>

              <div className="Orders__customername">
                <div className="Orders__cust-heading">Customer</div>
                <div className="cust-idnumber">{item.customername}</div>
              </div>

              <div className="Orders__products-row">
                <div className="Orders__product-id">{item.date}</div>
                <div className="Orders__product">{item.address}</div>
              </div>
              <div className="Orders__deliveryStatus-row">
                <div className="Orders__date">{item.date}</div>
                <div className="Orders__address">{item.address}</div>
              </div>
            </Paper>
          );
        })}
      </div>
    </div>
  );
}
