import React, { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const UserPage = () => {
  const [search, setSearch] = useState("");
  const [filterUsername, setFilterUsername] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const users = [
    { id: 1, profile: "https://cdn.prod.website-files.com/65943d23dc44e6ce92eb6b67/65fb2de06abe3639bac78923_renter_listing_search-p-500.png", firstName: "John", lastName: "Doe", username: "johndoe", phone: "123-456-7890", email: "john@example.com", status: "Active" },
    { id: 2, profile: "https://cdn.prod.website-files.com/65943d23dc44e6ce92eb6b67/65fb2de06abe3639bac78923_renter_listing_search-p-500.png", firstName: "Jane", lastName: "Smith", username: "janesmith", phone: "098-765-4321", email: "jane@example.com", status: "Inactive" },
  ];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((rowId) => rowId !== id) : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(selectedRows.length === users.length ? [] : users.map((user) => user.id));
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = search.toLowerCase();
    return (
      (searchLower === "" ||
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower) ||
        user.phone.includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)) &&
      user.username.toLowerCase().includes(filterUsername.toLowerCase()) &&
      user.phone.includes(filterPhone) &&
      user.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
      (filterStatus === "" || user.status.toLowerCase() === filterStatus.toLowerCase())
    );
  });

  return (
    <div className="page-wrapper">
      <div className="page-header d-flex justify-content-between align-items-center">
        <div className="page-title">
          <h3>User List</h3>
          <p>Manage and search users</p>
        </div>
        <div className="header-action">
          <Link to="/common/AddUserPage" className="btn btn-warning text-white fw-bold rounded px-4 py-2 text-decoration-none">
            Add User
          </Link>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="filter-container">
        <button className="filter-toggle" onClick={toggleFilters} > 
          {showFilters ? "✖" : "🔍 Filter"}
        </button>
        {showFilters && (
          <div className="filters">
            <input type="text" className="form-control" placeholder="Enter User Name" value={filterUsername} onChange={(e) => setFilterUsername(e.target.value)} />
            <input type="text" className="form-control" placeholder="Enter Phone" value={filterPhone} onChange={(e) => setFilterPhone(e.target.value)} />
            <input type="text" className="form-control" placeholder="Enter Email" value={filterEmail} onChange={(e) => setFilterEmail(e.target.value)} />
            <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All</option>
              <option value="Active">Enable</option>
              <option value="Inactive">Disable</option>
            </select>
          </div>
        )}
      </div>

      {/* Ô tìm kiếm chung */}
      <div className="user-search-container my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name, Username, Phone, or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Bảng dữ liệu */}
      <table className="table table-responsive table-hover">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectedRows.length === users.length} onChange={handleSelectAll} className="form-check-input" /></th>
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
              <td><input type="checkbox" checked={selectedRows.includes(user.id)} onChange={() => handleSelectRow(user.id)} className="form-check-input" /></td>
              <td><img src={user.profile} alt="Profile" className="user-profile-img" /></td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td><span className={`${user.status === "Active" ? "bg-success" : "bg-danger"} p-2 rounded rounded-4 text-light`}>{user.status}</span></td>
              <td className="user-action">
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
  );
};

export default UserPage;
