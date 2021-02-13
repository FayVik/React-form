import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./logo.png";

const Form = () => {
  const intialValues = {
    fullName: "",
    email: "",
    password: "",
    isChecked: false,
  };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = () => {
    console.log(formValues);
  };

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //input change handler
  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setFormValues({ ...formValues, isChecked: checked });
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
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

    if (!values.fullName) {
      errors.fullName = "Cannot be blank";
    } else if (values.fullName.length < 4) {
      errors.fullName = "Name is must be morethan 4 letters";
    }

    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Cannot be blank";
    } else if (!reg.test(values.password)) {
      errors.password = "Minimum eight characters, at least one letter, one number and one special characters";
    }

    if (!values.isChecked === true) {
      errors.isChecked = "Checkbox can not be empty";
    }

    if(Object.keys(errors).length == 0){
          setSuccess(true);
        }
        return errors;
      };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div className="container-fluid">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-lg-6 col-sm-12 col-md-6 img d-none d-lg-block d-md-block d-xl-none d-xl-block">
          <h1 className="text-center text-white fade-white">
            <img src={logo} alt="Epsolun" />
          </h1>
        </div>
        <div className="col-lg-6 col-sm-12 col-md-6 form-col">
          <div className="row justify-content-center ">
            <div className="col-12 col-md-10 col-lg-8">
              {!success && (
                <form onSubmit={handleSubmit} className="" noValidate>
                  <h2 className="text-center font-weigth-bold">Sign Up</h2>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formValues.FullName}
                      onChange={handleChange}
                      className={formErrors.fullName && "input-error"}
                      placeholder="John Doe"
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
                      placeholder="example@mail.com"
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
                      placeholder="enter password"
                    />
                    {formErrors.password && (
                      <p className="error text-danger">{formErrors.password}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        name="remember"
                        className="custom-control-input"
                        id="customCheck1"
                        onChange={handleCheckBoxChange}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Remember me
                      </label>
                      {formErrors.isChecked && (
                        <p className="error text-danger">
                          {formErrors.isChecked}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-12 col-12 text-center">
                      <button type="submit" className="btn btn-primary w-100">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
              )}
              {success && (
                <div className="" style={{ minHeight: "50vh" }}>
                  {Object.keys(formErrors).length === 0 && isSubmitting && (
                    <div class="alert alert-success" role="alert">
                      <h5 className="alert-heading">
                        <strong className="">Well done!</strong> Sign up successful.
                      </h5>
                      
                      <p className="pt-4">
                        Welcome  <strong> {formValues.fullName}</strong>
                      </p>
                    </div>
                    // <p className="success-msg text-success shadow text-center card p-5">
                    //   Form submitted successfully
                    // </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
