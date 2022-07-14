import { useEffect, useState } from 'react';
import '../../../styles/admin/pending-orders/pending-orders.css';
import Order from './Order';
import { useNavigate, Link } from 'react-router-dom';
import {instance,url} from '../../../API/axios';
import {useSelector} from 'react-redux';

function PendingOrders() {
  const user = useSelector((state) => state.authReducer.user);

  const [allPendingOrders, setAllPendingOrders] = useState([]);

  // fetch all pending orders handler
const fetchAllPendingOrders = async()=>{
  console.log('user',user);
  const response = await instance.get(url+'/pendingOrders',{
    headers: {
      authorization: `Bearer ${user?.token}`
    }
  });
console.log('response.data',response.data);
  setAllPendingOrders(response.data);
}
  useEffect(()=>{
if (user) fetchAllPendingOrders();
  },[user]);

  return (
    <>
      <div className='pending-orders'>
      <div className='nav-container'>
          <div className='nav-info'>
            <div className='left-nav'>
              <Link to='/'>
                <i className='fas fa-home i-home'></i>
              </Link>
              <i className='fas fa-angle-right'></i>
              <Link to='/Admin' className='exat-path'>
                <span>Admin</span>
              </Link>
              <i className='fas fa-angle-right'></i>
                <span>Pending Orders</span>
            </div>
          </div>
        </div>
       
        <div className='lamar-container'>
        <div className='container-admin-hero'>
            <div className='admin-hero'>
              <h4 className='hero-text'>Pending Orders </h4>
            </div>
          </div>
          <div className='pageIntro'>
            <div className='total-number'>
              All Pending Orders: <span>{allPendingOrders.length}</span>
            </div>
            <div className='intro'>All Pending Orders</div>
          </div>
          <section className='bigContainer'>
            {allPendingOrders.map((order, idx) => {
              return (
                  <Order order={order} idx={idx} key={order.orderId} />
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
}

export default PendingOrders;
