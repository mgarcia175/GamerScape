import React, { useState } from 'react';

function CreateGame({ onGameCreated }) {
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
            // Optionally, invoke a callback to update the parent component or navigate
            if (onGameCreated) onGameCreated();
        })
        .catch(error => {
            console.error('Error creating game:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create your Game</h1>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>Genre:</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
            <label>Summary:</label>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required />
            <button type="submit">Submit</button>
        </form>
    );
}

export default CreateGame;
