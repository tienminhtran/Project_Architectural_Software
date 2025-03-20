import React, { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
// Này  dùng để móc API lấy danh sách category
import useCategories from "../../hooks/useCategorie"; 
import ReactPaginate from "react-paginate";

const CategoryPage = () => {
  // Khai báo mấy cái biến state để xử lý dữ liệu
  const [showFilters, setShowFilters] = useState(false); // Cái này để ẩn/hiện bộ lọc
  const [search, setSearch] = useState(""); 
  const [category, setCategory] = useState(""); // Biến để chọn category
  const [subCategory, setSubCategory] = useState(""); // Biến để chọn sub-category
  const [brand, setBrand] = useState(""); // Biến chọn brand
  const [selectedRows, setSelectedRows] = useState([]); // Cái này lưu mấy hàng đang được chọn
  const [currentPage, setCurrentPage] = useState(0); // Lưu số trang hiện tại
  const pageSize = 10; // Số item trên mỗi trang

  // Gọi API lấy danh sách category theo phân trang
  const { categories_paging, deleteCategory } = useCategories(currentPage, pageSize);
  const { data, isLoading, isError, error } = categories_paging;
  const categories = data?.values || []; // Lấy danh sách category từ API

  if (isLoading) return <p>Loading categories...</p>; // Đang tải thì hiện chữ này
  if (isError) return <p>Error: {error.message}</p>; // Nếu lỗi thì báo lỗi

  // Hàm xử lý khi bấm qua trang mới
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
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
    if (selectedRows.length === categories.length) {
      setSelectedRows([]); // Nếu đã chọn hết rồi thì bỏ chọn
    } else {
      setSelectedRows(categories.map((item) => item.id)); // Chọn hết luôn
    }
  };

  
 /**
  * Xử lý khi bấm vào nút sửa
  * @param {*} voucher 
  * xóa
  */
  const handleDelete = (categoryid) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteCategory(categoryid);
    }


  };
  return (
    <div className="page-wrapper">
      {/* Header của trang */}
      <div className="page-header d-flex justify-content-between align-items-center">
        <div className="page-title">
          <h3>Product Category List</h3>
          <p>View/Search Category</p>
        </div>
        <div className="header-action">
          {/* Nút để qua trang thêm category mới */}
          <Link
            to="/common/AddCategoryPage"
            className="btn btn-warning text-white fw-bold rounded px-4 py-2 text-decoration-none"
          >
            Create Category
          </Link>
        </div>
      </div>

      {/* Bộ lọc danh mục */}
      <div className="filter-container">
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? "✖" : "🔍 Filter"}
        </button>

        {showFilters && (
          <div className="filters">
            {/* Ô nhập tìm kiếm */}
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Chọn category */}
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              <option value="laptops">Laptops</option>
              <option value="accessories">Accessories</option>
            </select>
            {/* Chọn sub-category */}
            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
              <option value="">Choose Sub Category</option>
              <option value="gaming">Gaming</option>
              <option value="business">Business</option>
            </select>
            {/* Chọn brand */}
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Choose Brand</option>
              <option value="dell">Dell</option>
              <option value="hp">HP</option>
              <option value="acer">Acer</option>
              <option value="lenovo">Lenovo</option>
            </select>
          </div>
        )}
      </div>

      {/* Bảng danh sách category */}
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>
              {/* Ô checkbox chọn tất cả */}
              <input
                type="checkbox"
                checked={selectedRows.length === categories.length}
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
          {categories.map((item) => (
            <tr key={item.id}>
              <td>
                {/* Ô checkbox chọn từng hàng */}
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.id)}
                  onChange={() => handleSelectRow(item.id)}
                  className="form-check-input"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.active ? "✅" : "❌"}</td>
              <td className="action">
                <div className="d-flex gap-3">
                  {/* Nút sửa */}
                  <BsPencil className="text-secondary fs-5" role="button" />
                  {/* Nút xóa */}
                  <BsTrash className="text-danger fs-5" role="button" onClick={() => handleDelete(item.id)}/>
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
        pageCount={data.totalPages} // Tổng số trang từ API trả về
        onPageChange={handlePageChange} // Khi bấm qua trang khác
        containerClassName={"pagination d-flex justify-content-end"} // Class của div bọc phân trang
        pageClassName={"page-item"} // Class của từng trang
        pageLinkClassName={"page-link"} // Class của thẻ a từng trang
        previousClassName={"page-item"} // Class của nút Previous
        previousLinkClassName={"page-link"} // Class của thẻ a của Previous
        nextClassName={"page-item"} // Class của nút Next
        nextLinkClassName={"page-link"} // Class của thẻ a của Next
        breakClassName={"page-item"} 
        breakLinkClassName={"page-link"}
        activeClassName={"active"} // Class của trang hiện tại
      />
    </div>
  );
};

export default CategoryPage;
