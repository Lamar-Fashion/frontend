import React from 'react'
import {Link} from "react-router-dom"
import "../../../styles/sign-styles/sign-up.css"
function SignUp() {
    return (
        <>
        <section className="sign-up">
        <div className="nav-container">
      <div className="nav-info">
          <div className="left-nav">
            <Link to='/'><i class="fas fa-home i-home"></i></Link>  
            <i class="fas fa-angle-right"></i> <span >SignUp</span>
          </div>
          <div className="right-nav">
            <Link to="/SignIn"> <span className="exat-path">Sign In </span> </Link>
          </div>
        </div>
      </div>
          
    
        <div className="lamar-container">
          <form action="">
            <h2>Sign Up</h2>
              <div className="name">
                <div className="Fname">
                  <i className="fas fa-user-edit"></i>
                <input type="text" name="Fname" id="Fname" placeholder="First Name"/ >

                </div>
                <div className="Lname">
                  <i className="fas fa-user-edit"></i>
                <input type="text" name="Lname" id="Lname" placeholder="Last Name"/>

                </div>
  
              </div>
              <div className="email">
              <i className="fas fa-mail-bulk"></i>
            <input type="email" name="email" id="email" placeholder="Enter Email"/>
              </div>
              <div className="pass">
                <i className="fas fa-user-lock"></i>
            <input type="password" name="password" id="password" 
            placeholder="Enter Password"/>
              </div>
              <div className="pass">
                <i className="fas fa-user-lock"></i>
            <input type="password" name="password" id="password"
            placeholder="Confirm Password"/>
              </div>
              <button type="submit" value="create an account" className="submit"> create an account</button>
          </form>
        </div>

  </section>
            
        </>
    )
}

export default SignUp
