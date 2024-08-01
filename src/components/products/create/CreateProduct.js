import React from "react";
import { useForm } from "react-hook-form";
import { useProductForm } from "../../../hooks/useProductForm";

import { Form, Col, Alert } from "react-bootstrap";
import CustomNavbar from "../../navbar/CustomNavbar";
import BackButton from "../../BackButton/BackButton";

import styles from "./CreateProduct.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductForm = ({ products, onProductAdded }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const { onSubmit, error } = useProductForm(products, onProductAdded);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="container vh-100 d-flex flex-column justify-content-center">
        <Col md={12}>
          <BackButton />
          <h1>Add new product</h1>
          <Form onSubmit={handleSubmit((data) => onSubmit(data, setValue))}>
            <Form.Group className="mt-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title", { required: "Title is required" })}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                {...register("description", {
                  required: "Description is required",
                })}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter price"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Price must be positive" },
                })}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="d-flex justify-content-end">
              <button
                className={styles.button}
                variant="none"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add product"}
              </button>
            </Form.Group>
          </Form>
        </Col>
      </div>
    </>
  );
};

export default ProductForm;
