import { useState } from 'react';
import '../../../styles/admin/pending-orders/pending-orders.css';
import Order from './Order';
import { useNavigate, Link } from 'react-router-dom';

let productInfo = {
  image: 'https://firebasestorage.googleapis.com/v0/b/lamar-fashion.appspot.com/o/products%2F3-1-2022%404%3A23%20-%20on-sales.jpeg?alt=media&token=6ed53013-2419-4c62-9884-a14f25bce5c4',
  modelNum: 'As5HG',
  price: 'QAR 1200',
  quantity: 2,
  color: 'black',
  size: 's',
  length: '47',
  buttouns: 'without buttouns - بدون طقطق',
  inStockQuantity: 10,
  availability: 'in Stock',
  //   deliveryTime: '1-5 days',
  category: 'New Arrivals',
  status: 'يحتاج الى تفصيل',
  //   status: 'ready to wear',
};

let order = {
  // order info
  orderStatus: 'Pending',
  orderId: 'DFGK8R-7:50PM-22/1/2022',
  orderTotalPrice: 'QAR 4520',
  clientComments: 'no comments',
  isPaidSuccessfully: 'false',
  paymentMethod: 'Cash on Delivery',

  // client info
  FlatNumber: '23',
  Fname: 'Ahmad',
  Lname: 'Abu Osbeh',
  StreetAddress: 'wink',
  Zone: 'new Zarqa',
  city: 'zarqa',
  country: 'Jordan',
  email: 'ahmadabuosbeh20@gmail.com',
  phone: '+962788846082',

  // ordered products
  orderedProducts: [productInfo, productInfo, productInfo, productInfo],
};

let allPendingOrders = [order, order];
function PendingOrders() {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <>
      <div className='pending-orders'>
        <div className='nav-container'>
          <div className='nav-info'>
            <div className='left-nav'>
              <Link to='/'>
                <i className='fas fa-home i-home'></i>
              </Link>
              <Link to='/Admin'>
                <i className='fas fa-angle-right '></i> <span className='i-admin'>Admin </span>
              </Link>
              <i className='fas fa-angle-right'></i> <span>Pending Orders</span>
            </div>
          </div>
        </div>
        <div className='lamar-container'>
          <div className='pageIntro'>
            <div className='total-number'>
              All Pending Orders: <span>{allPendingOrders.length}</span>
            </div>
            <div className='intro'>All Pending Orders</div>
          </div>
          <section className='bigContainer'>
            {allPendingOrders.map((order, idx) => {
              return (
                <>
                  <Order order={order} idx={idx} key={order.orderId} />
                </>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
}

export default PendingOrders;
