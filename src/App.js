import React from 'react';
import './App.css';
import { useFormik } from "formik";
import Button from "@mui/material/Button";

const validate = (values) => {
  const email_regexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const errors = {};
  const { name, email, password, confirmation } = values; 
  if (!name) {
    errors.name = "Required";
  }
  if (!email) {
    errors.email = "Required";
  }
  if (!password) {
    errors.password = "Required";
  }
  if (!confirmation) {
    errors.confirmation = "Required";
  }
  else if (password!==confirmation) {
    errors.confirmation = "Password and confirmation do not match"
  }
  if (!email) {
    errors.email = "Required";
  }
  else if (!email_regexp.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
}

function App() {

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmation: "",
    },
    validate,
    onSubmit: (values) => alert(`${values.name} submitted`),
  })
  
  return (
    <div className="App">
      <h1>
        Formik example
      </h1>

      <form onSubmit={(event) => {event.preventDefault(); formik.handleSubmit(event)}}>
          <h2>Sign up</h2>
          <div className="input-container">
            {formik.errors.name &&
              <label className="error">{formik.errors.name}</label>            
            }
            {!formik.errors.name && formik.values.name &&
              <label className="simple-label">Name *</label>            
            }
            <input
              name="name"
              type="text"
              placeholder="Your name..."
              value={formik.values.name}
              onChange={formik.handleChange}
              className={formik.errors.name ? "with-error" : ""}
            />
          </div>
          <br />
          <div className="input-container">
            {formik.errors.email &&
              <label className="error">{formik.errors.email}</label>
            }
            {!formik.errors.email && formik.values.email &&
              <label className="simple-label">Email *</label>            
            }
            <input
              name="email"
              type="email"
              placeholder="Your email..."
              value={formik.values.email}
              onChange={formik.handleChange}
              className={formik.errors.email ? "with-error" : ""}
            />
          </div>
          <br />
          <div className="input-container">
            {formik.errors.password &&
              <label className="error">{formik.errors.password}</label>
            }
            {!formik.errors.password && formik.values.password &&
              <label className="simple-label">Password *</label>            
            }
            <input
              name="password"
              type="password"
              placeholder="Your password..."
              value={formik.values.password}
              onChange={formik.handleChange}
              className={formik.errors.password ? "with-error" : ""}
            />
          </div>
          <br />
          <div className="input-container">
            {formik.errors.confirmation &&
              <label className="error">{formik.errors.confirmation}</label>
            }
            {!formik.errors.confirmation && formik.values.confirmation &&
              <label className="simple-label">Password confirmation *</label>            
            }
            <input
              name="confirmation"
              type="password"
              placeholder="Retype your password..."
              value={formik.values.confirmation}
              onChange={formik.handleChange}
              className={formik.errors.confirmation ? "with-error" : ""}
            />
          </div>
          <br />
          <Button type="submit" variant="outlined">
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
