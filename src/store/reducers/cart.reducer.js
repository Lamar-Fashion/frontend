import { decryptAndGetFromStorage } from "../../helpers/CryptoJS";
// initial State
const initialState = {
  cartProductsNumber: decryptAndGetFromStorage("cartNumber")
  ? decryptAndGetFromStorage("cartNumber")
  : 0,
};

//cart Reducer
const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_TO_CART':
      return {
        cartProductsNumber: state.cartProductsNumber + 1,
      };
    case 'REMOVE_FROM_CART':
      if (state.cartProductsNumber > 0) {
        return {
          cartProductsNumber: payload ? state.cartProductsNumber - payload : state.cartProductsNumber - 1,
        };
      };

      case 'RESET_CART':
        return {
          cartProductsNumber: 0,
        };

    default:
      return state;
  }
};

export default cartReducer;
