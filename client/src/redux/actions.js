import thunk from 'redux-thunk';

export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE';

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

export const addFavorite = favorite => ({
  type: ADD_FAVORITE,
  payload: favorite,
});

export const removeFavorite = gameId => ({
  type: REMOVE_FAVORITE,
  payload: gameId,
});

// Thunk aactions
export const fetchFavoritesAsync = () => async (dispatch) => {
  dispatch(fetchFavoritesRequest());
  try {
    const response = await fetch('/api/favorites', { credentials: 'include' });
    if (!response.ok) throw new Error('Failed to fetch favorites');
    const favorites = await response.json();

    
    dispatch(fetchFavoritesSuccess(favorites));
  } catch (error) {
    dispatch(fetchFavoritesFailure(error.toString()));
  }
};

export const addFavoriteAsync = favoriteData => dispatch => {
  dispatch(fetchFavoritesRequest());
  fetch('/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favoriteData),
    credentials: 'include',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to add game to favorites');
    }
    return response.json();
  })
  .then(() => {
    dispatch(fetchFavoritesAsync());

  })
  .catch(error => {
    console.error('Error adding game to favorites:', error);
    dispatch(fetchFavoritesFailure(error.toString()));
  });
};
