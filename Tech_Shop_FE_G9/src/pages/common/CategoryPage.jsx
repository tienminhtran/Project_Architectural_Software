import React, { useState } from "react";
import "/src/assets/css/CommonCategoryPage.css";
import { FaPen, FaTrashAlt } from "react-icons/fa";
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
    <div className="category-page">
      <h2>Product Category list</h2>
      <p>View/Search product Category</p>

      {/* Nút thêm */}
      <div className="button">
        <button className="add-button">
          <Link to="/common/AddCategoryPage">Add Category</Link>
        </button>
        <button className="remove-button">
          <Link to="">Remove Category</Link>
        </button>
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
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              <option value="laptops">Laptops</option>
              <option value="accessories">Accessories</option>
            </select>
            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
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
      <table className="brand-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === categorys.length}
                onChange={handleSelectAll}
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
                />
              </td>
              <td>{item.name}</td>
              <td className="action">
                <button>
                  <FaPen /> 
                </button>
                <button>
                  <FaTrashAlt /> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryPage;
