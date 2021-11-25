import React from 'react';
import hero from '../../../images/hero.jpg';
import '../../../home-styles/hero.css';
function Hero() {
  //   const coursol = document.querySelector('.carousel__slide')[0];
  //   const carousel = {
  //     run: function () {
  //       $('.carousel__slide:gt(0)').hide();
  //       setInterval(function () {
  //         $('.carousel__slide:first').fadeOut(1000).next().fadeIn(1000).end().appendTo('.carousel');
  //       }, 5000);
  //     },
  //   };
  //   carousel.run();
  return (
    <>
      <div className='hero'>
        <div class='carousel'>
          <div class='carousel__slide'>
            <img
              class='slide__image'
              src='https://images.unsplash.com/photo-1472745942893-4b9f730c7668?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8ab8b170ea9cf28aa06afd94cebd7ea4&auto=format&fit=crop&w=1049&q=80'
              alt=''
            />
          </div>
          <div class='carousel__slide'>
            <img
              class='slide__image'
              src='https://images.unsplash.com/photo-1510090658125-0706ab1d38e1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=97255cdff9a483b526ceb41bbbf8651f&auto=format&fit=crop&w=1350&q=80'
              alt=''
            />
          </div>
          <div class='carousel__slide'>
            <img
              class='slide__image'
              src='https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=891fe858de061305b9d58986c3970d60&auto=format&fit=crop&w=1350&q=80'
              alt=''
            />
          </div>
          <div class='carousel__slide'>
            <img
              class='slide__image'
              src='https://images.unsplash.com/photo-1497169345602-fbb1a307de16?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=efb46d876163a615ce7e33c9a81aa586&auto=format&fit=crop&w=1052&q=80'
              alt=''
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
