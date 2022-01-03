import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/contact-us/contact-us.css';
function ContactUs() {
  return (
    <>
      <section className='contact-us'>
      <div className="nav-container">
      <div className="nav-info">
          <div className="left-nav">
            <Link to='/'><i class="fas fa-home i-home"></i></Link>  
            <i class="fas fa-angle-right"></i> <span >contact us</span>
          </div>
        </div>
      </div>

        <div className='lamar-container'>
          <form action='mailto:anofal719@gmail.com' method='GET'>
            <h2>Contact Us</h2>

            <div className='email'>
              <h5>by Email: </h5>
              <i class='far fa-paper-plane fa-fw'></i>

              <a href='mailto:Info@lamarfashion.qa' target='_blank'>
                Info@lamarfashion.qa
              </a>
            </div>
            <div className='email'>
              <h5>by WhatsApp: </h5>
              <i class='fab fa-whatsapp fa-fw'></i>
              <a href='http://wa.me/+97466881109' target='_blank'>
                +974 66881109
              </a>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
