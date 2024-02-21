import GamerProfilePlaceholder from '../images/GamerScape Profile Placeholder.webp';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();


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
            data.reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
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

    const handleDeleteReview = (reviewId) => {
        fetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete review');
            }
            return response.json();
        })
        .then(() => {
            setUserData(prevUserData => ({
                ...prevUserData,
                reviews: prevUserData.reviews.filter(review => review.id !== reviewId),
            }));
        })
        .catch(error => {
            console.error('Error deleting review:', error);
        });
    };

    const handleEditReview = (reviewId) => {
        navigate(`/edit-review/${reviewId}`);
    }

    return (
        <div className="home-container">
            <h1>Home</h1>
            {userData ? (
            <div className="user-profile-container">
                <div className="user-info-container">
                    <h2 className='user-info-title'>User Information</h2>
                    <img src={GamerProfilePlaceholder} alt="User Profile Placeholder" className="profile-picture"/>
                    <div className="user-info">
                        <p>Username: {userData.username}</p>
                        <p>Email: {userData.email}</p>
                    </div>
                </div>
                    <div className="user-reviews">
                        <h3 className='reviews-title'>Reviews</h3>
                        {userData.reviews.length > 0 ? (
                        <ul className="reviews-list">
                            {userData.reviews.map((review) => (
                                <li key={review.id} className="review-item">
                                    <p>Game Title: {review.game_title || 'Title not available'}</p>
                                    <p>Difficulty: {review.difficulty || 'N/A'}</p>
                                    <p>Graphics: {review.graphics || 'N/A'}</p>
                                    <p>Gameplay: {review.gameplay || 'N/A'}</p>
                                    <p>Storyline: {review.storyline || 'N/A'}</p>
                                    <p>Review: {review.review || 'No review text'}</p>
                                    <p>Date: {review.created_at || 'Date not available'}</p>
                                    <button onClick={() => handleEditReview(review.id)} className="edit-review-button">Edit</button>
                                    <button onClick={() => handleDeleteReview(review.id)} className="delete-review-button">Delete</button>
                                </li>
                            ))}
                        </ul>
                        ) : (
                        <p>No reviews found.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>User information is not available.</p>
            )}
        </div>
    );
}

export default Home;
