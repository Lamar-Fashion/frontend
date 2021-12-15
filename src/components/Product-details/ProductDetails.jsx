import {React, useState} from 'react'
import "../../styles/product-details/product-details.css"
import { Link } from "react-router-dom";
import obj from "../../product-d.json"
import Flicking from "@egjs/react-flicking";
function ProductDetails() {
    let images=obj.images
    let firstImg=obj.images[0]
    const [state, setstate] = useState(firstImg)
    let name=obj.name
    let price=obj.price
    let size=obj.size
    let color=obj.color
    let descrp=obj.discrpition
    return (
        <>
            <section className="product-d" >
        <div className="lamar-container">
          <div className="path">
            <Link to="/">
              <i class="fas fa-home"></i>
            </Link>
            <i class="fas fa-angle-right"></i> <span>Product Detail</span>
          </div>
        </div>
        <div className="lamar-container">
            <div className="image-product">
                <div className="big-image">
                    <img src={state} alt="" />
                </div>
                <div className="left-images">
                <Flicking circular={true} >
                    {
                        
                        images.map(item=>{
                            
                            
                            return( <div className="image" onClick={()=>{
                                setstate(item)
                            }}>
                            <img src={item} alt="" />
                            </div> )
                        })
                    }
                     </Flicking>
                </div>
            </div>
            <div className="product-info">
                <div className="name-p">
                        <h2>product Num : <span>{name}</span></h2>
                    <div className="price">
                        <h2>QAR <span>{price}</span></h2>
                        <p><span>Availabilty :</span> In Stock</p>
                    </div>
                </div>
                <hr />
                <div className="size-color">
                    <div className="size">
                        <h4>size</h4>
                        <div className="avialable">
                            {
                                size.map(item=><button>{item}</button>)
                            }
                        </div>
                    </div>
                    <div className="colors">
                        <h4>color</h4>
                        <div className="avialable">
                        {
                            
                    color.map(item=> <button style={{backgroundColor:item}}></button> )
                            }
                        </div>
                    </div>

                </div>
                <hr />
                <div className="qun-product">
                    <div className="qun">
                        <span>1</span>
                        <div className="plus-dec">
                        <button>+</button>
                        <button>-</button>
                        </div>
                       
                    </div>
                    <div className="add-to-cart">
                        <button>add to cart</button>
                    </div>
                    <div className="add-fav">
                    <button>💖</button>
                </div>
                </div>
                <hr />
                <div className="about-p">
                    <h4>About This Item :</h4>

                    <p>{descrp}</p>
                </div>
            </div>
        </div>
        </section>
        </>
    )
}

export default ProductDetails
