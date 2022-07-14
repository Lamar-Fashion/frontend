// LogInAction
export const logInAction = (userData) => {
  return {
    type: 'SIGN_UP_IN',
    payload: userData,
  };
};

// logOutAction
export const logOutAction = () => {
  return {
    type: 'LOG_OUT',
  };
};

// Add to Cart
export const addToCartAction = () => {
  return {
    type: 'ADD_TO_CART',
  };
};

// Remove from CArt
export const removeFromCartAction = (quantity) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: quantity ? quantity : null,
  };
};
// navigate to abaya 
export const navigateAction = (item) => {
  return {
    type: 'NAVIGATE',
    payload: item ? item : null,
  };
};