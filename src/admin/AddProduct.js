import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getAllCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    descreption: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    descreption,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  // we are using this for loading the details from database...
  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          descreption: "",
          price: "",
          photo: "",
          stock: "",
          category: "",
          loading: false,
          createdProduct: data.name,
        });
        setTimeout(() => {
          setValues({ ...values, getRedirect: true });
        }, 1000);
      }
    });
  };

  const redirectAfterSuccess = () => {
    if (getRedirect) {
      return <Redirect to="/admin/dashboard" />;
    }
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} created Successfully. </h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        <h4>{error}</h4>
      </div>
    );
  };

  const addProductForm = () => {
    return (
      <div className="row my-2">
        <div className="col-md-6 offset-sm-3">
          <form className="signInForm">
            {successMessage()}
            {errorMessage()}
            <h3 className="text-center">Add Product</h3>
            <div className="form-group">
              <input
                id="myFile"
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                placeholder="Category"
                onChange={handleChange("category")}
                value={category}
              >
                <option>Select</option>
                {categories &&
                  categories.map((cate, index) => {
                    return (
                      <option key={index} value={cate._id}>
                        {cate.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("name")}
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={name}
              />
            </div>
            <div className="form-group">
              <textarea
                onChange={handleChange("descreption")}
                rows="1"
                type="text"
                className="form-control"
                placeholder="Description"
                value={descreption}
              />
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("price")}
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
              />
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("stock")}
                type="number"
                className="form-control"
                placeholder="Stock"
                value={stock}
              />
            </div>
            <button
              onClick={onSubmit}
              type="button"
              className="submitBtn btn btn-block mb-2"
            >
              Create Product
            </button>
            <p className="text-center btnBelowTxt">
              <Link to="/admin/dashboard">Go Back</Link>
            </p>
          </form>
        </div>
      </div>
    );
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

  return (
    <Base>
      {loadingMessage()}
      {addProductForm()}
      {redirectAfterSuccess()}
    </Base>
  );
};

export default AddProduct;
