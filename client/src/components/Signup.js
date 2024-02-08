import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  username: yup.string().required('Username required'),
  password: yup.string().required('Password required'),

});

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log('Signup submitted with:', values);



      navigate('/signup'); // desired route after signup
    },
  });

  return (
    <div id="signup-container">
      <form onSubmit={formik.handleSubmit}>
        <h2 id='signup-title'>Sign Up</h2>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        {/* Add more fields for signing up if needed */}
        <div id="button-container">
          <button type="submit" id='signup-button'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
