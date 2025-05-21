import React, { useState, useEffect, useMemo } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import useUser from "../../../hooks/useUser";

const UserPage = () => {
  const [search, setSearch] = useState("");
  const [filterUsername, setFilterUsername] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();
  const pageSize = 10;

  // const validPageNo = Number.isInteger(currentPage) ? currentPage : 0;
  const { user_paging } = useUser(currentPage, pageSize);

  const { data, isLoading, isError, error } = user_paging;

  const users_response = useMemo(() => data?.values || [], [data]); // dùng useMemo để tránh việc render lại nếu data không thay đổi

  const [users, setUsers] = useState([]);

  // Cập nhật useEffect để xử lý ảnh sau khi nhận dữ liệu user
  useEffect(() => {
    if (Array.isArray(users_response)) {
      setUsers(users_response);
    }
  }, [users_response]);

  const imageNames = useMemo(() => {
    return users_response.reduce((acc, user) => {
      if (user.image) {
        acc[user.id] = user.image.replace(/^[^_]+_[^_]+_/, "");
      }
      return acc;
    }, {});
  }, [users_response]);

  if (isLoading) return <p>Loading user...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === users.length ? [] : users.map((user) => user.id)
    );
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = search.toLowerCase();
    return (
    (searchLower === "" ||
      (user.firstname?.toLowerCase() || "").includes(searchLower) ||
      (user.lastname?.toLowerCase() || "").includes(searchLower) ||
      (user.username?.toLowerCase() || "").includes(searchLower) ||
      (user.phone_number || "").includes(searchLower) ||
      (user.email?.toLowerCase() || "").includes(searchLower)) &&
    (user.username?.toLowerCase() || "").includes(filterUsername.toLowerCase()) &&
    (user.phone_number || "").includes(filterPhone) &&
    (user.email?.toLowerCase() || "").includes(filterEmail.toLowerCase()) &&
    (filterStatus === "" || user.active === JSON.parse(filterStatus))
  );
  });

  const handleNavigate = (user) => {
    navigate("/common/UpdateUserPage", { state: { user } });
  };

  return (
    <div className="page-wrapper">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div className="page-title">
          <h3>User List</h3>
          <p>Manage and search users</p>
        </div>
        <div className="header-action">
          <Link
            to="/common/AddUserPage"
            className="btn btn-warning text-white fw-bold rounded px-4 py-2 text-decoration-none"
          >
            Add User
          </Link>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="filter-container">
        <button className="filter-toggle" onClick={toggleFilters}>
          {showFilters ? "✖" : "🔍 Filter"}
        </button>
        {showFilters && (
          <div className="filters">
            <input
              type="text"
              className="form-control"
              placeholder="Enter User Name"
              value={filterUsername}
              onChange={(e) => setFilterUsername(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone"
              value={filterPhone}
              onChange={(e) => setFilterPhone(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
            {/* <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Disable</option>
            </select> */}
          </div>
        )}
      </div>

      {/* Bảng dữ liệu */}
      <table className="table table-responsive table-hover">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === users.length}
                onChange={handleSelectAll}
                className="form-check-input"
              />
            </th>
            <th>Profile</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="align-middle">
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleSelectRow(user.id)}
                  className="form-check-input"
                />
              </td>
              <td>
                <img
                  src={`/images/avatar/${
                    imageNames[user.id] || "avtdefault.jpg"
                  }`}
                  alt="Profile"
                  className="user-profile-img"
                />
              </td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.username}</td>
              <td>{user.phone_number}</td>
              <td>{user.email}</td>
              <td>{user.active ? "✅ Active" : "❌ Disabled"}</td>
              <td className="user-action">
                <div className="d-flex gap-3">
                  <BsPencil
                    className="text-secondary fs-5"
                    role="button"
                    onClick={() => handleNavigate(user)}
                  />
                  {/* <BsTrash className="text-danger fs-5" role="button" /> */}
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
        forcePage={currentPage}
      />
    </div>
  );
};

export default UserPage;
