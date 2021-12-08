import React, { useState } from 'react';
import './App.css';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Button from "@mui/material/Button";

const email_regexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validationSchema = Yup.object({
  username: Yup.string()
            .max(20, 'Must be at most 20 characters')
            .required('Username is required'),
  email:  Yup.string()
          .matches(email_regexp, {
            message: 'Invalid email address',
            excludeEmptyStrings: true,
          })
          .required('Email is required'),
  password: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .required('Password is required'),
  confirmation: Yup.string()
                .oneOf([Yup.ref('password'), ''], 'Password and Confirmation do not match')
                .required('Confirmation is required')
})



function App() {

  const [submitted, setSubmitted] = useState(false);

  const hasError = (field) => {
    return formik.errors[field] && (formik.touched[field] || submitted) 
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmation: "",
    },
    validationSchema,
    onSubmit: (values) => alert(`${values.username} submitted`),
  })
  
  return (
    <div className="App">
      <h1>
        Formik example
      </h1>

      <form onSubmit={(event) => {event.preventDefault(); formik.handleSubmit(event)}}>
          <h2>Sign up</h2>
          <div className="input-container">
            {hasError('username') &&
              <label className="error">{formik.errors.username}</label>            
            }
            {!formik.errors.username && formik.values.username &&
              <label className="simple-label">Username *</label>            
            }
            <input
              name="username"
              type="text"
              placeholder="Your username..."
              {...formik.getFieldProps('username')}
              className={hasError('username') ? "with-error" : ""}
            />
          </div>
          <br />
          <div className="input-container">
            {hasError('email') &&
              <label className="error">{formik.errors.email}</label>
            }
            {!formik.errors.email && formik.values.email &&
              <label className="simple-label">Email *</label>            
            }
            <input
              name="email"
              type="email"
              placeholder="Your email..."
              {...formik.getFieldProps('email')}
              className={hasError('email') ? "with-error" : ""}
            />
          </div>
          <br />
          <div className="input-container">
            {hasError('password') &&
              <label className="error">{formik.errors.password}</label>
            }
            {!formik.errors.password && formik.values.password &&
              <label className="simple-label">Password *</label>            
            }
            <input
              name="password"
              type="password"
              placeholder="Your password..."
              {...formik.getFieldProps('password')}
              className={hasError('password') ? "with-error" : ""}
            />
          </div>
          <br />
          <div className="input-container">
            {hasError('confirmation') &&
              <label className="error">{formik.errors.confirmation}</label>
            }
            {!formik.errors.confirmation && formik.values.confirmation &&
              <label className="simple-label">Password confirmation *</label>            
            }
            <input
              name="confirmation"
              type="password"
              placeholder="Retype your password..."
              {...formik.getFieldProps('confirmation')}
              className={hasError('confirmation') ? "with-error" : ""}
            />
          </div>
          <br />
          <Button
            type="submit"
            variant="outlined"
            onClick={() => {setSubmitted(true)} }
            disabled={Object.keys(formik.errors).length!==0}>
            Submit
          </Button>
          <Button color="error" onClick={formik.handleReset}>
            Clear
          </Button>
        </form>
    </div>
  );
}

export default App;
