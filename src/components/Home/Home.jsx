import React from 'react'
import Brand from './brand/Brand'
import Hero from './hero/Hero'
import Feedback from './feedback/Feedback'
import Products from './products/Products'
import Shop from './shop/Shop'

function Home() {

    let button=document.querySelector(".go-up")
    function scroll(){
        if(window.scrollY===0){
         
           button.style.display="none"
           
        }
      }

      scroll()

      window.onscroll=function(){
        if(window.scrollY===0){
         
         button.style.display="none"
          
        }else if(window.scrollY>=120){
           
            button.style.display="block"
        }
      }
      
      button.onclick=function(){
        window.scrollTo({
          top:0,
          left:0,
          behavior:"smooth"
      
      
        })
      }
    return (
        <>
      
      <button class="go-up" >
      <i class="fas fa-angle-up"></i>
      </button>
        <Hero/>
        <Brand/>
        <Shop/>
        <Products/>
        <Feedback/>
           
        </>
    )
}

export default Home
