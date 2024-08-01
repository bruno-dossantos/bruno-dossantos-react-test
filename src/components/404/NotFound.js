import React from "react";
import { Col } from "react-bootstrap";
import BackButton from "../BackButton/BackButton";

import bg from "../../assets/images/404-pic.png";

import "bootstrap/dist/css/bootstrap.min.css";

function NotFound() {
  return (
    <div className="w-100 m-0 vh-100 d-flex justify-content-center align-items-center flex-column flex-md-row">
      <Col
        md={4}
        className="p-0 d-flex justify-content-center d-none d-md-flex"
      >
        <img
          src={bg}
          alt="Background"
          draggable="false"
          className="img-fluid"
        />
      </Col>
      <Col
        md={4}
        className="d-flex align-items-center justify-content-center flex-column text-center"
      >
        <h1 className="mb-3">Aww.. Don't Cry</h1>
        <h2 className="mb-3">It's just a 404 Error!</h2>
        <h2 className="mb-4">
          Sorry, this page isn't available. You can go back or explore our site.
        </h2>
        <BackButton />
      </Col>
    </div>
  );
}

export default NotFound;
