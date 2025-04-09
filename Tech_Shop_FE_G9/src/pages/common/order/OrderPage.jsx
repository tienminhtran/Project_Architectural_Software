import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsTrash, BsEye, BsSearch } from "react-icons/bs";
import ReactPaginate from "react-paginate";
// import { useDebounce } from "../../../hooks/useDebounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePaginationQuery from "../../../hooks/usePaginationQuery";
import {
    getAllOrder_Paging,
    deleteOrder as deleteOrderService,
    getTotalAmountByOrderId,
} from "../../../services/orderService";

const OrderPage = () => {
    const [pageNo, setPageNo] = useState(0);
    const [pageSize] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
    const [totalAmounts, setTotalAmounts] = useState({});
    const [orderSearch, setOrderSearch] = useState("");
    //   const debouncedSearchTerm = useDebounce(productSearch, 500);

    // ✅ Hook luôn phải gọi cố định, không có điều kiện!
    const orders_paging = usePaginationQuery(
        "getAllOrder_Paging",
        getAllOrder_Paging,
        pageNo,
        pageSize
    );

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

    const orders = orders_paging.data?.values || [];

    useEffect(() => {
        const fetchTotalAmounts = async () => {
            const amounts = {};
            for (const order of orders) {
                try {
                    const amount = await getTotalAmountByOrderId(order.id);
                    amounts[order.id] = amount.response;
                } catch (error) {
                    console.error("Error fetching total amount:", error);
                    amounts[order.id] = 0;
                }
            }
            setTotalAmounts(amounts);
        };

        if (orders.length > 0) {
            fetchTotalAmounts();
        }
    }, [orders]);

    // Xử lý chọn một order (checkbox)
    const handleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id)
                ? prev.filter((rowId) => rowId !== id)
                : [...prev, id]
        );
    };

    // Xử lý chọn tất cả orders
    const handleSelectAll = () => {
        if (selectedRows.length === orders.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(orders.map((item) => item.id));
        }
    };

    if (orders_paging.isLoading) return <p>Loading...</p>;
    if (orders_paging.isError) return <p>Error loading orders</p>;

    return (
        <div className="container mx-auto p-4 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Order List</h2>
            {/* Ô tìm kiếm order */}
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
                    onChange={(e) => setOrderSearch(e.target.value)}
                />
            </div>
            {/* Bảng hiện thị */}
            <table className="table table-hover table-responsive">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectedRows.length === orders.length}
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
                                    checked={selectedRows.includes(order.id)}
                                    onChange={() => handleSelectRow(order.id)}
                                    className="form-check-input"
                                />
                            </td>
                            <td>{order.user.firstname}</td>
                            <td className="px-4 py-3 border text-right font-medium text-green-600">
                                {totalAmounts[order.id] != null
                                    ? `${totalAmounts[order.id].toLocaleString(
                                          "vi-VN"
                                      )} VND`
                                    : "Loading..."}
                            </td>
                            <td>{order.status}</td>
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
                                        onClick={() => handleDelete(order.id)}
                                        className="text-danger fs-5"
                                        role="button"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                breakLabel={"..."}
                pageCount={orders_paging.data?.totalPages || 0}
                onPageChange={handlePageChange}
                containerClassName={"pagination flex justify-content-end mt-4"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link px-3 py-1 border rounded"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link px-3 py-1 border rounded"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link px-3 py-1 border rounded"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link px-3 py-1 border rounded"}
                activeClassName={"active bg-blue-500 text-white"}
            />
        </div>
    );
};

export default OrderPage;
