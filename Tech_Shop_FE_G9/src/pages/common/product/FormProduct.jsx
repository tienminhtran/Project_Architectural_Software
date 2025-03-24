import React, { useState } from "react"; 
import { Container, Row, Col, Form } from "react-bootstrap";
import useProduct from "../../../hooks/useProduct";
import "../../../assets/css/FormProduct.css";

const FrmProduct = () => {
  const { createProduct } = useProduct(0,1); 
    // const [imageName, setImageName] = useState("");
  
  const [selectedFiles, setSelectedFiles] = useState(null);

  const [product, setProduct] = useState({
    name: "",
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
    brandId:"1",
    categoryId:"1",
    isUrlImage: true
  });

  const [preview, setPreview] = useState({
    thumbnail: null,
    images: [null, null],
  });

 
    // Xu ly chon anh
    const handleImageChange = (e) => {
      setSelectedFiles(e.target.files);
    };
  
    // // Xu ly slit file name
    // const getFileNameSplit = (fileName) => {
    //   if(!fileName) return;
    //   setImageName(fileName.replace(/^[^_]+_[^_]+_/, "")); 
    // };

    // // sửa tên file thành file getFileNameSplit
    // React.useEffect(() => {
    //   if(product?.image) {
    //     getFileNameSplit(product.image);
    //   }
    // }, [product.image]);



  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleReset = () => {
    setProduct({
      name: "",
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
      brandId: "1",
      categoryId: "1",
      isUrlImage: true
    });

    setPreview({
      thumbnail: null,
      images: [null],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    console.log("Product created:", formData);
        // kiem tra xem co chon file hay khong
        if (selectedFiles) {
          // append file vao formdata
          formData.append("fileImage", selectedFiles[0]);
        }
    

    createProduct({formData: formData});

  };

  return (
    <div className="ok">
      <div className="page-header">
        <div className="page-title">
          <h3>Form Product</h3>
          <p>Fill in the form to create a new Product</p>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Cột 1: Thông tin chung */}
          <Col md={4}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input type="text" name="name" value={product.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Brand</label>
              <select name="brandId" value={product.brandId} onChange={handleChange} className="form-control">
                <option value="">---Select Brand---</option>
                <option value="1">Apple</option>
                <option value="2">Samsung</option>
                <option value="3">Xiaomi</option>
                <option value="4">Oppo</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <select name="categoryId" value={product.categoryId} onChange={handleChange} className="form-control">
                <option value="">---Select category---</option>
                <option value="1">Smartphone</option>
                <option value="2">Laptop</option>
                <option value="3">Tablet</option>
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
              <label className="form-label">Thumbnail Image</label>
              <input type="file" accept="/public/images/*" onChange={(e) => handleImageChange(e)} className="form-control" />
              {preview.thumbnail && <img src={preview.thumbnail} alt="Thumbnail preview" width="20%" />}
            </div>

            <div className="mb-3">
              <label className="form-label">Extra Image 1</label>
              <input type="file" accept="/public/images/*" onChange={(e) => handleImageChange(e, 0)} className="form-control" />
              {preview.images[0] && <img src={preview.imageName[0]} alt="Extra 1 preview" width="20%" />}
            </div>

  


          </Col>
        </Row>

        <div className="text-center mt-3">
          <button type="submit" className="submit">Lưu</button>
          <button type="button" className="Cancel" onClick={handleReset}>Hủy</button>
        </div>np
      </Form>
    </div>
  );
};

export default FrmProduct;