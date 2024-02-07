import React, { useEffect, useState } from 'react';

function GamesList() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('/games')
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(error => console.log('Oh nooo! Error fetching games. Sorry. | Details:', error));
    }, []);

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Games List</h1>
            <div className="game-container">
                {games.map((game, index) => (
                    <div key={index} className="game-plaque">
                        {game.name && (
                            <div className="game-title-plaque">
                                <h2 className="game-title">{game.name}</h2>
                            </div>
                        )}
                        {game.cover_url && (
                            <div className="game-card">
                                <img src={game.cover_url} alt={`Cover of ${game.name}`} className="game-image" />
                            </div>
                        )}
                        {!game.cover_url && (
                            <div className="game-card">
                                <div className="game-placeholder">No Image Available</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GamesList;