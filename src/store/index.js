import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/auth.reducer';
import cartReducer from './reducers/cart.reducer';
import navigationReducer from './reducers/navigation.reducer';
import favouriteReducer from './reducers/favourites.reducer';
import adminSettingsReducer from './reducers/adminSettings.reducer';

// use combine reducers
const reducers = combineReducers({ authReducer, cartReducer, navigationReducer,favouriteReducer, adminSettingsReducer });

// export the store after creating it
export default createStore(reducers);
