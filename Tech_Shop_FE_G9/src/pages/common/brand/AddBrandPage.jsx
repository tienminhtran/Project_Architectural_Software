import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import "../../../assets/css/AddBrandPage.css";
import useBrandData from "../../../hooks/useBrandData";

function AddBrandPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const initialState = {
        id: null,
        name: "",
        active: true,
    };

    const brandFromLocation = location.state?.brand || initialState;

    const [brand, setBrand] = useState(() =>
        brandFromLocation.id ? brandFromLocation : initialState
    );

    const [selectedFiles, setSelectedFiles] = useState([]);
    const formRef = useRef(null);

    const { createBrand, updateBrand } = useBrandData();

    //  Load hình ảnh khi cập nhật
    useEffect(() => {
        if (brandFromLocation && brandFromLocation.images?.length > 0) {
            const imagePath = brandFromLocation.images.map((image) => {
                if (image.startsWith("http")) {
                    return {
                        url: image,
                        name: image.split("/").pop(),
                    };
                } else {
                    return {
                        url: `/uploads/${image}`, // tùy cấu hình backend
                        name: image,
                    };
                }
            });
            setSelectedFiles(imagePath);
        }
    }, [brandFromLocation]);

    //  Xử lý input (name, checkbox)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBrand((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    //  Xử lý chọn ảnh
    const handleImageChange = (e) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files).map((file) => ({
            file,
            url: URL.createObjectURL(file),
            name: file.name,
        }));
        setSelectedFiles((prev) => [...prev, ...files]);
    };

    // Reset form
    const handleReset = () => {
        if (brand.id) {
            navigate("/common/BrandPage");
        } else {
            setBrand(initialState);
            setSelectedFiles([]);
            if (formRef.current) formRef.current.reset();
        }
    };

    //  Xử lý gửi form
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        const brandPayload = {
            id: brand.id || null,
            name: brand.name,
            active: brand.active,
        };

        formData.append(
            "brand",
            new Blob([JSON.stringify(brandPayload)], {
                type: "application/json",
            })
        );

        selectedFiles.forEach((fileObj) => {
            if (fileObj.file) {
                formData.append("brandImg", fileObj.file);
            }
        });

        if (brand.id) {
            updateBrand({ formData, id: brand.id });
        } else {
            createBrand({ formData });
        }

        handleReset();
    };

    //  Xóa ảnh khỏi danh sách đã chọn
    const handleRemoveFile = (index) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="add-brand-container">
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="form-group">
                    <label>Brand Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter brand name"
                        value={brand.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Upload ảnh */}
                <div className="upload-area">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        id="file-upload"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="file-upload" className="upload-label">
                        <FaCloudUploadAlt size={50} color="#FFA500" />
                        <p>Click to upload files</p>
                    </label>
                </div>

                {/* Preview ảnh */}
                <div className="preview-container">
                    {selectedFiles.map((fileObj, index) => (
                        <div key={index} className="preview-card">
                            <img
                                src={fileObj.url}
                                alt={fileObj.name}
                                className="preview-image"
                            />
                            <p>{fileObj.name}</p>
                            <button
                                className="remove-btn"
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Checkbox Active */}
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="active"
                            checked={brand.active}
                            onChange={handleChange}
                        />
                        Active
                    </label>
                </div>

                <div className="form-buttons">
                    <button className="submit-btn" type="submit">
                        {brand.id ? "Update Brand" : "Add Brand"}
                    </button>
                    <button
                        className="cancel-btn"
                        type="button"
                        onClick={handleReset}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddBrandPage;
