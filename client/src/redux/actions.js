export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE';

export const addFavorite = game => ({
  type: ADD_FAVORITE,
  payload: game,
});

export const removeFavorite = gameId => ({
  type: REMOVE_FAVORITE,
  payload: gameId,
});

export const fetchFavoritesRequest = () => ({
  type: FETCH_FAVORITES_REQUEST,
});

export const fetchFavoritesSuccess = favorites => ({
  type: FETCH_FAVORITES_SUCCESS,
  payload: favorites,
});

export const fetchFavoritesFailure = error => ({
  type: FETCH_FAVORITES_FAILURE,
  payload: error,
});
