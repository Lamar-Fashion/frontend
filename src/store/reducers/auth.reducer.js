// initial State
const initialState = {
  isLoggedIn: false,
  user: null,
  role: 'user',
};

//auth Reducer
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SIGN_UP_IN':
      return {
        isLoggedIn: true,
        user: payload,
        role:payload.role
      };
    case 'LOG_OUT':
      return {
        isLoggedIn: false,
        user: null,
        role:'user'
      };
    default:
      return state;
  }
};

export default authReducer;
