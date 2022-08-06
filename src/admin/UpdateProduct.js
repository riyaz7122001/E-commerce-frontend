import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import {
  getAllCategories,
  updateProduct,
  getProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
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
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        getAllCategories().then((cate) => {
          if (cate.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              name: data.name,
              descreption: data.descreption,
              price: data.price,
              categories: cate,
              category: data.category._id,
              stock: data.stock,
              formData: new FormData(),
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
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
      }
    );
  };

  const redirectAfterSuccess = () => {
    if (getRedirect) {
      return <Redirect to="/admin/products" />;
    }
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: createdProduct ? "" : "none" }}
      >
        {createdProduct} updated Successfully.
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        Error in Updating {createdProduct}{" "}
      </div>
    );
  };

  const updateProductForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <form className="signInForm">
            {successMessage()}
            {errorMessage()}
            <h3 className="text-center">Update Product</h3>
            <div className="form-group">
              <input onChange={handleChange("photo")} type="file" id="myFile" />
              {/* <input type="file" name="file" id="file" className="inputfile" />
              <label for="file">Choose a file</label> */}
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
                  categories.map((category, index) => {
                    return (
                      <option key={index} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-group">
              <textarea
                rows="1"
                type="text"
                className="form-control"
                placeholder="Description"
                value={descreption}
                onChange={handleChange("descreption")}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
                onChange={handleChange("price")}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Stock"
                value={stock}
                onChange={handleChange("stock")}
              />
            </div>
            <button
              onClick={onSubmit}
              type="button"
              className="submitBtn btn btn-block"
            >
              Update Product
            </button>
            <p className="text-center btnBelowTxt">
              <Link to="/admin/products">Go Back</Link>
            </p>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base>
      {updateProductForm()}
      {redirectAfterSuccess()}
    </Base>
  );
};

export default UpdateProduct;
