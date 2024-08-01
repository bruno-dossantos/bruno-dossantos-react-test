import React from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/products");
  };

  return (
    <button onClick={handleBack} className="p-0 btn">
      <FontAwesomeIcon icon={faChevronLeft} /> Back
    </button>
  );
};

export default BackButton;
