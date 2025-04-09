import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa"; // Import upload icon
import "../../../assets/css/AddBrandPage.css"; // Import CSS file
import useBrandData from "../../../hooks/useBrandData";

function AddBrandPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const initialState = {
        name: "",
        active: true,
    };

    const brandFromLocation = location.state?.brand;

    const normalizeInitialState = (brand) => {
        if (!brand || brand.id) return initialState;
        return {
            ...brand,
            brandId: brand.id || "",
            brandName: brand.name || "",
            active: brand.active || true,
        };
    };

    const { createBrand, updateBrand } = useBrandData();
    const [brand, setBrand] = useState(
        normalizeInitialState(brandFromLocation)
    );
    const [selectedFiles, setSelectedFiles] = useState([]);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({ active: false });

    // Handle image selection
    const handleImageChange = (e) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files).map((file) => ({
            file,
            url: URL.createObjectURL(file),
            name: file.name,
        }));
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleSlitFileName = (fileName) => {
        if (!fileName) return null;
        return fileName.replace(/^[^_]+_[^_]+_/, "");
    };

    useEffect(() => {
        if (brandFromLocation) {
            let imagePath;
            if (
                brandFromLocation.images &&
                brandFromLocation.images.length > 0
            ) {
                imagePath = brandFromLocation.images.map((image) => {
                    if (image.startsWith("http")) {
                        return { url: image, name: image.split("/").pop() };
                    } else {
                        return { url: handleSlitFileName(image), name: image };
                    }
                });
            }
            setSelectedFiles(imagePath || []);
        }
    }, [brandFromLocation]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrand({ ...brand, [name]: value });
    };

    const handleReset = () => {
        if (brand.id) {
            navigate("/common/brands");
        } else {
            if (formRef.current) {
                formRef.current.reset();
            }
            setBrand(initialState);
            setSelectedFiles([]);
            setFormData({ active: false });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Ensure the correct mapping of fields
        const updatedBrand = {
            id: brand.brandId || null,
            name: brand.name || "",
            active: brand.active,
        };

        formData.append(
            "brand",
            new Blob([JSON.stringify(updatedBrand)], {
                type: "application/json",
            })
        );

        // Add files to FormData
        if (selectedFiles.length > 0) {
            selectedFiles.forEach((fileObj) => {
                if (fileObj.file) {
                    formData.append("brandImg", fileObj.file); // Ensure field name matches server expectations
                }
            });
        }

        // Send API request
        if (brand.id) {
            updateBrand({ formData, id: brand.id });
            navigate("/common/brands");
        } else {
            createBrand({ formData });
        }
        handleReset();
    };
    const handleRemoveFile = (index) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index)
        );
    };

    const handleChangeCheckbox = (e) => {
        const { name, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    return (
        <div className="add-brand-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Brand Name:</label>
                    <input
                        type="text"
                        placeholder="Enter brand name"
                        name="name"
                        value={brand.brandName}
                        onChange={handleChange}
                    />
                </div>
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
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="active"
                            checked={formData.active}
                            onChange={handleChangeCheckbox}
                        />
                        Active
                    </label>
                </div>
                <button className="submit-btn" type="submit">
                    Add Brand
                </button>
            </form>
        </div>
    );
}

export default AddBrandPage;
