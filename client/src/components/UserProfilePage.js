import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { fetchFavoritesAsync } from '../redux/actions';

function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const favorites = useSelector((state) => state.favorites.favorites); // Accessing favorites from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAsync()); // Dispatch action to fetch favorites

    // Fetch user info excluding favorites as it's now handled by Redux
    fetch('/user_profile', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        setUserInfo(data);
      })
      .catch(error => console.error('Error fetching user profile:', error));
  }, [dispatch]);


  return (
    <div>
      <h2>User Profile</h2>
      {userInfo && (
        <div>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>

          <h3>Favorites</h3>
          <ul>
            {favorites.map(favorite => (
              // Adjust how you access favorite properties based on your Redux state structure
              <li key={favorite.id}>{favorite.name} (Game ID: {favorite.igdb_game_id || favorite.game_id})</li>
            ))}
          </ul>

          <h3>Reviews</h3>
          <ul>
            {userInfo.reviews.map(review => (
              <li key={review.id}>{review.comment} - Rating: {review.rating}/5</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
