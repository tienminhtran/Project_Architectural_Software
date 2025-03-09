import React, { useState } from "react";
import "/src/assets/css/CommonBrandPage.css"; // Import CSS nếu có
import { FaPen , FaTrashAlt  } from "react-icons/fa";

const BrandPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="brand-page">
      <h2>Product Brand List</h2>
      <p>View/Search product Brand</p>
      {/* Nút thêm */}
      <div className="add-button">
        <button>Add Brand</button>
      </div>

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

      <table className="brand-table">
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="/public/images/avatar/avtdefault.jpg" alt="Dell"/> Dell</td>
            <td>
                <button><FaPen/> Edit</button> 
                <button><FaTrashAlt />Delete</button>
            </td>
          </tr>
          <tr>
            <td><img src="/public/images/avatar/avtdefault.jpg" alt="Dell"/> Dell</td>
            <td>
                <button><FaPen/> Edit</button> 
                <button><FaTrashAlt />Delete</button>
            </td>
          </tr>
          <tr>
            <td><img src="/public/images/avatar/avtdefault.jpg" alt="Dell"/> Dell</td>
            <td>
                <button><FaPen/> Edit</button> 
                <button><FaTrashAlt />Delete</button>
            </td>
          </tr>
          <tr>
            <td><img src="/public/images/avatar/avtdefault.jpg" alt="Dell"/> Dell</td>
            <td>
                <button><FaPen/> Edit</button> 
                <button><FaTrashAlt />Delete</button>
            </td>
          </tr>
          <tr>
            <td><img src="/public/images/avatar/avtdefault.jpg" alt="Dell"/> Dell</td>
            <td>
                <button><FaPen/> Edit</button> 
                <button><FaTrashAlt />Delete</button>
            </td>
          </tr>
          <tr>
            <td><img src="/public/images/avatar/avtdefault.jpg" alt="Dell"/> Dell</td>
            <td>
                <button><FaPen/> Edit</button> 
                <button><FaTrashAlt />Delete</button>
            </td>
          </tr>
          <tr>
            <td><img src="/public/images/avatar/avtdefault.jpg" alt="Dell"/> Dell</td>
            <td>
                <button><FaPen/> Edit</button> 
                <button><FaTrashAlt />Delete</button>
            </td>
          </tr>
          <tr>
            <td><img src="/public/images/avatar/avtdefault.jpg" alt="Dell"/> Dell</td>
            <td>
                <button><FaPen/> Edit</button> 
                <button><FaTrashAlt />Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BrandPage;
