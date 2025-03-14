import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BsPencil, BsTrash, BsSearch } from "react-icons/bs";
import useVoucher from "../../hooks/useVoucher";
import ReactPaginate from "react-paginate";

const VoucherPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const {vouchers_paging} = useVoucher(currentPage, pageSize);

  const { data, isLoading, isError, error } = vouchers_paging;
  console.log(data);
  const vouchers = data.values || [];

  if (isLoading) return <p>Loading vouchers...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

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

  return (
    <div className="page-wrapper">
      <div class="page-header d-flex justify-content-between align-items-center">
        <div class="page-title">
          <h3>Product Voucher list</h3>
          <p>View/Search Voucher</p>
        </div>
        <div class="header-action">
          <Link
            to="/common/formVoucher"
            className="btn btn-warning text-white fw-bold rounded px-4 py-2 text-decoration-none"
          >
            Create voucher
          </Link>
        </div>
      </div>

      <div class="page-content">
        <div className="input-group w-25">
          <span className="input-group-text">
            <BsSearch />
          </span>
          <input type="text" className="form-control" placeholder="Search..." />
        </div>

        <table class="table table-hover table-responsive">
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
                    <Link to={`/common/formVoucher/${voucher.id}`}>
                      <BsPencil className="text-secondary fs-5" role="button" />
                    </Link>
              
                    <BsTrash className="text-danger fs-5" role="button" />
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
