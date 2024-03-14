import { combineReducers } from 'redux';
import favoritesReducer from './reducers';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export default rootReducer;
