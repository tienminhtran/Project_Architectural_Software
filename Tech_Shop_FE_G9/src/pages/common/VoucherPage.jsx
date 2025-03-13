import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BsPencil, BsTrash } from "react-icons/bs";

const VoucherPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const vouchers = [
    { id: 1, name: "Voucher 1" },
    { id: 2, name: "Voucher 2 " },
    { id: 3, name: "Voucher 3 " },
  ];

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
          <h3>Product Category list</h3>
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
            <FaSearch />
          </span>
          <input type="text" className="form-control" placeholder="Search..." />
        </div>

        <table class="table table-striped table-hover table-responsive">
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
              <tr key={voucher.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(voucher.id)}
                    onChange={() => handleSelectRow(voucher.id)}
                    className="form-check-input"
                  />
                </td>
                <td>{voucher.name}</td>
                <td>{voucher.name}</td>
                <td>{voucher.name}</td>
                <td>{voucher.name}</td>
                <td>
                  <div className="d-flex gap-3">
                    <BsPencil className="text-secondary fs-5" role="button" />
                    <BsTrash className="text-danger fs-5" role="button" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherPage;
