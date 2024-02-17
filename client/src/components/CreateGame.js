import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function CreateGame({ onGameCreated }) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            genre: '',
            summary: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title Required'),
            genre: Yup.string().required('Genre Required'),
            summary: Yup.string().required('Summary Required'),
        }),
        onSubmit: (values) => {
            fetch('/api/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
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
                navigate('/created-game', {state: {game: data} });
            })
            .catch(error => {
                console.error('Error creating game:', error);
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="create-game-form">
            <h1>Create your Game</h1>
            <div className="form-group">
                <label htmlFor="title" className="form-label">Title:</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="form-input"
                />
                {formik.touched.title && formik.errors.title ? <div className="error-message">{formik.errors.title}</div> : null}
            </div>
            <div className="form-group">
                <label htmlFor="genre" className="form-label">Genre:</label>
                <input
                    id="genre"
                    name="genre"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.genre}
                    className="form-input"
                />
                {formik.touched.genre && formik.errors.genre ? <div className="error-message">{formik.errors.genre}</div> : null}
            </div>
            <div className="form-group">
                <label htmlFor="summary" className="form-label">Summary:</label>
                <textarea
                    id="summary"
                    name="summary"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.summary}
                    className="create-text-input"
                />
                {formik.touched.summary && formik.errors.summary ? <div className="error-message">{formik.errors.summary}</div> : null}
            </div>
            <button type="submit" className="form-button">Submit</button>
        </form>
    );
}

export default CreateGame;
