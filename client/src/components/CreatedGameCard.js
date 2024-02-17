import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const CreatedGameCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { game } = location.state || {};

  return (
    <>
                  <button onClick={() => navigate(`/review/${game.game_id}`)}>Leave a Review</button>
      <div className="game-card">
          {game ? (
              <>
                  <div className="game-placeholder">
                    {game.title}
                  </div>
                  <div className="game-info-container">
                      <p className='info-section'>Genre: <span className="info-text">{game.genre || 'N/A'}</span></p>
                      <p className='info-section'>Summary: <span className="info-text">{game.summary || 'N/A'}</span></p>
                  </div>
              </>
          ) : (
              <p>Game details not available.</p>
          )}
      </div>
    </>
  );
};

export default CreatedGameCard;
