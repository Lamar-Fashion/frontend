import '../../../styles/admin/all-users/all-users.css';
import { React, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

let user = {
  email: 'ahmadahmadahmad@gmail.com',
  firstName: 'Ahmad',
  lastName: 'Falah',
};

const allUsers = new Array(40).fill(user);
function AllUsers() {
  // did mount
  useEffect(() => {
    // get all users
  }, []);

  return (
    <>
      <div className='all-users '>
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
                <span>All Users</span>
            </div>
          </div>
        </div>
        <div className='lamar-container'>

        <div className='container-admin-hero'>
            <div className='admin-hero'>
              <h4 className='hero-text'>All Users</h4>
            </div>
          </div>
          <div className='pageIntro'>
            <div className='total-number'>All Users: {allUsers.length}</div>
            <div className='intro'>All Regestered Users</div>
          </div>
          <section className='bigContainer'>
            {allUsers.map((user, idx) => {
              return (
                <>
                  <div className='userContainer'>
                    <span>{idx + 1}</span>
                    <img src='https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png' alt='avator' />
                    <div className='data'>
                      <h5>{user.firstName + ' ' + user.lastName}</h5>
                      <h5>{user.email}</h5>
                    </div>
                  </div>
                </>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
