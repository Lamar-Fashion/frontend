import { encryptAndSaveToStorage } from "../../helpers/CryptoJS";


// LogInAction
export const logInAction = (userData) => {
  encryptAndSaveToStorage('cart', []);
  encryptAndSaveToStorage('cartNumber', 0);
  encryptAndSaveToStorage('total', 0);
  return {
    type: 'SIGN_UP_IN',
    payload: userData,
  };
};

// logOutAction
export const logOutAction = () => {
  encryptAndSaveToStorage('cart', []);
  encryptAndSaveToStorage('cartNumber', 0);
  encryptAndSaveToStorage('total', 0);
  encryptAndSaveToStorage('favNumber', 0);
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
// reset the CArt
export const resetCartAction = () => {
  return {
    type: 'RESET_CART',
  };
};
// navigate to abaya 
export const navigateAction = (item) => {
  return {
    type: 'NAVIGATE',
    payload: item ? item : null,
  };
};

// assign favourites number
export const assignFavourite = (favNumber) => {
  return {
    type: 'ASSIGN_FAV',
    payload: favNumber,
  };
};
// set admin settings
export const setAdminSettings = (adminSettings) => {
  return {
    type: 'SET_ADMIN_SETTINGS',
    payload: { adminSettings },
  };
};
// clear admin settings
export const clearAdminSettings = () => {
  return {
    type: 'CLEAR_ADMIN_SETTINGS',
  };
};