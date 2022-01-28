import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/auth.reducer';
import cartReducer from './reducers/cart.reducer';
import navigationReducer from './reducers/navigation.reducer';
// use combine reducers
const reducers = combineReducers({ authReducer, cartReducer ,navigationReducer });

// export the store after creating it
export default createStore(reducers);
