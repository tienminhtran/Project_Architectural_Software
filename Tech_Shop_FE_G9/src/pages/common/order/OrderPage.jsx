import React, { useState, useEffect, useMemo } from "react";
import { BsTrash, BsEye, BsSearch } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTotalAmountByOrderId,
  deleteOrder as deleteOrderService,
} from "../../../services/orderService";
import useOrder from "../../../hooks/useOrder";
import "../../../assets/css/OrderPage.css";
import OrderDetailModal from "./OrderDetailModal";
import Swal from "sweetalert2";

const OrderPage = () => {
  const [pageNo, setPageNo] = useState(0);
  const pageSize = 10;
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [totalAmounts, setTotalAmounts] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const isFilterAll =
    firstname || phoneNumber || selectedStatus || selectedPayment;

  const { orders_paging, filterOrderAllPaging } = useOrder(
    pageNo,
    pageSize,
    selectedStatus,
    selectedPayment,
    firstname,
    phoneNumber
  );

  const { data, isError, error, isFetching } = isFilterAll
    ? filterOrderAllPaging
    : orders_paging;

  const orders = useMemo(() => data?.values || [], [data]);

  const queryClient = useQueryClient();
  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrderService,
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllOrder_Paging"]);
    },
    onError: (error) => {
      console.error("Delete order failed:", error);
      alert("Delete order failed. Please try again!");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Bạn sẽ không thể khôi phục lại đơn hàng này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Vâng!",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrderMutation.mutate(id);
        setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
      }
    });
  };

  const handlePageChange = (selectedItem) => {
    setPageNo(selectedItem.selected);
  };

  useEffect(() => {
    const fetchTotalAmounts = async () => {
      const amountPromises = orders.map((order) =>
        getTotalAmountByOrderId(order.id)
          .then((res) => ({ id: order.id, amount: res.response }))
          .catch(() => ({ id: order.id, amount: 0 }))
      );

      const results = await Promise.all(amountPromises);
      const amounts = {};
      results.forEach(({ id, amount }) => {
        amounts[id] = amount;
      });
      setTotalAmounts(amounts);
    };

    if (orders.length > 0) {
      fetchTotalAmounts();
    }
  }, [orders]);

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === orders.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(orders.map((item) => item.id));
    }
  };

  if (isError && !data) return <p>Error: {error.message}</p>;

  return (
    <div className="page-wrapper">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div className="page-title">
          <h3>Order List</h3>
          <p>View/Search Orders</p>
        </div>
      </div>

      <div className="page-content">
        <div className="d-flex gap-3 align-items-center mb-3 flex-wrap">
          <div className="input-group w-25">
            <span className="input-group-text">
              <BsSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
                setPageNo(0);
              }}
            />
          </div>

          <div className="input-group w-25">
            <span className="input-group-text">
              <BsSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setPageNo(0);
              }}
            />
          </div>

          <select
            className="form-select w-auto"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPageNo(0);
            }}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="REFUND">Refund</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            className="form-select w-auto"
            value={selectedPayment}
            onChange={(e) => {
              setSelectedPayment(e.target.value);
              setPageNo(0);
            }}
          >
            <option value="">All Payments</option>
            <option value="COD">COD</option>
            <option value="BANK">Bank</option>
            <option value="PAYPAL">PayPal</option>
          </select>

          <button
            className="btn-clear btn-secondary btn-sm"
            onClick={() => {
              setFirstname("");
              setPhoneNumber("");
              setSelectedStatus("");
              setSelectedPayment("");
              setPageNo(0);
            }}
          >
            Clear Filter
          </button>
        </div>

        <table className="table table-hover table-responsive">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === orders.length && orders.length > 0
                  }
                  onChange={handleSelectAll}
                  className="form-check-input"
                />
              </th>
              <th>Customer</th>
              <th>Total Price</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <tr>
                <td colSpan="8" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="align-middle">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(order.id)}
                      onChange={() => handleSelectRow(order.id)}
                      className="form-check-input"
                    />
                  </td>
                  <td>{order.user.firstname}</td>
                  <td className="text-start text-success fw-semibold">
                    {totalAmounts[order.id] != null
                      ? `${totalAmounts[order.id].toLocaleString("vi-VN")} VND`
                      : "Loading..."}
                  </td>
                  <td>{order.user.phone_number}</td>
                  <td>
                    <span
                      className={`p-1 rounded rounded-3 text-light status-${order.status.toLowerCase()} text-center`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{order.payment.paymentName}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <BsEye
                        className="text-secondary fs-5"
                        role="button"
                        onClick={() => handleViewOrder(order)}
                      />
                      <BsTrash
                        onClick={() => handleDelete(order.id)}
                        className="text-danger fs-5"
                        role="button"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center"></td>
              </tr>
            )}
          </tbody>
        </table>

        {data?.totalPages > 1 && (
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={data.totalPages}
            onPageChange={handlePageChange}
            containerClassName={"pagination d-flex justify-content-end mt-3"}
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
        )}
      </div>

      <OrderDetailModal
        show={showModal}
        onHide={handleCloseModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderPage;
