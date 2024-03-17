import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addFavoriteAsync } from '../redux/actions';

const CreatedGameCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { game } = location.state || {};

  const dispatch = useDispatch();

const handleLeaveReview = () => {
  console.log(game)
  navigate(`/review/${game.game_id}`, { state: { gameId: game.game_id, userCreated: true } } );
}

function handleAddToFavorites() {
  console.log(game)
  let favoriteData = {};

  if (game.userCreated) {
    favoriteData.game_id = game.game_id;
  } else {
      favoriteData.igdb_game_id = game.id;
  }

  dispatch(addFavoriteAsync(favoriteData));
}

  return (
    <div>
      <div className='leave-review-button'>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
      <button onClick={handleLeaveReview}>Leave a Review</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
      <div className="game-card">
          {game ? (
              <div>
                  <div className="game-placeholder">
                    {game.title}
                  </div>
                  <div className="game-info-container">
                      <p className='info-section'>Genre: <span className="info-text">{game.genre || 'N/A'}</span></p>
                      <p className='info-section'>Summary: <span className="info-text">{game.summary || 'N/A'}</span></p>
                  </div>
              </div>
          ) : (
              <p>Game details not available.</p>
          )}
      </div>
      </div>
    </div>
  );
};

export default CreatedGameCard;
