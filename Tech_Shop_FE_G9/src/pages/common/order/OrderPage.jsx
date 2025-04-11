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
    const debouncedSearchTerm = useDebounce(orderSearch, 500);
    const [totalAmounts, setTotalAmounts] = useState({});

    const { orders_paging, search_paging } = useOrder(
        pageNo,
        pageSize,
        orderSearch
    );
    const { data, isLoading, isError, error } =
        debouncedSearchTerm.trim().length > 0 ? search_paging : orders_paging;

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

    if (isLoading) return <p>Loading orders...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    console.log("Search Term:", debouncedSearchTerm);
    console.log("Orders Data:", data);
    console.log("Displayed Orders:", orders);
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
                {/* Search box */}
                <div className="input-group w-25 mb-3">
                    <span className="input-group-text">
                        <BsSearch />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        name="search"
                        placeholder="Search..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                    />
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
                        {orders.map((order) => (
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
                                        className={` p-1 rounded rounded-3 text-light  status-${order.status.toLowerCase()}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td>{order.payment.paymentName}</td>
                                <td>
                                    {new Date(order.createdAt).toLocaleString()}
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
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
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
            </div>
        </div>
    );
};

export default OrderPage;
