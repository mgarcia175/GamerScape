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
            <h1>Games List</h1>
            <ul className="game-container">
                {games.map((game, index) => (
                    <ul key={index}>
                        <h2>{game.name}</h2>
                        {game.cover_url && <img src={game.cover_url} alt={`Cover of ${game.name}`} />}
                    </ul>
                ))}
            </ul>
        </div>
    );
}

export default GamesList;