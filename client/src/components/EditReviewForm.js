import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

const EditReviewForm = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams();

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
      fetch(`/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update review');
        }
        return response.json();
      })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating review:', error);
        setSubmitting(false);
      });
    },
  });

  return (
    <div className="edit-review-form-container">
      <h2>Edit Review</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="difficulty">Difficulty (1-5):</label>
        <input
          id="difficulty"
          name="difficulty"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.difficulty}
        />
        {formik.touched.difficulty && formik.errors.difficulty ? (
          <div>{formik.errors.difficulty}</div>
        ) : null}

        <label htmlFor="graphics">Graphics (1-5):</label>
        <input
          id="graphics"
          name="graphics"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.graphics}
        />
        {formik.touched.graphics && formik.errors.graphics ? (
          <div>{formik.errors.graphics}</div>
        ) : null}

        <label htmlFor="gameplay">Gameplay (1-5):</label>
        <input
          id="gameplay"
          name="gameplay"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gameplay}
        />
        {formik.touched.gameplay && formik.errors.gameplay ? (
          <div>{formik.errors.gameplay}</div>
        ) : null}

        <label htmlFor="storyline">Storyline (1-5):</label>
        <input
          id="storyline"
          name="storyline"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.storyline}
        />
        {formik.touched.storyline && formik.errors.storyline ? (
          <div>{formik.errors.storyline}</div>
        ) : null}

        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          name="review"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.review}
        />
        {formik.touched.review && formik.errors.review ? <div>{formik.errors.review}</div> : null}

        <button type="submit" disabled={formik.isSubmitting}>
          Update Review
        </button>
      </form>
    </div>
  );
};

export default EditReviewForm;
