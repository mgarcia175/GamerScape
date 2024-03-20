import { 
  ADD_FAVORITE, 
  REMOVE_FAVORITE, 
  FETCH_FAVORITES_REQUEST, 
  FETCH_FAVORITES_SUCCESS, 
  FETCH_FAVORITES_FAILURE 
} from './actions';

const initialState = {
  loading: false,
  favorites: [],
  error: '',
};

function favoritesReducer(state = initialState, action) {

  switch (action.type) {
    case FETCH_FAVORITES_REQUEST:
      return { ...state, loading: true };
    case FETCH_FAVORITES_SUCCESS:
      return { ...state, loading: false, favorites: action.payload, error: '' };
    case FETCH_FAVORITES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FAVORITE:
      return { ...state, favorites: state.favorites.filter(game => game.id !== action.payload) };
    default:
      return state;
  }
}

export default favoritesReducer;
