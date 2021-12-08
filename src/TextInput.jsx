import React, { useState, useEffect } from 'react';
import './App.css';
import { useField } from "formik";

const hasError = (meta, submitted) => {
  return meta.error && (meta.touched || submitted) 
}

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [submitted, setSubmitted] = useState(Boolean(props.submitted));

  useEffect(() => {
    setSubmitted(Boolean(props.submitted));
  }, [props.submitted])

  useEffect(() => {
    props.setErrors(Boolean(meta.error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta.error])

  const { setErrors, ...otherProps } = props;

  return (
    <div className="input-container">
      {hasError(meta, submitted) &&
        <label htmlFor={field.name} className="error">{meta.error}</label>            
      }
      {!meta.error && meta.value &&
        <label className="simple-label">{`${field.name.slice(0, 1).toUpperCase().concat(field.name.slice(1))} *`}</label>            
      }
      <input
        {...field}
        {...otherProps}
        className={hasError(meta, submitted) ? "with-error" : ""}
      />
    </div>
  )
}

export default TextInput;