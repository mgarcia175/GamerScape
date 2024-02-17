import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const CreatedGameCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { game } = location.state || {};

  return (
    <div>
      <div className='leave-review-button'>
      <button onClick={() => navigate(`/review/${game.game_id}`)}>Leave a Review</button>
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
