import React from 'react'
import "../../footer-styles/footer.css"
function Footer() {
    return (
        <>
        <div className="footer">
      <div className="lamar-container">
        <div className="box">
          <h3>Lamar</h3>
          <ul className="social">
            <li>
              <a href="#" className="facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#" className="twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#" className="youtube">
                <i className="fab fa-youtube"></i>
              </a>
            </li>
          </ul>
          <p className="text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus nulla rem, dignissimos iste aspernatur
          </p>
        </div>
        <div className="box">
          <ul className="links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Returns Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        

        </div>
        <div className="box">
          <div className="line">
            <i className="fas fa-map-marker-alt fa-fw"></i>
            <div className="info">Suhaim Bin Hamad Street, Doha, Qatar</div>
          </div>
          <div className="line">
            <i className="far fa-clock fa-fw"></i>
            <div className="info">Business Hours: From 09:00 To 22:00</div>
          </div>
          <div className="line">
            <i className="fas fa-phone-volume fa-fw"></i>
            <div className="info">
              <span>+974 5010 9900</span>
             
            </div>
          </div>
        </div>
        <div className="box footer-gallery">
          <img src="https://i.pinimg.com/originals/67/ef/32/67ef3247138572050210b5ba91e5b4ce.jpg" alt="" />
          <img src="https://i.pinimg.com/originals/ba/19/3c/ba193c385cbd91c7b22ea891c30818fb.jpg" alt="" />
          <img src="https://i.pinimg.com/originals/67/ef/32/67ef3247138572050210b5ba91e5b4ce.jpg" alt="" />
          <img src="https://i.pinimg.com/originals/ba/19/3c/ba193c385cbd91c7b22ea891c30818fb.jpg" alt="" />
          <img src="https://i.pinimg.com/originals/67/ef/32/67ef3247138572050210b5ba91e5b4ce.jpg" alt="" />
          <img src="https://i.pinimg.com/originals/ba/19/3c/ba193c385cbd91c7b22ea891c30818fb.jpg" alt="" />
        </div>
      </div>
      <p className="copyright">Made With &lt;3 By A.A</p>
    </div>
            
        </>
    )
}

export default Footer
