import React, { useState } from "react";
import "/src/assets/css/AddCategoryPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import useCategories from "../../hooks/useCategorie";

const AddCategoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialState = { 
    name: "", 
    description: "",
    active: true // Mặc định là true
  };
  const categories = location.state?.category || initialState;
  
  const [formData, setFormData] = useState(categories);
  const { createCategory, updateCategory } = useCategories(0, 1);

  // Xử lý thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  // Xử lý reset form
  const handleReset = () => {
    if (categories.id) {
      navigate("/common/CategoryPage");
    } else {
      setFormData(initialState);
    }
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (categories.id) {
      updateCategory(formData);
    } else {
      createCategory(formData);
    }
    handleReset();
  };

  return (
    <div className="add-category-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            name="name"
            placeholder="Category name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* 🔹 Checkbox Active */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        <div className="form-group-sub-can">
          <div className="button-group">
            <button type="submit" className="submit-btn">Submit</button>
          </div>
          <div className="button-group1">
            <button type="button" className="submit-btn" onClick={handleReset}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;
