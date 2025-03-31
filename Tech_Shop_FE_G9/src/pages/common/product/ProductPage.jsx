
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPencil, BsTrash, BsSearch, BsEye } from "react-icons/bs";
import useProduct from "../../../hooks/useProduct";
import ReactPaginate from "react-paginate";
import { useDebounce } from "../../../hooks/useDebounce";
import ProductModal from "./ProductModal"; // Import modal hiển thị chi tiết sản phẩm

const ProductPage = () => {

  const navigate = useNavigate(); // Hook để điều hướng trang
  const [selectedRows, setSelectedRows] = useState([]); // Danh sách các hàng (sản phẩm) được chọn
  const [productSearch, setProductSearch] = useState(""); // Trạng thái của ô tìm kiếm sản phẩm
  const debouncedSearchTerm = useDebounce(productSearch, 500); // Giảm tải số lần tìm kiếm bằng cách debounce
  const [currentPage, setCurrentPage] = useState(0); // Lưu trạng thái trang hiện tại của phân trang
  const pageSize = 10; // Số sản phẩm hiển thị trên mỗi trang

  // Lấy dữ liệu sản phẩm từ custom hook, phân biệt giữa tìm kiếm và danh sách mặc định
  const { products_paging, deleteProduct, search_paging } = useProduct(currentPage, pageSize, productSearch);
const { data, isLoading, isError, error } = 
  debouncedSearchTerm.trim().length > 0 ? search_paging : products_paging;
  
  // Memo hóa dữ liệu sản phẩm để tối ưu hiệu suất
  const products_response = useMemo(() => data?.values || [], [data]);
  const [products, setProducts] = useState([]);

  // Trạng thái cho modal chi tiết sản phẩm
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  

  // Cập nhật danh sách sản phẩm khi dữ liệu từ API thay đổi
  useEffect(() => {
    if (Array.isArray(products_response)) {
      setProducts(products_response);
    }
  }, [products_response]);

   
   // Xu ly slit file name
   const getFileNameSplit = (fileName) => {
    if(!fileName) return null;
    return fileName.replace(/^[^_]+_[^_]+_/, ""); 
  };


  // Xử lý chuyển trang khi người dùng bấm vào số trang
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  // Xử lý chọn một sản phẩm (checkbox)
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Xử lý chọn tất cả sản phẩm
  const handleSelectAll = () => {
    if (selectedRows.length === products.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(products.map((item) => item.id));
    }
  };

  // Chuyển đến trang chỉnh sửa sản phẩm khi bấm vào icon "sửa"
  const handleNavigate = (product) => {
    navigate('/common/formProduct', { state: { product } });
  };

  // Xác nhận và xóa sản phẩm khi bấm vào icon "xoá"
  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteProduct(productId);
    }
  };


  // Mở modal chi tiết sản phẩm
  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Nếu đang tải dữ liệu, hiển thị thông báo "Loading..."
  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="page-wrapper">
      {/* Header của trang */}
      <div className="page-header d-flex justify-content-between align-items-center">
        <div className="page-title">
          <h3>Product List</h3>
          <p>View/Search Products</p>
        </div>
        <div className="header-action">
          {/* Nút thêm sản phẩm */}
          <Link to="/common/formProduct" className="btn btn-warning text-white fw-bold rounded px-4 py-2 text-decoration-none">
            Add Product
          </Link>
        </div>
      </div>

      <div className="page-content">
        {/* Ô tìm kiếm sản phẩm */}
        <div className="input-group w-25">
          <span className="input-group-text">
            <BsSearch />
          </span>
          <input 
            type="text" 
            className="form-control" 
            name="search"
            placeholder="Search..." 
            value={productSearch} 
            onChange={(e) => setProductSearch(e.target.value)} 
          />
        </div>

        {/* Bảng hiển thị danh sách sản phẩm */}
        <table className="table table-hover table-responsive">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={selectedRows.length === products.length} 
                  onChange={handleSelectAll} 
                  className="form-check-input" 
                />
              </th>
              <th>Images</th>
              <th>Name</th>
              <th>Description</th>
              <th>Graphic Card</th>
              <th>OS</th>
              <th>Ports</th>
              <th>Price</th>
              <th>RAM</th>
              <th>Stock</th>
              <th>Warranty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="align-middle">
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(product.id)} 
                    onChange={() => handleSelectRow(product.id)} 
                    className="form-check-input" 
                  />
                </td>
                <td>
                  {/* xử lý https hoặc file toán tử 3 ngoi*/}
                  {product.thumbnail?.startsWith("http") ? (
                    <img src={product.thumbnail} alt={product.name} width="50" height="50" className="rounded" />
                  ) : (
                    <img src={`/images/product/${getFileNameSplit(product.thumbnail)}`} alt={product.name} width="50" height="50" className="rounded" />
                  )}
                </td>
                <td>{product.productName}</td>
                <td>
                  {product.description}
                </td>
                <td>{product.graphicCard}</td>
                <td>{product.os}</td>
                <td>{product.port}</td>
                <td>{product.price.toLocaleString()} VND</td>
                <td>{product.ram}</td>
                <td>{product.stockQuantity}</td>
                <td>{product.warranty}</td>
                <td>
                  <div className="d-flex gap-3">
                    {/* Xem chi tiết sản phẩm */}
                    <BsEye className="text-secondary fs-5" role="button" onClick={() => handleShowModal(product)} />
                    {/* Chỉnh sửa sản phẩm */}
                    <BsPencil className="text-secondary fs-5" role="button" onClick={() => handleNavigate(product)} />
                    {/* Xóa sản phẩm */}
                    <BsTrash className="text-danger fs-5" role="button" onClick={() => handleDelete(product.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={data.totalPages}
        onPageChange={handlePageChange}
        containerClassName={"pagination d-flex justify-content-end"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />

      {/* Modal hiển thị chi tiết sản phẩm */}
      <ProductModal show={showModal} onHide={() => setShowModal(false)} product={selectedProduct} />
    </div>
  );
};

export default ProductPage;

