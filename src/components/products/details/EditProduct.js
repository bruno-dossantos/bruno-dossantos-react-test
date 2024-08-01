import React from "react";
import { Modal, Form } from "react-bootstrap";

import styles from "./Details.module.scss";

const EditProductModal = ({
  show,
  handleClose,
  product,
  handleInputChange,
  handleRatingChange,
  handleSaveChanges,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={product.image}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formRatingRate">
            <Form.Label>Rating Rate</Form.Label>
            <Form.Control
              type="number"
              name="rate"
              value={product.rating.rate}
              onChange={handleRatingChange}
            />
          </Form.Group>

          <Form.Group controlId="formRatingCount">
            <Form.Label>Rating Count</Form.Label>
            <Form.Control
              type="number"
              name="count"
              value={product.rating.count}
              onChange={handleRatingChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className={styles.secondaryButton}
          variant="none"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className={styles.primaryButton}
          variant="none"
          onClick={handleSaveChanges}
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
