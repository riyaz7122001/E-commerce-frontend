import React from "react";
import "../styles.css";
import Base from "./Base";
import { API } from "../backend";
const Home = () => {
  console.log(API);
  return (
    <Base title="HomePage" description="Welcome to Gift Store">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
      </div>
    </Base>
  );
};

export default Home;
