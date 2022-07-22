import { useEffect, useState } from 'react';
import Order from '../pending-orders/Order';
import '../../../styles/admin/admin.css';
import { useNavigate, Link } from 'react-router-dom';
import {instance,url} from '../../../API/axios';
import {useSelector} from 'react-redux';
import LoadingState from '../../Shared/LoadingState';


function RejectedOrders() {
  const user = useSelector((state) => state.authReducer.user);

  const [allRejectedOrders, setAllRejectedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch all rejected orders handler
const fetchAllRejectedOrders = async()=>{

  try {
    setIsLoading(true);
      const response = await instance.get(url+'/rejectedOrders',{
        headers: {
          authorization: `Bearer ${user?.token}`
        }
      });
      setIsLoading(false);
    setAllRejectedOrders(response.data);
      
  } catch (error) {
    console.error('Error while getting rejected orders',error.message);

  }
}
  useEffect(()=>{
if (user) fetchAllRejectedOrders();
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
                <span>Rejected Orders</span>
            </div>
          </div>
        </div>
       
        <div className='lamar-container'>
        <div className='container-admin-hero'>
            <div className='admin-hero'>
              <h4 className='hero-text'>Rejected Orders </h4>
            </div>
          </div>
          <div className='pageIntro'>
            <div className='total-number'>
              All Rejected Orders: <span>{allRejectedOrders.length}</span>
            </div>
            <div className='intro'>All Rejected Orders</div>
          </div>
          <section className='bigContainer'>
            {!isLoading && allRejectedOrders.map((order, idx) => {
              return (
                  <Order order={order} from={'rejected'} idx={idx} key={order.orderId} />
              );
            })}
            {isLoading && <div className='loading-state-container'><LoadingState/></div> }

          </section>
        </div>
      </div>
    </>
  );
}

export default RejectedOrders;
