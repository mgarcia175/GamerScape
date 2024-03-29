import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  username: yup.string().required('Username required'),
  password: yup.string().required('Password required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error during login:', error);
        setLoginError('Failed to log in. Please check your credentials.');
      })
      .finally(() => setSubmitting(false));
    },
  });

  return (
    <div id="login-container">
      <form onSubmit={formik.handleSubmit}>
        <h2 id='login-title'>Login</h2>
        {}
        {loginError && <div className="login-error">{loginError}</div>}
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
          <button type="submit" id='login-button'>Login</button>
        </div>
      </form>
      <div id="signup-link-container">
        <span className='signup-text'>Don't have an account? </span>
        <Link to="/signup" className="signup-text">Sign up!</Link>
      </div>
    </div>
  );
};

export default Login;