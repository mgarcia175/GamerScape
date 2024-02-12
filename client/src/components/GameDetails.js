import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [review, setReview] = useState('');
    
    const handleReviewSubmit = () => {
        // Handle review submission logic here
        console.log('Review submitted:', review);
        // Clear the review input after submission
        setReview('');
    };

    useEffect(() => {
        fetch(`/games/${gameId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch game details');
                }
                return response.json();
            })
            .then(data => {
                const gameData = data[0];
                setGame(gameData);
                console.log(gameData);
            })
            .catch(error => console.error('Error fetching game details:', error));
    }, [gameId]);

    return (
        <div id='see-more-game-container'>
            <div className='see-more-game-details-container'>
                {game ? (
                    <div className='see-more-game-info-container'>
                        <div className='see-more-game-image-container'>
                            {game.cover && <img className='see-more-game-image-details' src={game.cover.url} alt={game.name} />}
                        </div>
                        <div className='see-more-game-info'>
                            <h1 className='see-more-game-title-details'>{game.name}</h1>
                            <div>
                                <p><strong>Platforms:</strong> {game.platforms ? game.platforms.map(platform => platform.name).join(', ') : 'N/A'}</p>
                                <p><strong>Genres:</strong> {game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
                                <p><strong>Summary:</strong> {game.summary || 'N/A'}</p>
                            </div>
                            <div>
                                <h3>Leave a Review</h3>
                                <textarea value={review} onChange={(e) => setReview(e.target.value)} rows={4} cols={50} placeholder="Write your review here..."></textarea>
                                <br />
                                <button onClick={handleReviewSubmit}>Submit Review</button>
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
