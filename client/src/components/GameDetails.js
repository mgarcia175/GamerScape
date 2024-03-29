import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ScreenshotGallery from './ScreenshotGallery';

import { addFavoriteAsync } from '../redux/actions';

function GameDetails() {
    const navigate = useNavigate()
    const { gameId } = useParams();
    const [game, setGame] = useState(null);

    const dispatch = useDispatch();

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


function handleLeaveAReview() {
    console.log(game)
    navigate(`/review/${game.id}`, { state: { gameId: game.id, userCreated: false } })
}

function handleAddToFavorites() {
    let favoriteData = {
        igdb_game_id: game.id,
        title: game.name,
    };

    dispatch(addFavoriteAsync(favoriteData));
    navigate(`/`);
}


return (
    <div id='see-more-game-container'>
        <div className='see-more-game-details-container'>
            <div id='review-button'>
                <button onClick={handleAddToFavorites}>Add to Favorites</button>
                <button onClick={handleLeaveAReview}>Leave a Review</button>
            </div>
            {game ? (
                <div className='see-more-game-info-container'>
                    <div className='see-more-game-image-container'>
                        {game.cover && <img className='see-more-game-image-details' src={game.cover_url} alt={game.name} />}
                    </div>
                    <div className='see-more-game-info'>
                        <h1 className='see-more-game-title-details'>{game.name}</h1>
                        <div>
                            <p className='info-section'>Release Date: <span className="info-text">{game.first_release_date ? new Date(game.first_release_date * 1000).toLocaleDateString() : 'N/A'}</span></p>
                            <p className='info-section'>Platforms: <span className="info-text">{game.platforms ? game.platforms.map(platform => platform.name).join(', ') : 'N/A'}</span></p>
                            <p className='info-section'>Genres: <span className="info-text">{game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A'}</span></p>
                            <p className='info-section'>Summary: <span className="info-text">{game.summary || 'N/A'}</span></p>
                        </div>
                        {game.screenshot_urls && (
                            <ScreenshotGallery screenshotUrls={game.screenshot_urls} />
                        )}
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