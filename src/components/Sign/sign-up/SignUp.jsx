import {React, useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "../../../styles/sign-styles/sign-up.css"
import {instance,url} from '../../../API/axios';
import validateToken from '../../../helpers/validateToken';
import { useDispatch } from 'react-redux';
import {logOutAction,logInAction} from '../../../store/actions/index';
import LoadingState from "../../Shared/LoadingState";
import DualModal from "../../Shared/DualModal";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmedPass,setConfirmedPass] = useState('');
  const [validEmail,setValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  

  const signUpHandlerOnSubmit = (e)=>{
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async() => {
      try {
        console.log('from on submit');
    const newUser = await instance.post(url+'/signup',{firstName,lastName,email,password});
    setIsLoading(false);
    console.log('newUser',newUser.data);
   const user= validateToken(newUser.data.token);
   if (user) {
     dispatch(logInAction(user));
  navigate('/Profile');
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  
   } else{
  
     dispatch(logOutAction());
     navigate('/');
     window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  
   }
  
    e.target.reset();
        
      } catch (error) {

        error?.response?.data?.error ?  setError(error.response.data.error) : setError('error while sign up new user');
        console.error('error while sign up new user', error);
      }
    }, 1000);
   
  };
  const onChangeHandler = (e)=>{

if (e.target.name == 'Fname') setFirstName(e.target.value);
if (e.target.name == 'Lname') setLastName(e.target.value);
if (e.target.name == 'email'){
  setEmail(e.target.value);
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
    setValidEmail(true);

  } else {
    
    setValidEmail(false);
  }
}  
if (e.target.name == 'password') setPassword(e.target.value);
if (e.target.name == 'confirmedpassword') setConfirmedPass(e.target.value);
  };

    return (
        <>
        <section className="sign-up">
        <div className="nav-container">
      <div className="nav-info">
          <div className="left-nav">
            <Link to='/'><i className="fas fa-home i-home"></i></Link>  
            <i className="fas fa-angle-right"></i> <span >SignUp</span>
          </div>
          <div className="right-nav">
            <Link to="/SignIn"> <span className="exat-path">Sign In </span> </Link>
          </div>
        </div>
      </div>
          
    
        <div className="lamar-container">
          <form  onSubmit={signUpHandlerOnSubmit}>
            <h2>Sign Up</h2>
              <div className="name">
                <div className="Fname">
                  <i className="fas fa-user-edit"></i>
                <input type="text" name="Fname" id="Fname" placeholder="First Name" onChange={onChangeHandler}/>

                </div>
                <div className="Lname">
                  <i className="fas fa-user-edit"></i>
                <input type="text" name="Lname" id="Lname" placeholder="Last Name" onChange={onChangeHandler}/>

                </div>
  
              </div>
              <div className="email">
              <i className="fas fa-mail-bulk"></i>
            <input type="email" name="email" id="email" placeholder="Enter Email" onChange={onChangeHandler}/>
              </div>
              <div className="pass">
                <i className="fas fa-user-lock"></i>
            <input type="password" name="password" id="password" 
            placeholder="Enter Password" onChange={onChangeHandler}/>
              </div>
              <div className="pass">
                <i className="fas fa-user-lock"></i>
            <input type="password" name="confirmedpassword" id="confirmedpassword"
            placeholder="Confirm Password" onChange={onChangeHandler}/>
              </div>
              <button type="submit" value="create an account" className={!firstName || !lastName || !email || !validEmail || !password || !confirmedPass || password !==  confirmedPass ? "submit disabled" :"submit"} > create an account</button>
          </form>
      
      {isLoading && !error && <div className='loading-state-container-signup'> <LoadingState/></div> }

        </div>

  </section>
          {error && <DualModal type={'error'} navigateTo={'/SignUp'} text={error}/>}
            
        </>
    )
}

export default SignUp
