import React, { useState } from "react";
import "/src/assets/css/AddCategoryPage.css";
const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Category: ${categoryName}\nDescription: ${description}`);
  };

  return (
    <div className="add-category-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group-sub-can"> 
          <div className="button-group">
            <button type="submit" className="submit-btn">Submit</button>
            {/* <button type="submit" className="submit-btn">Cancel</button> */}
          </div>
          <div className="button-group1">
            <button type="submit" className="submit-btn">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;
