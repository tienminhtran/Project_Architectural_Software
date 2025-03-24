import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BsPencil, BsTrash, BsSearch } from "react-icons/bs";
import useVoucher from "../../../hooks/useVoucher";
import ReactPaginate from "react-paginate";
import { useDebounce } from "../../../hooks/useDebounce"; // Thư viện giúp giảm tải khi gõ nhanh và tối ưu hóa hiệu suất khi tìm kiếm

const VoucherPage = () => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);

  const [voucherSearch, setVoucherSearch] = useState(""); // State lưu giá trị tìm kiếm voucher

  const debouncedSearchTerm = useDebounce(voucherSearch, 500); // Chỉ gọi API sau 500ms nếu không nhập tiếp vào ô tìm kiếm

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const { vouchers_paging, deleteVoucher, search_paging } = useVoucher(
    currentPage,
    pageSize,
    voucherSearch
  );

  const { data, isLoading, isError, error } = debouncedSearchTerm
    ? search_paging
    : vouchers_paging; // Nếu có giá trị tìm kiếm thì gọi API search, ngược lại gọi API lấy danh sách voucher
  console.log(data);

  const vouchers_response = useMemo(() => data?.values || [], [data]); // dùng useMemo để tránh việc render lại nếu data không thay đổi

  const [vouchers, setVouchers] = useState([]);

  /**
   * Xử lý pageSize thay đổi khi chuyển trang
   * @param {*} selected
   */
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  // handel select row in table voucher
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === vouchers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(vouchers.map((item) => item.id));
    }
  };

  // Chuyển hướng đến trang tạo voucher và truyền dữ liệu voucher qua state
  // Để thực hiện việc cập nhật voucher
  const handleNavigate = (voucher) => {
    navigate("/common/formVoucher", { state: { voucher } });
  };

  // Xử lý xóa voucher
  const handleDelete = (voucherid) => {
    if (window.confirm("Are you sure you want to delete?")) {
      // selectedRows.forEach((id) => {
      //   deleteVoucher(id);
      // });
      // setSelectedRows([]);

      deleteVoucher(voucherid);
    }
  };

  // Xử lý hiển thị dữ liệu voucher khi có dữ liệu trả về từ API
  useEffect(() => {
    console.log("Fetched Vouchers:", vouchers_response);
    if (Array.isArray(vouchers_response)) {
      setVouchers(vouchers_response);
    }
  }, [vouchers_response]);

  if (isLoading) return <p>Loading vouchers...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="page-wrapper">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div className="page-title">
          <h3>Product Voucher list</h3>
          <p>View/Search Voucher</p>
        </div>
        <div className="header-action">
          <Link
            to="/common/formVoucher"
            className="btn btn-warning text-white fw-bold rounded px-4 py-2 text-decoration-none"
          >
            Create voucher
          </Link>
        </div>
      </div>

      <div className="page-content">
        <div className="input-group w-25">
          <span className="input-group-text">
            <BsSearch />
          </span>
          <input
            type="text"
            className="form-control"
            name="search"
            placeholder="Search..."
            value={voucherSearch}
            onChange={(e) => setVoucherSearch(e.target.value)}
          />
        </div>

        <table className="table table-hover table-responsive">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedRows.length === vouchers.length}
                  onChange={handleSelectAll}
                  className="form-check-input"
                />
              </th>
              <th>Voucher Code</th>
              <th>Value</th>
              <th>Quantity</th>
              <th>Expiration Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.id} className="align-middle">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(voucher.id)}
                    onChange={() => handleSelectRow(voucher.id)}
                    className="form-check-input"
                  />
                </td>
                <td>{voucher.name}</td>
                <td>{voucher.value}</td>
                <td>{voucher.quantity}</td>
                <td>{voucher.expiredDate}</td>
                <td>
                  <div className="d-flex gap-3">
                    <BsPencil
                      className="text-secondary fs-5"
                      role="button"
                      onClick={() => handleNavigate(voucher)}
                    />

                    <BsTrash
                      className="text-danger fs-5"
                      role="button"
                      onClick={() => handleDelete(voucher.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={data.totalPages}
        onPageChange={handlePageChange} // Hàm xử lý khi chuyển trang
        containerClassName={"pagination d-flex justify-content-end"} // Class của thẻ div bao bọc phân trang
        pageClassName={"page-item"} // Class của thẻ li của mỗi trang
        pageLinkClassName={"page-link"} // Class của thẻ a của mỗi trang
        previousClassName={"page-item"} // Class của thẻ li của nút Previous
        previousLinkClassName={"page-link"} // Class của thẻ a của nút Previous
        nextClassName={"page-item"} // Class của thẻ li của nút Next
        nextLinkClassName={"page-link"} // Class của thẻ a của nút Next
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"} // Class của trang hiện tại
      />
    </div>
  );
};

export default VoucherPage;
