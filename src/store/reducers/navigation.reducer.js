// initial State
const initialState = {
    catagory: "all",
  };
  
  //cart Reducer
  const navigationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'NAVIGATE':
        console.log(payload);
        return {
          catagory: payload ? payload : state.catagory
          
        };
  
      default:
        return state;
    }
  };
  
  export default navigationReducer;
  