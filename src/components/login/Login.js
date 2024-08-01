import React from "react";
import { Row, Col } from "react-bootstrap";
import LoginForm from "./LoginForm";
import LoginImage from "./LoginImage";

import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  return (
    <Row className="w-100 m-0 d-flex align-items-center">
      <Col md={6}>
        <LoginForm />
      </Col>
      <Col md={6} className="p-0 d-none d-md-block">
        <LoginImage />
      </Col>
    </Row>
  );
}

export default Login;
