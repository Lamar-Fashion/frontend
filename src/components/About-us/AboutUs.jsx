import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/about-us/about-us.css';
function AboutUs() {
  return (
    <>
      <section className='about-us' id='#About'>
      <div className="nav-container">
      <div className="nav-info">
          <div className="left-nav">
            <Link to='/'><i className="fas fa-home i-home"></i></Link>  
            <i className="fas fa-angle-right"></i> <span >About us</span>
          </div>
        </div>
      </div>
        <div className='lamar-container'>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis sit excepturi quod similique dolorem eveniet iste autem, reiciendis, unde magni expedita voluptatem hic non! Unde dolor
            molestias corporis nisi in! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quia similique? Assumenda est velit qui, doloremque voluptatem error, ducimus modi laudantium
            aliquam veritatis sunt architecto dolorum amet, expedita totam numquam.
          </p>
          <ul>
            <li>
              <span>Official name :</span> Lamar Fashion
            </li>

            <li>
              <span>Contact information :</span> +974 3025411
            </li>
            <li>
              <span>CR number :</span> 101369
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
