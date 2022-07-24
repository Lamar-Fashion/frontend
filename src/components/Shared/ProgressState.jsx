import '../../styles/shared/progress-state.css';

function ProgressState({style,count}) {
    

    return(
      
        <div class="progress">
        <div class="progress-done" style={style}>
          {count}%
        </div>
      </div>
    );
    
}


export default ProgressState;