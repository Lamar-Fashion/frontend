// initial State
const initialState = {
  cartProducts: JSON.parse(window.localStorage.getItem('cart')),
};

//auth Reducer
const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SIGN_UP_IN':
      return {
        isLoggedIn: true,
        user: payload,
      };
    case 'LOG_OUT':
      console.log('hello from log out action');
      return {
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default cartReducer;
