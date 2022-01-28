import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/admin/admin.css';

function DoneOrders() {
  return <>
   <div className='admin'>
 <div className='nav-container'>
          <div className='nav-info'>
            <div className='left-nav'>
              <Link to='/'>
                <i className='fas fa-home i-home'></i>
              </Link>
              <i className='fas fa-angle-right'></i>
              <Link to='/Admin' className='exat-path'>
                {' '}
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
              <h4 className='hero-text'>Done Orders</h4>
            </div>
          </div>
          </div>
          </div>
  </>;
}

export default DoneOrders;
