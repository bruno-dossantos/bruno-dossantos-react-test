import React from "react";
import { Col } from "react-bootstrap";
import CustomNavbar from "../../navbar/CustomNavbar";
import BackButton from "../../BackButton/BackButton";
import EditProductModal from "./EditProduct";

import useProductDetail from "../../../hooks/useProductDetail";

import styles from "./Details.module.scss";

const ProductDetail = ({ products, setProducts }) => {
  const {
    product,
    showModal,
    editProduct,
    handleShow,
    handleClose,
    handleInputChange,
    handleRatingChange,
    handleSaveChanges,
    handleDelete,
  } = useProductDetail(products, setProducts);

  return (
    <>
      <CustomNavbar />
      <div className="container vh-100 d-flex flex-column justify-content-center">
        {product ? (
          <Col xs={12}>
            <BackButton />
            <h1 className="mt-3 mb-3">Product details</h1>
            <div className="card mb-3">
              <div className="row no-gutters">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    draggable="false"
                    className={styles.productImage}
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Price: {product.price}
                      </small>
                    </p>
                    {product.category && (
                      <p className="card-text">
                        <small className="text-muted">
                          Category: {product.category}
                        </small>
                      </p>
                    )}
                    {product.rating && (
                      <p className="card-text">
                        <small className="text-muted">
                          Rating: {product.rating.rate} (Count:{" "}
                          {product.rating.count})
                        </small>
                      </p>
                    )}
                    <div className="d-flex justify-content-end">
                      <button
                        className={styles.secondaryButton}
                        onClick={handleDelete}
                      >
                        Delete product
                      </button>
                      <button
                        className={styles.primaryButton}
                        onClick={handleShow}
                      >
                        Edit details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <EditProductModal
        show={showModal}
        handleClose={handleClose}
        product={editProduct}
        handleInputChange={handleInputChange}
        handleRatingChange={handleRatingChange}
        handleSaveChanges={handleSaveChanges}
      />
    </>
  );
};

export default ProductDetail;
