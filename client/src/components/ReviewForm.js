import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';

const ReviewForm = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();

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
            fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    igdb_game_id: gameId,
                    difficulty: values.difficulty,
                    graphics: values.graphics,
                    gameplay: values.gameplay,
                    storyline: values.storyline,
                    review: values.review,
                }),
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
                navigate(`/games/${gameId}`);
            })
            .catch(error => {
                console.error('Error submitting review:', error);
            })
            .finally(() => setSubmitting(false));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="difficulty">Difficulty (1-5): </label>
                <input
                    id="difficulty"
                    name="difficulty"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.difficulty}
                />
                {formik.touched.difficulty && formik.errors.difficulty ? <div>{formik.errors.difficulty}</div> : null}
            </div>

            <div>
                <label htmlFor="graphics">Graphics (1-5): </label>
                <input
                    id="graphics"
                    name="graphics"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.graphics}
                />
                {formik.touched.graphics && formik.errors.graphics ? <div>{formik.errors.graphics}</div> : null}
            </div>

            <div>
                <label htmlFor="gameplay">Gameplay (1-5): </label>
                <input
                    id="gameplay"
                    name="gameplay"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gameplay}
                />
                {formik.touched.gameplay && formik.errors.gameplay ? <div>{formik.errors.gameplay}</div> : null}
            </div>

            <div>
                <label htmlFor="storyline">Storyline (1-5): </label>
                <input
                    id="storyline"
                    name="storyline"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.storyline}
                />
                {formik.touched.storyline && formik.errors.storyline ? <div>{formik.errors.storyline}</div> : null}
            </div>

            <div>
                <label htmlFor="review">Review: </label>
                <textarea
                    id="review"
                    name="review"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.review}
                />
                {formik.touched.review && formik.errors.review ? <div>{formik.errors.review}</div> : null}
            </div>

            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
