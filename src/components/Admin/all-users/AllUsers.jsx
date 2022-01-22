import '../../../styles/admin/all-users/all-users.css';
import { React, useState, useEffect } from 'react';
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
        <div className='lamar-container'>
          <div className='pageIntro'>
            <div className='total-number'>All Users: {allUsers.length}</div>
            <div className='intro'>All Regestered Users</div>
          </div>
          <section className='bigContainer'>
            {allUsers.map((user, idx) => {
              return (
                <>
                  <div className='userContainer'>
                    <section>
                      <span>{idx + 1}</span>
                      <img src='https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png' alt='avator' />
                    </section>
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
