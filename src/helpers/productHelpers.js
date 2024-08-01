import { Pagination } from "react-bootstrap";

export const handleSort = (
  key,
  filteredProducts,
  sortOrder,
  setFilteredProducts,
  setSortOrder
) => {
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
  setFilteredProducts(sortedProducts);
  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
};

export const handleSearch = (
  e,
  products,
  setSearchTerm,
  setFilteredProducts
) => {
  setSearchTerm(e.target.value);
  const filtered = products.filter((product) =>
    product.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setFilteredProducts(filtered);
};

export const handleClick = (id, navigate) => {
  navigate(`/products/${id}`);
};

export const handlePageChange = (pageNumber, setCurrentPage) => {
  setCurrentPage(pageNumber);
};

export const renderPageNumbers = (
  totalPages,
  currentPage,
  handlePageChange
) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers
    .slice(Math.max(0, currentPage - 3), currentPage + 2)
    .map((number) => (
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    ));
};
