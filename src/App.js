import React, { useState } from 'react';
import './App.css';
import TextInput from './TextInput';
import { Formik, Form } from "formik";
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
  const [usernameErrors, setUsernameErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [confirmationErrors, setConfirmationErrors] = useState(false);
  const [emailErrors, setEmailErrors] = useState(false);

  return (
    <div className="App">
      <h1>
        Formik example
      </h1>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmation: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setSubmitted(true);
          alert(`${values.username} submitted`);
        }}
      >
        <Form>
          <h2>Sign up</h2>
          
          <TextInput name="username"     type="text"     placeholder="Your username..."     submitted={submitted} setErrors={setUsernameErrors} />
          <TextInput name="email"        type="email"    placeholder="Your email..."        submitted={submitted} setErrors={setEmailErrors} />
          <TextInput name="password"     type="password" placeholder="Your password..."     submitted={submitted} setErrors={setPasswordErrors} />
          <TextInput name="confirmation" type="password" placeholder="Your confirmation..." submitted={submitted} setErrors={setConfirmationErrors} />

          <Button
            type="submit"
            variant="outlined"
            disabled={usernameErrors || emailErrors || passwordErrors || confirmationErrors}>
              Submit
          </Button>
          <Button
            type="reset"
            color="error">
              Clear
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
