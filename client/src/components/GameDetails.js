import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);

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
            })
            .catch(error => console.error('Error fetching game details:', error));
    }, [gameId]);

    return (
        <div>
            {game ? (
                <div>
                    <h1>{game.name}</h1>
                    {game.cover && <img src={game.cover.url} alt={game.name} />}
                    <p>Platforms: {game.platforms ? game.platforms.map(platform => platform.name).join(', ') : 'N/A'}</p>
                    <p>Genres: {game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
                    <p>Summary: {game.summary || 'N/A'}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default GameDetails;
