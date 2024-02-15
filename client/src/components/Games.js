import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Games() {
    const [query, setQuery] = useState('');
    const [games, setGames] = useState([]);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/search_games?query=${encodeURIComponent(query)}`, {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Search failed');
            }
            const data = await response.json();
            setGames(data);
            setError('');
            setSearched(true);
        } catch (error) {
            console.error('Error searching games:', error);
            setError('Failed to search for games. Please try again later.');
        }
    };

    return (
        <div>
            <h1 className='search-for-games-title'>Search for Games</h1>
            <form onSubmit={handleSearch} className="search-container">
                <input
                    type="text"
                    placeholder="Enter game title..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-field"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            {error && <p>{error}</p>}
            {searched && (
                <div className="game-container">
                    {games.length > 0 ? (
                        games.map((game, index) => (
                            <div key={index} className="game-card">
                                {game.cover_url && (
                                    <div className="game-image-container">
                                        <img src={game.cover_url} alt={`Cover of ${game.name}`} className="game-image" />
                                    </div>
                                )}
                                <div className="game-info-container">
                                    <h2 className="game-title">{game.name}</h2>
                                    <p className='info-section'>Platforms: <span className="info-text">{game.platforms ? game.platforms.map(platform => platform.name).join(', ') : 'N/A'}</span></p>
                                    <p className='info-section'>Genre: <span className="info-text">{game.genres ? game.genres.map(genre => genre.name).join(', '): 'N/A'}</span></p>
                                    <button onClick={() => navigate(`/games/${game.id}`)} className="see-more-button">See more!</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No games found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Games;
