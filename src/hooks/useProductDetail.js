import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { notification } from "antd";

const useProductDetail = (products, setProducts) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });

  useEffect(() => {
    const numericId = Number(id);
    const foundProduct = products.find((p) => p.id === numericId);
    setProduct(foundProduct);
    if (foundProduct) {
      setEditProduct({
        title: foundProduct.title,
        price: foundProduct.price,
        description: foundProduct.description,
        category: foundProduct.category,
        image: foundProduct.image,
        rating: foundProduct.rating || { rate: "", count: "" },
      });
    }
  }, [id, products]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      rating: {
        ...prev.rating,
        [name]: value,
      },
    }));
  };

  const handleSaveChanges = () => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...editProduct, id: product.id } : p
      )
    );
    notification.success({
      message: "Product updated",
      description: "The product has been successfully updated.",
    });
    handleClose();
  };

  const handleDelete = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== product.id)
    );
    notification.success({
      message: "Product Deleted",
      description: "The product has been successfully deleted.",
    });
    navigate("/products");
  };

  return {
    product,
    showModal,
    editProduct,
    handleShow,
    handleClose,
    handleInputChange,
    handleRatingChange,
    handleSaveChanges,
    handleDelete,
  };
};

export default useProductDetail;
