// initial State
const initialState = {
    favouritesNumber: 0,
  };
  
  //favourite Reducer
  const favouriteReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'ASSIGN_FAV':
        return {
          favouritesNumber: payload,
        };
    
        default:
        return state;
    }
  };
  
  export default favouriteReducer;
  