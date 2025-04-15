import React, { useState, useEffect, useMemo } from "react";
import { BsTrash, BsEye, BsSearch } from "react-icons/bs";
import { useDebounce } from "../../../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getTotalAmountByOrderId,
    deleteOrder as deleteOrderService,
} from "../../../services/orderService";
import useOrder from "../../../hooks/useOrder";
import "../../../assets/css/OrderPage.css";

const OrderPage = () => {
    const [pageNo, setPageNo] = useState(0);
    const pageSize = 10;
    const [selectedRows, setSelectedRows] = useState([]);
    const [orderSearch, setOrderSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("");
    const debouncedSearchTerm = useDebounce(orderSearch, 500);
    const [totalAmounts, setTotalAmounts] = useState({});

    const isSearchMode = debouncedSearchTerm.trim().length > 0;
    const isFilterByStatus = selectedStatus !== "";
    const isFilterByPayment = selectedPayment !== "";

    const {
        orders_paging,
        search_paging,
        filterOrderByStatus,
        filterOrderByPayment,
    } = useOrder(
        pageNo,
        pageSize,
        debouncedSearchTerm,
        selectedStatus,
        selectedPayment
    );

    const { data, isError, error, isFetching } = isSearchMode
        ? search_paging
        : isFilterByStatus
        ? filterOrderByStatus
        : isFilterByPayment
        ? filterOrderByPayment
        : orders_paging;

    const orders = useMemo(() => data?.values || [], [data]);

    const queryClient = useQueryClient();
    const deleteOrderMutation = useMutation({
        mutationFn: deleteOrderService,
        onSuccess: () => {
            queryClient.invalidateQueries(["getAllOrder_Paging"]);
            alert("Delete order successfully!!");
        },
        onError: (error) => {
            console.error("Delete order failed:", error);
            alert("Delete order failed. Please try again!");
        },
    });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            deleteOrderMutation.mutate(id);
        }
    };

    const handlePageChange = (selectedItem) => {
        setPageNo(selectedItem.selected);
    };

    useEffect(() => {
        const fetchTotalAmounts = async () => {
            const amounts = {};
            for (const order of orders) {
                try {
                    const amount = await getTotalAmountByOrderId(order.id);
                    amounts[order.id] = amount.response;
                } catch {
                    amounts[order.id] = 0;
                }
            }
            setTotalAmounts(amounts);
        };
        if (orders.length > 0) {
            fetchTotalAmounts();
        }
    }, [orders]);

    const handleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id)
                ? prev.filter((rowId) => rowId !== id)
                : [...prev, id]
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
            {/* Header */}
            <div className="page-header d-flex justify-content-between align-items-center">
                <div className="page-title">
                    <h3>Order List</h3>
                    <p>View/Search Orders</p>
                </div>
            </div>

            <div className="page-content">
                {/* Search + Filter */}
                <div className="d-flex gap-3 align-items-center mb-3">
                    {/* Search box */}
                    <div className="input-group w-25">
                        <span className="input-group-text">
                            <BsSearch />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            name="search"
                            placeholder="Search..."
                            value={orderSearch}
                            onChange={(e) => {
                                setOrderSearch(e.target.value);
                                setPageNo(0);
                            }}
                        />
                    </div>

                    {/* Filter: Status */}
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

                    {/* Filter: Payment */}
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
                        <option value="BANKING">VNPay</option>
                        <option value="PAYPAL">PayPal</option>
                    </select>
                </div>

                {/* Table */}
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedRows.length === orders.length
                                    }
                                    onChange={handleSelectAll}
                                    className="form-check-input"
                                />
                            </th>
                            <th>Customer</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isFetching ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id} className="align-middle">
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(
                                                order.id
                                            )}
                                            onChange={() =>
                                                handleSelectRow(order.id)
                                            }
                                            className="form-check-input"
                                        />
                                    </td>
                                    <td>{order.user.firstname}</td>
                                    <td className="text-end text-success fw-semibold">
                                        {totalAmounts[order.id] != null
                                            ? `${totalAmounts[
                                                  order.id
                                              ].toLocaleString("vi-VN")} VND`
                                            : "Loading..."}
                                    </td>
                                    <td className="text-center">
                                        <span
                                            className={`p-1 rounded rounded-3 text-light status-${order.status.toLowerCase()}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.payment.paymentName}</td>
                                    <td>
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString()}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-3">
                                            <BsEye
                                                className="text-secondary fs-5"
                                                role="button"
                                            />
                                            <BsTrash
                                                onClick={() =>
                                                    handleDelete(order.id)
                                                }
                                                className="text-danger fs-5"
                                                role="button"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {data?.totalPages > 1 && (
                    <ReactPaginate
                        previousLabel={"←"}
                        nextLabel={"→"}
                        breakLabel={"..."}
                        pageCount={data.totalPages}
                        onPageChange={handlePageChange}
                        containerClassName={
                            "pagination d-flex justify-content-end mt-3"
                        }
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
        </div>
    );
};

export default OrderPage;
