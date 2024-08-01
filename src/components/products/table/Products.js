import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Col,
  Table,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import CustomNavbar from "../../navbar/CustomNavbar";

import {
  handleSort,
  handleSearch,
  handleClick,
  handlePageChange,
  renderPageNumbers,
} from "../../../helpers/productHelpers";

import "./Products.scss";

const ProductList = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <>
      <CustomNavbar />
      <div className="container vh-100 d-flex flex-column justify-content-center">
        <Col md={12}>
          <h1>List of products</h1>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) =>
                handleSearch(e, products, setSearchTerm, setFilteredProducts)
              }
            />
            <button className="button" variant="none" onClick={() => navigate("/products/create")}>
              Add Product
            </button>
          </InputGroup>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th
                  onClick={() =>
                    handleSort(
                      "title",
                      filteredProducts,
                      sortOrder,
                      setFilteredProducts,
                      setSortOrder
                    )
                  }
                >
                  Name
                </th>
                <th
                  onClick={() =>
                    handleSort(
                      "price",
                      filteredProducts,
                      sortOrder,
                      setFilteredProducts,
                      setSortOrder
                    )
                  }
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => handleClick(product.id, navigate)}
                >
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="justify-content-end">
            {currentPage > 1 && (
              <Pagination.Prev
                onClick={() =>
                  handlePageChange(currentPage - 1, setCurrentPage)
                }
              />
            )}
            {renderPageNumbers(totalPages, currentPage, (pageNumber) =>
              handlePageChange(pageNumber, setCurrentPage)
            )}
            {currentPage < totalPages && (
              <Pagination.Next
                onClick={() =>
                  handlePageChange(currentPage + 1, setCurrentPage)
                }
              />
            )}
          </Pagination>
        </Col>
      </div>
    </>
  );
};

export default ProductList;
