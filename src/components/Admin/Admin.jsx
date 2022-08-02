import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/admin/admin.css';

function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <div className='admin'>
        <div className='nav-container'>
          <div className='nav-info'>
            <div className='left-nav'>
              <Link to='/'>
                <i className='fas fa-home i-home'></i>
              </Link>
              <i className='fas fa-angle-right'></i> <span>Admin </span>
            </div>
          </div>
        </div>
        <div className='lamar-container'>
          <div className='container-admin-hero'>
            <div className='admin-hero'>
              <h4 className='hero-text'>Admin panel</h4>
            </div>
          </div>
          <section className='features-container'>
            <div
              className='features'
              onClick={() => {
                navigate('/PendingOrders');
              }}
            >
              <div className='above-div'>
                <span>Pending Orders</span>
              </div>
            </div>
            <div
              className='features'
              onClick={() => {
                navigate('/RejectedOrders');
              }}
            >
              <div className='above-div'>
                <span>Rejected Orders</span>
              </div>
            </div>
            <div
              className='features'
              onClick={() => {
                navigate('/DoneOrders');
              }}
            >
              <div className='above-div'>
                <span>Done Orders</span>
              </div>
            </div>
            <div
              className='features'
              onClick={() => {
                navigate('/AllUsers');
              }}
            >
              <div className='above-div'>
                <span>All Users</span>
              </div>
            </div>
          </section>
        </div>

      </div>
    </>
  );
}

export default Admin;
