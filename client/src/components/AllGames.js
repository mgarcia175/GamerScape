import React, { useEffect, useState } from 'react';

function AllGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('/games')
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(error => console.log('Oh nooo! Error fetching games. Sorry. | Details:', error));
    }, []);

    return (
        <div>
            <h1>All Games</h1>
            <div className="game-container">
                {games.map((game, index) => (
                    <div key={index} className="game-card">
                        {game.cover_url && (
                            <div className="game-image-container">
                                <img src={game.cover_url} alt={`Cover of ${game.name}`} className="game-image" />
                            </div>
                        )}
                        {!game.cover_url && (
                            <div className="game-placeholder">No Image Available</div>
                        )}
                        <div className="game-info-container">
                            <h2 className="game-title">{game.name}</h2>

                            <p>Release Date: {game.release_date}</p>
                            <p>Genre: {game.genre}</p>
                            {/* More info */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllGames;