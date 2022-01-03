import React from "react";
import { Link } from 'react-router-dom';
import "../../../styles/sign-styles/sign-in.css"
function SignIn() {
  return (
    <>
      <scetion className="sign-in" id="sign-in">
      <div className="nav-container">
      <div className="nav-info">
          <div className="left-nav">
            <Link to='/'><i class="fas fa-home i-home"></i></Link>  
            <i class="fas fa-angle-right"></i> <span >SignIn</span>
          </div>
          <div className="right-nav">
            <Link to="/SignUp"> <span className="exat-path">create an account</span> </Link>
          </div>
        </div>
      </div>
        
        
       
        <div className="lamar-container">
          <form action="">
            <h2>sign in</h2>

            <div className="input-user">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
              />
            </div>

            <div className="input-pass">
              <i className="fas fa-unlock"></i>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </div>
            <button type="submit"  className="submit">submit </button>
          </form>
        </div>
      </scetion>
    </>
  );
}

export default SignIn;
