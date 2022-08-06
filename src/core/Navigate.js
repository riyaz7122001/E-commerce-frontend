import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#FFFFFF", background: "rgba(0.1, 0.1, 0.1, 0.15)" };
  } else {
    return { color: "#d1d1d1" };
  }
};

function Navigate({ history }) {
  return (
    <div>
      <div className="navbar navbar-expand-lg">
        <div className="container">
          <span className="navbar-brand mb-0 h1 text-white">ReactJS Store</span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i
              className="material-icons"
              style={{ fontSize: "30px", color: "white" }}
            >
              menu
            </i>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                stylecurrentTab(history, "/")}
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                stylecurrentTab(history, "/cart")}
                className="nav-link"
                to="/cart"
              >
                Cart
              </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link"
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  A.Dashboard
                </Link>
              </li>
            )}
            {/* for not authenticated users */}
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/signup")}
                    className="nav-link"
                    to="/signup"
                  >
                    SignUp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/signin")}
                    className="nav-link"
                    to="/signin"
                  >
                    SignIn
                  </Link>
                </li>
              </Fragment>
            )}
            {/* for isAuthenticated */}
            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Signout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Navigate);
