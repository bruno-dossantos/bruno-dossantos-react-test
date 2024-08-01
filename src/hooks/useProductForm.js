import { useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/constants";

export const useProductForm = (products, onProductAdded) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const generateProductId = (products) => products.length + 1;

  const resetForm = (setValue) => {
    setValue("title", "");
    setValue("description", "");
    setValue("price", "");
    setValue("image", "");
  };

  const handleResponse = async (response, newProduct, setValue) => {
    if (response.ok) {
      notification.success({
        message: "Product created successfully!",
        description: "Your product has been created successfully",
      });
      resetForm(setValue);
      onProductAdded(newProduct);
      navigate("/products");
    } else {
      notification.error({
        message: "Error Saving Product",
        description: "Please check the details and try again.",
      });
    }
  };

  const handleError = () => {
    notification.error({
      message: "Error Saving Product",
      description: "Please check the details and try again.",
    });
  };

  const onSubmit = async (data, setValue) => {
    setError("");

    const { title, description, price, image } = data;

    if (!title || !description || !price || !image) {
      setError("All fields are required");
      return;
    }

    const newProduct = {
      id: generateProductId(products),
      title,
      description,
      price,
      image,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      await handleResponse(response, newProduct, setValue);
    } catch (err) {
      handleError();
    }
  };

  return { onSubmit, error };
};
