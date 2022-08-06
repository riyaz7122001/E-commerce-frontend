import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="list-group" id="list-tab" role="tablist">
        <Link
          className="list-group-item list-group-item-action active"
          to="/admin/create/product"
        >
          Create Product
        </Link>
        <Link
          className="list-group-item list-group-item-action active"
          to="/admin/products"
        >
          Manage Products
        </Link>
        <Link
          className="list-group-item list-group-item-action active"
          to="/admin/create/category"
        >
          Create Categories
        </Link>
        <Link
          className="list-group-item list-group-item-action active"
          to="/admin/categories"
        >
          Manage Categories
        </Link>
        <Link
          className="list-group-item list-group-item-action active"
          to="/admin/orders"
        >
          Manage Orders
        </Link>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className="card mt-2">
        <h5 className="card-header">Personal Information</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-info mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-info mr-2">Email Id:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-info mr-2">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to Admin area"
      description="Manage all of your products here"
    >
      <h3
        className="adminPage-heading text-center py-3 mt-4"
        style={{ color: "#646464" }}
      >
        Welcome To Admin Panel
      </h3>
      <div className="row p-4" style={{ background: "rgba(3, 169, 244, 0.7)" }}>
        <div className="col-sm-4">{adminLeftSide()}</div>
        <div className="col-sm-8">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
