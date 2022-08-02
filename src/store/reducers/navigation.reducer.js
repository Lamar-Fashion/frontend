// initial State
const initialState = {
    category: "all",
  };
  
  //cart Reducer
  const navigationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'NAVIGATE':
        return {
          category: payload ? payload : state.category
          
        };
  
      default:
        return state;
    }
  };
  
  export default navigationReducer;
  