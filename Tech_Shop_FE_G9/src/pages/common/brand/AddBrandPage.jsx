import React, { useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import { FaCloudUploadAlt } from "react-icons/fa"; // Import icon tải lên
import "/src/assets/css/AddBrandPage.css"; // Import file CSS riêng

function AddBrandPage() {
  const [openPicker] = useDrivePicker();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [uploadedLinks, setUploadedLinks] = useState([]); // Lưu link ảnh sau khi submit

  const handleOpenPicker = () => {
    openPicker({
      clientId: "504226894370-0gj8g6ithfnifelmb02c6n7eff14s07k.apps.googleusercontent.com",
      developerKey: "AIzaSyAMeHAi0nJjbM05_dWFYUdEIeHUUufVwNU",
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        } else if (data.docs) {
          console.log(data);
          setSelectedFiles(data.docs); // Lưu file đã chọn
        }
      },
    });
  };

  const handleAddBrand = () => {
    if (!brandName) {
      alert("Please enter a brand name");
      return;
    }
    if (selectedFiles.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    // Cập nhật state để hiển thị link ảnh sau khi submit
    setUploadedLinks(selectedFiles.map((file) => file.url));

    alert(`Brand: ${brandName} added successfully!`);

    setBrandName("");
    setSelectedFiles([]);
  };

  return (
    <div className="add-brand-container">
      <h2>Add Brand</h2>
      <p>Create a new brand with images</p>

      <div className="form-group">
        <label>Brand Name:</label>
        <input
          type="text"
          placeholder="Enter brand name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Image Brand:</label>
      </div>
      {/* Vùng kéo-thả tải ảnh */}
      <div className="upload-area" onClick={handleOpenPicker}>
        <FaCloudUploadAlt size={50} color="#FFA500" />
        <p>Drag and drop a file to upload</p>
      </div>

      {/* Nút tải lên (chỉ có icon) */}
      <button className="upload-btn" onClick={handleOpenPicker}>
        <FaCloudUploadAlt size={24} />
      </button>

      {/* Hiển thị ảnh đã tải lên */}
      <div className="preview-container">
        {selectedFiles.map((file, index) => (
          <div key={index} className="preview-card">
            <img src={file.url} alt={file.name} className="preview-image" />
            <p>{file.name}</p>
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={handleAddBrand}>
        Add Brand
      </button>

      {/* Hiển thị danh sách link ảnh sau khi submit */}
      {uploadedLinks.length > 0 && (
        <div className="uploaded-links">
          <h3>Uploaded Image Links:</h3>
          {uploadedLinks.map((link, index) => (
            <p key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddBrandPage;
