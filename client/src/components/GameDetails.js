import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch(`/games/${gameId}`)
            .then(response => response.json())
            .then(data => setGame(data))
            .catch(error => console.log('Oh nooo! Error fetching game details. Sorry. | Details:', error));
    }, [gameId]);

    return (
        <div>
            {game ? (
                <div>
                    <h1>{game.name}</h1>
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