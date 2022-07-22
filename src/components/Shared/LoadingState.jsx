
import {React,useEffect,useState} from 'react';
import '../../styles/shared/loading-state.css';

function LoadingState() {
    

    return(
        <div class="loading-circular">
        <div class="circular-group">
          <div class="circular_1"></div>
          <div class="circular_2"></div>
          <div class="circular_3"></div>
          <div class="circular_4"></div>
          <div class="circular_5"></div>
          <div class="circular_6"></div>
          <div class="circular_7"></div>
          <div class="circular_8"></div>
        </div>
        {/* <div class="text-loading">Loading Text</div> */}
        </div>
    )
}

export default LoadingState;