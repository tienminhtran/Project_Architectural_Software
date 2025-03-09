import React, { useState } from "react";
import "/src/assets/css/AddBrandPage.css"; // Import CSS riêng


const AddBrandPage = () => {
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState(null);

  const handleImageUpload = (event) => {
    setBrandImage(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Brand: ${brandName}`);
  };

  return (
    <div className="add-brand-container">
      <h2>Product Add Brand</h2>
      <p>Create new product brand</p>

      <form onSubmit={handleSubmit} className="brand-form">
        {/* Tên thương hiệu */}
        <div className="form-group">
          <label>Brand Name</label>
          <input
            type="text"
            placeholder="Brand name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>

        {/* Upload hình ảnh thương hiệu */}
        <div className="form-group">
          <label>Brand Image</label>
          <div className="upload-box">
            <input type="file" onChange={handleImageUpload} />
            {brandImage ? <p>{brandImage.name}</p> : <p>Drag and drop a file to upload</p>}
          </div>
        </div>

        {/* Nút Submit và Cancel */}
        <div className="button-group">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddBrandPage;
