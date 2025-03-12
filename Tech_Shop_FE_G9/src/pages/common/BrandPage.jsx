import React, { useState } from "react";
import "/src/assets/css/CommonBrandPage.css";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useBrandData from "../../hooks/useBrandData";

const BrandPage = () => {

  const { brandAll } = useBrandData();
  const brands = brandAll.data?.response || [];


  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );
  


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
    if (selectedRows.length === brands.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(brands.map((brand) => brand.id));
    }
  };

  return (
    <div className="brand-page">
      <h2>Product Brand List</h2>
      <p>View/Search product Brand</p>

      <div className="button-add-remove">
        <button className="add-button">
          <Link to="/common/AddBrandPage">Add Brand</Link>
        </button>
        <button className="dele-button">
          <Link to="">Remove Brand</Link>
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
                checked={selectedRows.length === brands.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>Brand Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand) => (
              <tr key={brand.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(brand.id)}
                    onChange={() => handleSelectRow(brand.id)}
                  />
                </td>
                <td>
                  <img src={brand.brandImg} alt={brand.name} />
                  {brand.name}
                </td>
                <td className="action">
                  <button>
                    <FaPen />
                  </button>
                  <button>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", fontWeight: "bold", padding: "10px" }}>
                <img
                  src="../../../public/images/icon/khong-tim-thay.png"
                  alt="not-found"
                  style={{ width: "20%", height: "20%" }}
                />
                {/* Không tìm thấy thương hiệu nào */}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BrandPage;