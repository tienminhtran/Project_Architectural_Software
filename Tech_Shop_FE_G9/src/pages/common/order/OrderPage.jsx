import React from "react";
import { useState } from "react";
import useOrder from "../../../hooks/useOrder";
import { Link } from "react-router-dom";
import { BsPencil, BsTrash, BsSearch, BsEye } from "react-icons/bs";
import ReactPaginate from "react-paginate"; // Import ReactPaginate

const OrderPage = () => {
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const {
        orders_paging,
        deleteOrder,
        getTotalOrderPending,
        getTotalProductSold,
    } = useOrder(pageNo, pageSize);

    if (orders_paging.isLoading) return <p>Loading...</p>;
    if (orders_paging.isError) return <p>Error loading orders</p>;

    const orders = orders_paging.data?.values || [];
    console.log("Orders Paging Data:", orders_paging.data);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            deleteOrder(id);
        }
    };

    const handlePageChange = (selectedItem) => {
        setPageNo(selectedItem.selected);
    };

    return (
        <div className="container mx-auto p-4 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Order List</h2>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="py-2 px-4 border">ID</th>
                        <th className="py-2 px-4 border">Customer</th>
                        <th className="py-2 px-4 border">Total Price</th>
                        <th className="py-2 px-4 border">Status</th>
                        <th className="py-2 px-4 border">Payment</th>
                        <th className="py-2 px-4 border">Created At</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="py-2 px-4 border">{order.id}</td>
                            <td className="py-2 px-4 border">
                                {order.user.firstname}
                            </td>
                            <td className="px-4 py-3 border text-right font-medium text-green-600">
                                {order.totalPrice}đ
                            </td>
                            <td className="py-2 px-4 border">{order.status}</td>
                            <td className="py-2 px-4 border">
                                {order.payment.paymentName}
                            </td>
                            <td className="py-2 px-4 border">
                                {new Date(order.createdAt).toLocaleString()}
                            </td>

                            <td className="d-flex gap-3">
                                <BsEye
                                    className="text-secondary fs-5"
                                    role="button"
                                    // onClick={() => handleView(brand)}
                                />
                                <BsTrash
                                    onClick={() => handleDelete(order.id)}
                                    className="text-danger fs-5"
                                    role="button"
                                />
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
                pageCount={orders_paging.data?.totalPages || 0}
                onPageChange={handlePageChange}
                containerClassName={"pagination flex justify-end mt-4"}
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
