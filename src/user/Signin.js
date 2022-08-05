import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  // const history = useHistory();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();
  const handleChange = (e) => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // it is coming from auth /helper
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          // when there is a callback in middleware
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(() => {
        console.log("Signin Request Failed");
      });
  };
  // if user is admin return to admin dashboard else user dashboard..
  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left my-2">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {" "}
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left my-2">
          <form action="">
            <div className="form-group">
              {" "}
              <label htmlFor="Name" className="text-light">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              {" "}
              <label htmlFor="Name" className="text-light">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <button
              onClick={onSubmit}
              className="btn btn-success btn-block my-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin Page" description="A page for user to sign in!!">
      <h3 className="text-white text-center">Sign in </h3>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};
export default Signin;
