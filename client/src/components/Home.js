import React, { useEffect, useState } from 'react';

function Home() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/user_profile', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUserData(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching user profile:', error);
            setError('Failed to fetch user profile. Please try again later.');
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Home</h1>
            {userData ? (
                <div>
                    <h2>User Information</h2>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <h3>Reviews</h3>
                    {userData.reviews.length > 0 ? (
                    <ul>
                        {userData.reviews.map((review) => (
                            <li key={review.id}>
                                <p>Game Title: {review.game_title}</p>
                                <p>Difficulty: {review.difficulty}</p>
                                <p>Graphics: {review.graphics}</p>
                                <p>Gameplay: {review.gameplay}</p>
                                <p>Storyline: {review.storyline}</p>
                                <p>Review: {review.review}</p>
                                <p>Date: {review.created_at}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews found.</p>
                )}
                </div>
            ) : (
                <p>User information is not available.</p>
            )}
        </div>
    );
}

export default Home;
