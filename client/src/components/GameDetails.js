import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function GameDetails() {
    const navigate = useNavigate()
    const { gameId } = useParams();
    const [game, setGame] = useState(null);


    useEffect(() => {
        fetch(`/api/games/${gameId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch game details');
                }
                return response.json();
            })
            .then(data => {
                const gameData = data[0];
                setGame(gameData);
            })
            .catch(error => console.error('Error fetching game details:', error));
    }, [gameId]);

function handleAddToFavorites() {

}

function handleLeaveAReview() {
    navigate(`/review/${gameId}`);
}
    return (
        <div id='see-more-game-container'>
            <div className='see-more-game-details-container'>
                        <div id='review-and-favorites-button'>
                            <button onClick={handleAddToFavorites}>Add to favorites</button>
                            <button onClick={handleLeaveAReview}>Leave a Review</button>
                        </div>
                {game ? (
                    <div className='see-more-game-info-container'>
                        <div className='see-more-game-image-container'>
                            {game.cover && <img className='see-more-game-image-details' src={game.cover.url} alt={game.name} />}
                        </div>
                        <div className='see-more-game-info'>
                            <h1 className='see-more-game-title-details'>{game.name}</h1>
                            <div>
                                <p className='info-section'>Platforms: <span className="info-text">{game.platforms ? game.platforms.map(platform => platform.name).join(', ') : 'N/A'}</span></p>
                                <p className='info-section'>Genres: <span className="info-text">{game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A'}</span></p>
                                <p className='info-section'>Summary: <span className="info-text">{game.summary || 'N/A'}</span></p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default GameDetails;