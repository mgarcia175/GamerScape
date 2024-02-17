import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch('/user_profile', { credentials: 'include' })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        setUserInfo(data);
      })
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);
  

  return (
    <div>
      <h2>User Profile</h2>
      {userInfo && (
        <div>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>

          <h3>Favorites</h3>
          <ul>
            {userInfo.favorites.map(favorite => (
              <li key={favorite.id}>{favorite.name} (Game ID: {favorite.igdb_game_id})</li>
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
