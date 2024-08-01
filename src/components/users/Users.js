import React from "react";
import { Form, Col } from "react-bootstrap";
import CustomNavbar from "../navbar/CustomNavbar";
import { notification } from "antd";
import BackButton from "../BackButton/BackButton";

import {
  getUserFromSession,
  saveUserToSession,
} from "../../services/authService";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "../../components/products/create/CreateProduct.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const UserSettings = () => {
  const initialUsername = getUserFromSession();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: initialUsername,
    },
  });

  const onSubmit = (data) => {
    saveUserToSession(data.username);
    notification.success({ message: "Username updated successfully!" });
    navigate("/products");
  };

  return (
    <>
      <CustomNavbar />
      <div className="container vh-100 d-flex flex-column justify-content-center">
        <Col md={12}>
          <BackButton />
          <h1>User Settings</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <Form.Text className="text-danger">
                  {errors.username.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
              <button className={styles.button} variant="none" type="submit">
                Save
              </button>
            </Form.Group>
          </Form>
        </Col>
      </div>
    </>
  );
};

export default UserSettings;
