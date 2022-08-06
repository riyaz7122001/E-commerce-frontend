import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, Redirect } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [getRedirect, setGetRedirect] = useState(false);

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

    updateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
          setTimeout(() => {
            setGetRedirect(true);
          }, 1000);
        }
      }
    );
  };

  const redirectAfterSuccess = () => {
    if (getRedirect) {
      return <Redirect to="/admin/categories" />;
    }
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(false);
        setName("");
      } else {
        setName(data.name);
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return (
        <h6 className="text-success text-center mb-4">
          Category Updated Successfully !
        </h6>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <h5 className="text-danger text-center mb-4">
          Failed To Update Category !
        </h5>
      );
    }
  };

  const updateCategoryForm = () => {
    return (
      <div className="row my-2">
        <div className="col-md-6 offset-sm-3">
          <form className="signInForm">
            {successMessage()}
            {errorMessage()}
            <h3 className="text-center">Update Category</h3>
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
              Update Category
            </button>
            <p className="text-center btnBelowTxt">
              <Link to="/admin/categories">Go Back</Link>
            </p>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base>
      {updateCategoryForm()}
      {redirectAfterSuccess()}
    </Base>
  );
};

export default UpdateCategory;
