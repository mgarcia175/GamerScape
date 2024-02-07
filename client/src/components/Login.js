import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Implementing validation with yup -- requiring password and username along with requiring strings.
const validationSchema = yup.object({
  username: yup.string().required('Username required'),
  password: yup.string().required('Password required'),
});

const Login = () => {
  const navigate = useNavigate();

  // useFormik hook to manage form state
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log('Login submitted with:', values);
      // Here you would typically authenticate the user
      // For demonstration, navigate to another route upon successful submission
      navigate('/dashboard'); // Change '/dashboard' to your desired route
    },
  });

  return (
    <div id="login-container">
      <form onSubmit={formik.handleSubmit}>
        <h2 id='login-title'>Log In</h2>
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
          <div id="button-container">
          <button type="submit" id='login-button'>Log In</button>
          </div>
      </form>
      <a href="#" id='signup-text'>Or sign up</a>
    </div>
  );
};

export default Login;