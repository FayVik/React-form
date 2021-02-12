import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Form = () => {
  const intialValues = { fullName: "", email: "", password: "" };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(formValues);
    
  };

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(!values.fullName){
      errors.fullName = "Cannot be blank";
    }else if (values.password.length < 4) {
      errors.fullName = "Name is must be morethan 4 letters"
    }

    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="row justify-content-center align-items-center" noValidate style={{minHeight: "100vh"}}>
        <div className="col-lg-6">
          <h3>Sign Up</h3>
              {Object.keys(formErrors).length === 0 && isSubmitting && (
            <p className="success-msg text-success pt-2 fixed">Form submitted successfully</p>
          )}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formValues.FullName}
              onChange={handleChange}
              className={formErrors.fullName && "input-error"}
            />
            {formErrors.fullName && (
              <p className="error text-danger">{formErrors.fullName}</p>
            )}
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
              className={formErrors.email && "input-error"}
            />
            {formErrors.email && (
              <p className="error text-danger">{formErrors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
              className={formErrors.password && "input-error"}
            />
            {formErrors.password && (
              <p className="error text-danger">{formErrors.password}</p>
            )}
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
