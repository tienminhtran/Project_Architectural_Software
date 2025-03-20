import React, { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
// Này  dùng để móc API lấy danh sách category
import useCategories from "../../../hooks/useCategorie"; 

import ReactPaginate from "react-paginate";

const CategoryPage = () => {
    const navigate = useNavigate();
  
  // State để quản lý bộ lọc và danh sách danh mục
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  // Gọi API lấy danh sách category theo phân trang
  const { categories_paging, deleteCategory } = useCategories(currentPage, pageSize);
  const { data, isLoading, isError, error } = categories_paging;
  const categories = data?.values || [];

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Xử lý tìm kiếm và lọc theo trạng thái
  const filteredCategories = categories.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || (category === "Activate" && item.active) || (category === "Disable" && !item.active))
    );
  });

  // Hàm xử lý khi chuyển trang
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Hàm chọn từng hàng
  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  // Hàm chọn tất cả hàng
  const handleSelectAll = () => {
    if (selectedRows.length === filteredCategories.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredCategories.map((item) => item.id));
    }
  };


  // Hàm xóa danh mục
  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(categoryId);
    }
  };

  // Hàm cập nhật tìm kiếm
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };

  // Hàm cập nhật trạng thái danh mục
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(0);
  };

  //Thay đổi trong phần xử lý sự kiện khi nhấn nút toggle bộ lọc:
  const handleToggleFilters = () => {
    if (showFilters) {
      setSearch("");  // Reset ô tìm kiếm
      setCategory(""); // Reset trạng thái lọc
    }
    setShowFilters(!showFilters);
  };

    // Chuyển hướng đến trang tạo Category và truyền dữ liệu Category qua state
  // Để thực hiện việc cập nhật Category
  const handleNavigate = (category) => {
    navigate('/common/AddCategoryPage', {state: {category}});
  }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header d-flex justify-content-between align-items-center">
        <div className="page-title">
          <h3>Product Category List</h3>
          <p>View/Search Category</p>
        </div>
        <div className="header-action">
          <Link
            to="/common/AddCategoryPage"
            className="btn btn-warning text-white fw-bold rounded px-4 py-2 text-decoration-none"
          >
            Create Category
          </Link>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="filter-container">
        <button className="filter-toggle" onClick={handleToggleFilters}>
          {showFilters ? "✖" : "🔍 Filters"}
        </button>

        {showFilters && (
          <div className="filters">
            <input
              type="text"
              placeholder="Search name or description"
              value={search}
              onChange={handleSearch}
            />
            <select value={category} onChange={handleCategoryChange}>
              <option value="">Choose Active Status</option>
              <option value="Activate">Activate</option>
              <option value="Disable">Disable</option>
            </select>
          </div>
        )}
      </div>

      {/* Bảng danh sách danh mục */}
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === filteredCategories.length}
                onChange={handleSelectAll}
                className="form-check-input"
              />
            </th>
            <th>Category Name</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  onChange={() => handleSelectRow(item.id)}
                  className="form-check-input"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.active ? "✅ Active" : "❌ Disabled"}</td>
              <td className="action">
                <div className="d-flex gap-3">
                  <BsPencil className="text-secondary fs-5" role="button" onClick={() => handleNavigate(item)} />
                  <BsTrash className="text-danger fs-5" role="button" onClick={() => handleDelete(item.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={data.totalPages}
        onPageChange={handlePageChange} // Hàm xử lý khi chuyển trang
        containerClassName={"pagination d-flex justify-content-end"} // Class của thẻ div bao bọc phân trang
        pageClassName={"page-item"} // Class của thẻ li của mỗi trang
        pageLinkClassName={"page-link"} // Class của thẻ a của mỗi trang
        previousClassName={"page-item"} // Class của thẻ li của nút Previous
        previousLinkClassName={"page-link"} // Class của thẻ a của nút Previous
        nextClassName={"page-item"} // Class của thẻ li của nút Next
        nextLinkClassName={"page-link"} // Class của thẻ a của nút Next
        breakClassName={"page-item"} 
        breakLinkClassName={"page-link"}
        activeClassName={"active"} // Class của trang hiện tại
      />
    </div>
  );
};

export default CategoryPage;
