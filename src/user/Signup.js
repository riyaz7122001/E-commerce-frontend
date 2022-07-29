import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (e) => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });

    // here we are importing the signup from index.js and passing the values..
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(() => {
        console.log("Error in Signup..");
      });
  };

  const faultMessage = () => {
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left my-2">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>;
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left my-2">
          <div
            className="alert alert-danger"
            style={{ display: error ? error : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left my-2">
          <div
            className="alert alert-warning"
            style={{ display: success ? "" : "none" }}
          >
            New Account was created Successfully! Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };
  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left my-2">
          <form action="">
            <div className="form-group">
              <label htmlFor="Name" className="text-light">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                autoCapitalize="false"
                autoCorrect="false"
                autoComplete="false"
                onChange={handleChange}
                name="name"
                value={name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Name" className="text-light">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                autoCapitalize="false"
                autoCorrect="false"
                autoComplete="false"
                onChange={handleChange}
                name="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Name" className="text-light">
                Pasword
              </label>
              <input
                className="form-control"
                type="password"
                onChange={handleChange}
                name="password"
                value={password}
              />
            </div>
            <button
              className="btn btn-success btn-blockc my-3"
              onClick={onSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup Page" description="A page for user to sign up!!">
      {successMessage()}
      {faultMessage()}
      {errorMessage()}
      {signupForm()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;
