import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateGame({ onGameCreated }) {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [summary, setSummary] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, genre, summary }),
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Search failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Game created successfully:', data);
            navigate('/created-game', {state: {game: data} })
        })
        .catch(error => {
            console.error('Error creating game:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="create-game-form">
          <h1>Create your Game</h1>
          <div className="form-group">
            <label className="form-label">Title: </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" required />
          </div>
          <div className="form-group">
            <label className="form-label">Genre: </label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="form-input" required />
          </div>
          <div className="form-group">
            <label className="summary-form-label">Summary: </label>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="create-text-input" required />
          </div>
          <button type="submit" className="form-button">Submit</button>
        </form>
      );
}

export default CreateGame;
