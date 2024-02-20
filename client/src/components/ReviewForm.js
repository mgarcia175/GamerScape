import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';

const ReviewForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { gameId, userCreated } = location.state || {}; // Ensure we get these values from the state
    console.log(gameId)
    console.log(userCreated)

    console.log(location.state);

    const formik = useFormik({
        initialValues: {
            difficulty: '',
            graphics: '',
            gameplay: '',
            storyline: '',
            review: '',
        },
        validationSchema: Yup.object({
            difficulty: Yup.number().min(1, 'Must be between 1 and 5').max(5, 'Must be between 1 and 5').required('Required'),
            graphics: Yup.number().min(1, 'Must be between 1 and 5').max(5, 'Must be between 1 and 5').required('Required'),
            gameplay: Yup.number().min(1, 'Must be between 1 and 5').max(5, 'Must be between 1 and 5').required('Required'),
            storyline: Yup.number().min(1, 'Must be between 1 and 5').max(5, 'Must be between 1 and 5').required('Required'),
            review: Yup.string().required('Required'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            
            const reviewPayload = {
                difficulty: values.difficulty,
                graphics: values.graphics,
                gameplay: values.gameplay,
                storyline: values.storyline,
                review: values.review,
            };

            console.log("gameId:", gameId); // Log the gameId
            console.log("userCreated:", userCreated); // Log the userCreated flag

            if (userCreated) {
                reviewPayload.game_id = gameId; // For user-created games
            } else {
                reviewPayload.igdb_game_id = gameId; // For IGDB games
            }

            console.log("Submitting review with payload:", reviewPayload);


            fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewPayload),
                credentials: 'include',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Review successfully submitted:', data);
                navigate(`/`);
            })
            .catch(error => {
                console.error('Error submitting review:', error);
            })
            .finally(() => setSubmitting(false));
        },
    });

    return (
        
        <form onSubmit={formik.handleSubmit} className="review-input-container"> <h1 className='leave-review-title'>Leave Your Review</h1>
            <div className="review-input-container">
                <label htmlFor="difficulty" className='review-info-section'>Difficulty (1-5): </label>
                <input
                    id="difficulty"
                    name="difficulty"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.difficulty}
                    className='review-input'
                />
                {formik.touched.difficulty && formik.errors.difficulty ? <div className="error-message">{formik.errors.difficulty}</div> : null}
            </div>

            <div className="review-input-container">
                <label htmlFor="graphics" className='review-info-section'>Graphics (1-5): </label>
                <input
                    id="graphics"
                    name="graphics"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.graphics}
                    className='review-input'
                />
                {formik.touched.graphics && formik.errors.graphics ? <div className="error-message">{formik.errors.graphics}</div> : null}
            </div>

            <div className="review-input-container">
                <label htmlFor="gameplay" className='review-info-section'>Gameplay (1-5): </label>
                <input
                    id="gameplay"
                    name="gameplay"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gameplay}
                    className='review-input'
                />
                {formik.touched.gameplay && formik.errors.gameplay ? <div className="error-message">{formik.errors.gameplay}</div> : null}
            </div>

            <div className="review-input-container">
                <label htmlFor="storyline" className='review-info-section'>Storyline (1-5): </label>
                <input
                    id="storyline"
                    name="storyline"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.storyline}
                    className='review-input'
                />
                {formik.touched.storyline && formik.errors.storyline ? <div className="error-message">{formik.errors.storyline}</div> : null}
            </div>

            <div className="review-input-container">
                <label htmlFor="review" className='review-info-section'>Review: </label>
                <textarea
                    id="review"
                    name="review"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.review}
                    className="review-textarea"
                />
                {formik.touched.review && formik.errors.review ? <div className="error-message">{formik.errors.review}</div> : null}
            </div>

            <button type="submit" className='review-submit-button'>Submit Review</button>
        </form>
    );
};

export default ReviewForm;
