import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteProd = (productId) => {
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          preload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base>
      <h3
        className="adminPage-heading text-center py-3 mt-4"
        style={{ color: "#646464" }}
      >
        Products List
      </h3>
      <table className="table table-striped">
        <thead
          style={{
            background: "#03a9f4",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          <tr>
            <th scope="col">Product Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <th scope="row">{product.name}</th>
                <th scope="row">
                  <Link
                    to={`/admin/product/update/${product._id}`}
                    className="btn btn-sm btn-warning text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Update
                  </Link>
                </th>
                <th scope="row">
                  <button
                    onClick={() => {
                      deleteProd(product._id);
                    }}
                    className="btn btn-sm btn-danger text-white"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="container">
        <div className="row">
          <div className="text-center col-sm-12">
            <Link
              to={`/admin/dashboard`}
              className="btn btn-sm text-white"
              style={{ background: "#03a9f4", textDecoration: "none" }}
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
