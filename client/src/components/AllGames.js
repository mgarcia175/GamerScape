import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AllGames() {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch('/games')
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(error => console.log('Oh nooo! Error fetching games. Sorry. | Details:', error));
    }, []);




    const handleSeeMore = (gameId) => {
        navigate(`/games/${gameId}`);
    };

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
                            <div className="game-placeholder">Image not available</div>
                        )}
                        <div className="game-info-container">
                            <h2 className="game-title">{game.name}</h2>
                            <p className='info-section'>Platforms: <span className="info-text">{game.platforms ? game.platforms.map(platform => platform.name).join(', ') : 'N/A'}</span></p>
                            <p className='info-section'>Genre: <span className="info-text">{game.genres ? game.genres.map(genre => genre.name).join(', '): 'N/A'}</span></p>
                            <button onClick={() => handleSeeMore(game.id)} className="see-more-button">See more!</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllGames;
