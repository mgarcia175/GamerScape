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
            <ul>
                {games.map((game, index) => (
                    <li key={index}>
                        <p>{game.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GamesList;