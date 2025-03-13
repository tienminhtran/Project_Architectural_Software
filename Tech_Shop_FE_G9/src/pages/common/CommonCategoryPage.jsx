import React, { useState } from "react";
// import "/src/assets/css/CommonCategoryPage.css";
import { BsPencil, BsTrash, BsSearch } from "react-icons/bs";

import { Link } from "react-router-dom";

const CategoryPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const categorys = [
    { id: 1, name: "Computer" },
    { id: 2, name: "Phone" },
    { id: 3, name: "Accessory" },
  ];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === categorys.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(categorys.map((item) => item.id));
    }
  };

  return (
    <div className="page-wrapper">
      <div class="page-header d-flex justify-content-between align-items-center">
        <div class="page-title">
          <h3>Product Category list</h3>
          <p>View/Search Category</p>
        </div>
        <div class="header-action">
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
        <button className="filter-toggle" onClick={toggleFilters}>
          {showFilters ? "✖" : "🔍 Filter"}
        </button>

        {showFilters && (
          <div className="filters">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose Category</option>
              <option value="laptops">Laptops</option>
              <option value="accessories">Accessories</option>
            </select>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Choose Sub Category</option>
              <option value="gaming">Gaming</option>
              <option value="business">Business</option>
            </select>
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

      {/* Bảng dữ liệu */}
      <table className="table table-responsive ">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === categorys.length}
                onChange={handleSelectAll}
                className="form-check-input"
              />
            </th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categorys.map((item) => (
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
              <td className="action">
                <div className="d-flex gap-3">
                  <BsPencil className="text-secondary fs-5" role="button" />
                  <BsTrash className="text-danger fs-5" role="button" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryPage;
