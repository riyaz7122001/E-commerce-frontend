import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  // const [getRedirect, setGetRedirect] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setSuccess(false);
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  // const redirectAfterSuccess = () => {
  //   if (getRedirect) {
  //     return <Redirect to="/admin/categories" />;
  //   }
  // };

  const successMessage = () => {
    if (success) {
      return (
        <h6 className="text-success text-center mb-4">
          Category Created Successfully !
        </h6>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <h5 className="text-danger text-center mb-4">
          Failed To Create Category !
        </h5>
      );
    }
  };

  const addCategoryForm = () => {
    return (
      <div className="row my-2">
        <div className="col-md-6 offset-sm-3">
          <form className="signInForm">
            {successMessage()}
            {errorMessage()}
            <h3 className="text-center">Add Category</h3>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="For Ex. Summer"
                value={name}
                onChange={handleChange}
              />
            </div>
            <button
              onClick={onSubmit}
              type="button"
              className="submitBtn btn btn-block"
            >
              Create Category
            </button>
            <p className="text-center btnBelowTxt">
              <Link to="/admin/dashboard">Go Back</Link>
            </p>
          </form>
        </div>
      </div>
    );
  };

  return <Base>{addCategoryForm()}</Base>;
};

export default AddCategory;
