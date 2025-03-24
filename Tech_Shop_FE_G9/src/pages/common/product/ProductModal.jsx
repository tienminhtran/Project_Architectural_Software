import React from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import "../../../assets/css/ProductModal.css"

const ProductModal = ({ show, onHide, product }) => {
  if (!product) return null;


  
  

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">{product.productName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Carousel hình ảnh sản phẩm */}
        <Carousel className="product-carousel">
          {product.images.map((img, index) => (
            <Carousel.Item key={index}>
              <img className="d-block mx-auto product-image" src={img} alt={`Slide ${index}`} />
              <img className="d-block mx-auto product-image" src={`/public/images/${product.images[0]}`} alt={`Slide ${index}`} />
  
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Thông tin sản phẩm */}
        <div className="product-info mt-4">
          <p><strong>Mô tả:</strong> {product.description}</p>
          <div className="info-grid">
            <p><strong>Giá:</strong> {product.price.toLocaleString()} VND</p>
            <p><strong>Tồn kho:</strong> {product.stockQuantity}</p>
            <p><strong>CPU:</strong> {product.cpu}</p>
            <p><strong>RAM:</strong> {product.ram}</p>
            <p><strong>Card đồ họa:</strong> {product.graphicCard}</p>
            <p><strong>Màn hình:</strong> {product.monitor}</p>
            <p><strong>Hệ điều hành:</strong> {product.os}</p>
            <p><strong>Pin:</strong> {product.battery}</p>
            <p><strong>Cổng kết nối:</strong> {product.port}</p>
            <p><strong>Trọng lượng:</strong> {product.weight} kg</p>
            <p><strong>Bảo hành:</strong> {product.warranty}</p>
            <p><strong>Camera trước:</strong> {product.frontCamera}</p>
            <p><strong>Camera sau:</strong> {product.rearCamera}</p>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
