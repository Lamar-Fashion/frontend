import { useEffect, useState } from 'react';
import Order from '../pending-orders/Order';
import '../../../styles/admin/admin.css';
import { useNavigate, Link } from 'react-router-dom';
import {instance,url} from '../../../API/axios';
import {useSelector} from 'react-redux';
import LoadingState from '../../Shared/LoadingState';

function DoneOrders() {
  const user = useSelector((state) => state.authReducer.user);

  const [allDoneOrders, setAllDoneOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch all done orders handler
const fetchAllDoneOrders = async()=>{

  try {
    setIsLoading(true);
    const response = await instance.get(url+'/doneOrders',{
      headers: {
        authorization: `Bearer ${user?.token}`
      }
    });
    setIsLoading(false);
  setAllDoneOrders(response.data);
    
  } catch (error) {
    console.error('Error while getting done orders',error.message);

  }
}
  useEffect(()=>{
if (user) fetchAllDoneOrders();
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
                <span>Done Orders</span>
            </div>
          </div>
        </div>
       
        <div className='lamar-container'>
        <div className='container-admin-hero'>
            <div className='admin-hero'>
              <h4 className='hero-text'>Done Orders </h4>
            </div>
          </div>
          <div className='pageIntro'>
            <div className='total-number'>
              All Done Orders: <span>{allDoneOrders.length}</span>
            </div>
            <div className='intro'>All Done Orders</div>
          </div>
          <section className='bigContainer'>
            {!isLoading && allDoneOrders.map((order, idx) => {
              return (
                  <Order order={order} from={'done'} idx={idx} key={order.orderId} />
              );
            })}

{isLoading && <div className='loading-state-container'><LoadingState/></div> }

          </section>
        </div>
      </div>
    </>
  );
}

export default DoneOrders;
