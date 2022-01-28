import { useState } from 'react';
import '../../../styles/profile/profile-info.css';
function ProfileInfo() {
  const [show, setShow] = useState(true);
  return (
    <>
      <section className='profile-info-section'>
        <div className='lamar-container'>
          <div className='edit-profile'>
            <i
              className='fas fa-user-edit'
              onClick={() => {
                setShow(!show);
              }}
            ></i>
          </div>
          {show ? (
            <form action=''>
              <div className='input-user'>
                <i className='fas fa-user'></i>
                <input type='text' name='username' id='username' placeholder='username' value='abu-nofal' style={{ border: 'none' }} />
              </div>

              <div className='input-pass'>
                <i className='fas fa-mail-bulk'></i>
                <input type='email' name='email' id='email' placeholder='email' value='anofal719@gmail.com' style={{ border: 'none' }} />
              </div>
            </form>
          ) : (
            <form action=''>
              <div className='input-user'>
                <i className='fas fa-user'></i>
                <input type='text' name='username' id='username' placeholder='username' defaultValue='abu-nofal' />
              </div>

              <div className='input-pass'>
                <i className='fas fa-mail-bulk'></i>
                <input type='email' name='email' id='email' placeholder='email' defaultValue='anofal719@gmail.com' />
              </div>

              <div className='input-pass'>
              <i className="fas fa-unlock"></i>

                <input type='password' name='password' id='password' placeholder='Old password' />
              </div>
              <div className='input-pass'>
              <i className="fas fa-unlock"></i>

                <input type='password' name='password' id='password' placeholder='New password' />
              </div>
              <div className='input-pass'>
              <i className="fas fa-unlock"></i>

                <input type='password' name='password' id='password' placeholder='Confirm password' />
              </div>

              <button type='submit' className='submit'>
                submit
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default ProfileInfo;
