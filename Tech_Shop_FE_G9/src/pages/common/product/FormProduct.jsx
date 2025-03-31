
import React, { useState } from "react"; 
import { Container, Row, Col, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useBrandData from "../../../hooks/useBrandData";
import useCategorie from "../../../hooks/useCategorie";

import useProduct from "../../../hooks/useProduct";
import "../../../assets/css/FormProduct.css";

const FormProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialState = {
    productName: "",
    price: 0,
    stockQuantity: 0,
    description: "",
    cpu: "",
    ram: "",
    graphicCard: "",
    monitor: "",
    battery: "",
    os: "",
    port: "",
    warranty: "",
    weight: 0,
    frontCamera: "",
    rearCamera: "",
    brandId:"",
    categoryId:"",
    isUrlImage: true
  }
  console.log(location.state?.product);

  const productFromLocation = location.state?.product; // Lấy dữ liệu sản phẩm từ state của location

  //chuẩn hóa dữ liệu ban đầu
  const normalizeInitialState = (product) => {
    if(!product || !product.id) return initialState;

    return  {
      ...product,
      brandId: product.brand.id || "",
      categoryId: product.category.id || "",
      images: product.images || [],

    }
  };
  const { createProduct, updateProduct } = useProduct(0,1); 

  const [product, setProduct] = useState(normalizeInitialState(productFromLocation)); // Khởi tạo giá trị cho form data từ productFromLocation
  
  const [selectedFiles, setSelectedFiles] = useState([]); // Lưu trữ danh sách file ảnh đã chọn
  const formRef = React.useRef(null);

  // Lấy danh sách thương hiệu từ custom hook
  const { brandAll } = useBrandData(); // Lấy danh sách thương hiệu từ custom hook
  const brands = brandAll.data?.response || []; // Nếu không có dữ liệu thì gán giá trị mặc định là mảng rỗng

  // Lấy danh sách danh mục từ custom hook
  const { getCategories_NoPaging } = useCategorie(0,1); // Lấy danh sách danh mục từ custom hook
  const categories = getCategories_NoPaging|| []; // Nếu không có dữ liệu thì gán giá trị mặc định là mảng rỗng
  
  
  // Xu ly chon anh
  const handleImageChange = (e) => {
    if(!e.target.files) return;
    const files = e.target.files;
    
    const filesArray = Array.from(files);
    
    setSelectedFiles(filesArray);
  };
  const handleSlitFileName = (fileName) => {
    if(!fileName) return null;
      return fileName.replace(/^[^_]+_[^_]+_/, ""); 
    }
    
    React.useEffect(() => {
      if(productFromLocation) {
        let imagePath;
        if(productFromLocation.images && productFromLocation.images.length > 0) {
          imagePath = productFromLocation.images.map((image) => {
            if(image.startsWith("http")) {
              return image;
            } else {
              return handleSlitFileName(image);
            }
          })
        } 
        setSelectedFiles(imagePath);
      }
    },[productFromLocation]); // Chỉ chạy khi products.images thay đổi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleReset = () => {
    if(product.id) {
      navigate("/common/products"); // Chuyển hướng về trang danh sách sản phẩm
    } else {

      // Reset giá trị form
      if (formRef.current) {
        formRef.current.reset(); // Reset tất cả input trong form
      }
      
      // Reset state
      setProduct(initialState);
      setSelectedFiles([]);
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if(product.id) {
      
      product.brandId = product.brand.id;
      product.categoryId = product.category.id;

      delete product.images;
      delete product.thumbnail;
      delete product.createdAt;
      delete product.updatedAt;
      delete product.brand;
      delete product.category;
      delete product.ratings
    }

    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    console.log("Product created:");
    console.log(formData);

        // kiem tra xem co chon file hay khong
     if (selectedFiles.length > 0) {  
      console.log("Selected files:", selectedFiles);
        selectedFiles.forEach((file) => {
         formData.append("fileImage", file);  
        });
    }  
    if(product.id) {
      updateProduct({formData: formData, id: product.id});
      
      navigate("/common/products"); // Chuyển hướng về trang danh sách sản phẩm
    } else {

      createProduct({formData: formData});
    }
    handleReset();

  };

  return (
    <div className="ok">
      <div className="page-header">
        <div className="page-title">
          <h3>Form Product</h3>
          <p>Fill in the form to create a new Product</p>
        </div>
      </div>

      <Form  ref={formRef} onSubmit={handleSubmit} >
        <Row>
          {/* Cột 1: Thông tin chung */}
          <Col md={4}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input type="text" name="productName" value={product.productName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Brand</label>
              <select name="brandId" value={product.brandId} onChange={handleChange} className="form-control">
                <option value="">---Select Brand---</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <select name="categoryId" value={product.categoryId } onChange={handleChange} className="form-control">
                <option value="">---Select category---</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea type="text" name="description" value={product.description} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="number" name="price" value={product.price} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Stock Quantity</label>
              <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Rear Camera</label>
              <input type="text" name="rearCamera" value={product.rearCamera} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Operating System (OS)</label>
              <input type="text" name="os" value={product.os} onChange={handleChange} className="form-control" required />
            </div>
          </Col>

          {/* Cột 2: Cấu hình sản phẩm */}
          <Col md={4}>
            <div className="mb-3">
              <label className="form-label">CPU</label>
              <input type="text" name="cpu" value={product.cpu} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">RAM</label>
              <input type="text" name="ram" value={product.ram} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Graphic Card</label>
              <input type="text" name="graphicCard" value={product.graphicCard} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Monitor</label>
              <input type="text" name="monitor" value={product.monitor} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Port</label>
              <input type="text" name="port" value={product.port} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Warranty</label>
              <input type="text" name="warranty" value={product.warranty} onChange={handleChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Weight (kg)</label>
              <input type="number" name="weight" value={product.weight} onChange={handleChange} className="form-control" step="0.1" />
            </div>
            <div className="mb-3">
              <label className="form-label">Battery</label>
              <input type="text" name="battery" value={product.battery} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Front Camera</label>
              <input type="text" name="frontCamera" value={product.frontCamera} onChange={handleChange} className="form-control" required />
            </div>
          </Col>

          {/* Cột 3: Camera + Ảnh */}
          <Col md={4}>
            <div className="mb-3">
              <label className="form-label">Images</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" multiple />
              {selectedFiles && selectedFiles.length > 0 && (
                <div className="mt-2 d-flex flex-wrap">
                  {selectedFiles.map((file, index) => (
                    <img
                      key={index}
                      src={ typeof file === 'string' ? file.startsWith("http") ? file : `/images/product/${handleSlitFileName(file)}` : URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="img-thumbnail"
                      style={{ width: "100px", height: "100px", marginRight: "10px" }}
                    />
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>

        <div className="text-center mt-3">
          <button type="submit" className="submit">Lưu</button>
          <button type="button" className="Cancel" onClick={handleReset}>Hủy</button>
        </div>
      </Form>
    </div>
  );
};

export default FormProduct;
