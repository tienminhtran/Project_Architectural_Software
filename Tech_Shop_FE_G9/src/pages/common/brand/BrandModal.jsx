import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../../../assets/css/BrandModal.css";

const BrandModal = ({ show, onHide, brand }) => {
    const getFileNameSplit = (fileName) => {
        if (!fileName) return null;
        return fileName.substring(fileName.indexOf("_") + 1);
    };

    if (!brand) return null;

    return (
        <Modal show={show} onHide={onHide} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center">
                    {brand.name}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center">
                {/* Hình ảnh thương hiệu */}
                {brand.brandImg &&
                    (brand.brandImg?.startsWith("http") ? (
                        <img
                            src={brand.brandImg}
                            alt={brand.name}
                            width="100"
                            height="100"
                            className="rounded"
                        />
                    ) : (
                        <img
                            src={`/images/brand/${getFileNameSplit(
                                brand.brandImg
                            )}`}
                            alt={brand.name}
                            width="100"
                            height="100"
                            className="rounded"
                        />
                    ))}

                {/* Mô tả thương hiệu (nếu có) */}
                <div className="brand-info text-start mt-3">
                    <p>
                        <strong>Mô tả:</strong>{" "}
                        {brand.description || "Chưa có mô tả."}
                    </p>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BrandModal;
