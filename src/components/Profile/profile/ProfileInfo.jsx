import { useState } from 'react';
import '../../../styles/profile/profile-info.css';
import { useSelector,useDispatch } from "react-redux";
import bcryptjs from 'bcryptjs';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {instance,url} from '../../../API/axios';
import validateToken from '../../../helpers/validateToken';
import {logInAction,logOutAction} from '../../../store/actions/index';
import {useNavigate} from 'react-router-dom';
import LoadingState from '../../Shared/LoadingState';
import DualModal from '../../Shared/DualModal';

function ProfileInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const {isLoggedIn,user,role} = useSelector((state) => state.authReducer);

  const [firstName,setFirstName] = useState(user.firstName);
  const [lastName,setLastName] = useState(user.lastName);
  const [email,setEmail] = useState(user.email);
  const [oldPassword,setOldPassword] = useState('');
  const [editPassword,setEditPassword] = useState(false);
  const [isCorrectPassword,setIsCorrectPassword] = useState(false);
  const [validEmail,setValidEmail] = useState(true);
  const [newPassword,setNewPassword] = useState('');
  const [confirmedNewPass,setConfirmedNewPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderDone, setOrderDone] = useState(false);

  //validate submit
  const validateSubmit=()=>{
    if (editPassword ) {
      if (firstName && lastName && email &&(email == user.email ? true : validEmail )&& isCorrectPassword && newPassword && confirmedNewPass && newPassword == confirmedNewPass ) {
        return false;
      }else{
        return true;
      }
    }else{
      if (firstName && lastName && email &&(email == user.email ? true : validEmail ) && (firstName != user.firstName  || lastName != user.lastName  || email != user.email)) {
        return false;
      }else{
        return true;
      }
    }
  }

  const onChangeHandler = (e)=>{
console.log('user',user);
if (e.target.name == 'firstName') setFirstName(e.target.value);
if (e.target.name == 'lastName') setLastName(e.target.value);
if (e.target.name == 'email'){
  setEmail(e.target.value);
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
    setValidEmail(true);

  } else {
    
    setValidEmail(false);
  }
} 
if (e.target.name == 'oldPassword') {
  setOldPassword(e.target.value);
// compare old pass from DB with the entered one
const valid =  bcryptjs.compareSync(e.target.value, user.password);
if (valid) setIsCorrectPassword(true);
else setIsCorrectPassword(false);
}
if (e.target.name == 'newPassword') setNewPassword(e.target.value);
if (e.target.name == 'confirmedNewPass') setConfirmedNewPass(e.target.value);
  };

  const editPasswordMode = (e)=>{
    e.preventDefault();
    setEditPassword(!editPassword);
  }

  // on submit handler
  const editProfileInfoOnSubmit =  (e)=>{
    e.preventDefault();
    setIsLoading(true);

    let updatedUser = {};

    if (editPassword) {
      updatedUser ={
        firstName,
        lastName,
        email,
        password:newPassword,
        oldPassword
      }
    } else {
      updatedUser ={
        firstName,
        lastName,
        email,
      }
    }
console.log('updatedUser',updatedUser);
    setTimeout(async() => {
      try {
        //send req to DB and uodate user
        const response = await instance.put(url+'/user'+user.id, updatedUser,{
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setOrderDone(true);
        setIsLoading(false);

        const validatedUser = validateToken(response?.data?.user?.token);
        if(validatedUser){
          dispatch(logInAction(validatedUser));
          // navigate('/Profile');
          // window.location.reload();
          // window.scrollTo({
          //   top: 0,
          //   left: 0,
          //   behavior: 'smooth',
          // });
        } 
        else{
          
          dispatch(logOutAction());
          // navigate('/');
          // window.location.reload();
          // window.scrollTo({
          //   top: 0,
          //   left: 0,
          //   behavior: 'smooth',
          // });
      
        } 
      
      } catch (error) {
        error?.response?.data?.error ?  setError(error.response.data.error) : setError('Error while updating user');
        console.error('Error while updating user',error)
      }
    }, 1000);

  }
  return (
    <>
      <section className='profile-info-section'>
        <div className='lamar-container'>
          <div className='edit-profile'>
            <i
              className='fas fa-user-edit'
              onClick={() => {
                setEditMode(!editMode);
              }}
            ></i>
          </div>
          {!editMode ? (
            <form action=''>
              <div className='input-user'>
                <i className='fas fa-user'></i>
                <input type='text' name='username' id='username' placeholder='username' defaultValue={user.firstName+" " + user.lastName} style={{ border: 'none' }} />
              </div>

              <div className='input-pass'>
                <i className='fas fa-mail-bulk'></i>
                <input type='email1' name='email1' id='email1' placeholder='email' defaultValue={user.email} style={{ border: 'none' }} />
              </div>

           
            </form>
          ) : (
            <>
           {!validEmail || !email || !firstName || !lastName || (editPassword ? isCorrectPassword ? false : oldPassword ? true :false : false) && 
           <>
           <br/>
      
           {/* danger alert for incorrect inputs */}
            <Stack sx={{ width: '290px',margin:"auto",position: "relative", top:"-25px" }} spacing={2}>
      <Alert severity="error">{ !firstName ? 'Enter First name': !lastName ? 'Enter Last Name' : !email || !validEmail? 'invalid email' : (editPassword ? !isCorrectPassword ? "incorrect password" : false : false) }</Alert>
    
    </Stack>
    </>
    }
            <form onSubmit={editProfileInfoOnSubmit}>
              <div className='input-user'>
                <i className='fas fa-user'></i>
                <input type='text' name='firstName' id='firstName' placeholder='first name' value={firstName} onChange={onChangeHandler} />
              </div>
              <div className='input-user'>
                <i className='fas fa-user'></i>
                <input type='text' name='lastName' id='lastName' placeholder='last name' value={lastName} onChange={onChangeHandler}  />
              </div>

              <div className='input-pass'>
                <i className='fas fa-mail-bulk'></i>
                <input type='email' name='email' id='email' placeholder='email' value={email}  onChange={onChangeHandler} />
              </div>
              <div className='input-pass'>
              <i className="fas fa-user-edit"></i>

                <button placeholder='edit password' id='edit-pass'  onClick={editPasswordMode}  >
                  edit password
                </button>
              </div>
             { editPassword && <>
             <div className='input-pass'>
              <i className="fas fa-unlock"></i>

                <input type='password' name='oldPassword' id='oldPassword' placeholder='Old password'  onChange={onChangeHandler}  />
              </div>
                {isCorrectPassword &&
                  <>
              <div className='input-pass'>
              <i className="fas fa-unlock"></i>

                  <input type='password' name='newPassword' id='newPassword' placeholder='New password'  onChange={onChangeHandler}  />
              </div>
              <div className='input-pass'>
              <i className="fas fa-unlock"></i>

                <input type='password' name='confirmedNewPass' id='confirmedNewPass' placeholder='Confirm New Password'  onChange={onChangeHandler}  />
              </div>
                  </> }
             </>
              }

              <button type='submit' className={validateSubmit() ? 'submit' : 'submit active'}>
                submit
              </button>
            </form>
            </>

          )}
          {isLoading && !error && <div className='loading-state-container-profile'> <LoadingState/></div> }
        </div>
      </section>
        {orderDone && <DualModal type='success' navigateTo = '/Profile' text={'your data has been updated!'}/>}
        {error && <DualModal type='error' navigateTo = '/Profile' text={error ? error : 'Something went wrong! <br/> please try again'} showHeader={true}/>}
    </>
  );
}

export default ProfileInfo;
