import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email required'),
  username: yup.string().required('Username required'),
  password: yup.string().required('Password required'),
});

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch('http://localhost:5555/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Signup success:', data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Signup error:', error);
      });
    },
  });

  return (
    <div id="signup-container">
      <form onSubmit={formik.handleSubmit}>
        <h2 id='signup-title'>Sign Up</h2>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div id="error-message">{formik.errors.email}</div>
          )}
        </div>
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
          {formik.touched.username && formik.errors.username && (
            <div id="error-message">{formik.errors.username}</div>
          )}
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
          {formik.touched.password && formik.errors.password && (
            <div id="error-message">{formik.errors.password}</div>
          )}
        </div>
        <div id="button-container">
          <button type="submit" id='signup-button'>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
