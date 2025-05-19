import React, { useState } from 'react';

const usersData = [
  {
    id: 1,
    profile: 'https://via.placeholder.com/40',
    firstName: 'Nguyen',
    lastName: 'An',
    username: 'ngan01',
    phone: '0123456789',
    email: 'an.nguyen@example.com',
    status: 'Hoạt động',
  },
  {
    id: 2,
    profile: 'https://via.placeholder.com/40',
    firstName: 'Tran',
    lastName: 'Binh',
    username: 'binhtran',
    phone: '0987654321',
    email: 'binh.tran@example.com',
    status: 'Quá hạn',
  },
  // thêm người dùng khác nếu cần
];

export default function UserAccess() {
  const [search, setSearch] = useState('');
  const [filterOverdue, setFilterOverdue] = useState(false);

  const filteredUsers = usersData.filter(user => {
    const matchSearch =
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filterOverdue ? user.status === 'Quá hạn' : true;
    return matchSearch && matchStatus;
  });

  const styles = {
    container: { padding: 24, fontFamily: 'Arial, sans-serif' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    controls: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginBottom: 20,
    },
    search: {
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: 4,
    },
    filterBtn: isActive => ({
      padding: '8px 16px',
      backgroundColor: isActive ? '#dc3545' : '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
    }),
    tableWrapper: { overflowX: 'auto' },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
    },
    th: {
      padding: '10px 12px',
      backgroundColor: '#f5f5f5',
      border: '1px solid #ccc',
      textAlign: 'center',
    },
    td: {
      padding: '10px 12px',
      border: '1px solid #ccc',
      textAlign: 'center',
    },
    img: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      objectFit: 'cover',
      display: 'block',
      margin: '0 auto',
    },
    overdue: {
      color: 'red',
      fontWeight: 'bold',
    },
    noData: {
      textAlign: 'center',
      padding: 20,
      color: '#888',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Quản lý người dùng</div>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Tìm kiếm tên, họ, email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.search}
        />
        <button
          onClick={() => setFilterOverdue(prev => !prev)}
          style={styles.filterBtn(filterOverdue)}
        >
          {filterOverdue ? 'Bỏ lọc Quá hạn' : 'Lọc User Quá hạn'}
        </button>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Profile</th>
              <th style={styles.th}>First Name</th>
              <th style={styles.th}>Last Name</th>
              <th style={styles.th}>User Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td style={styles.td}>
                    <img src={user.profile} alt="avatar" style={styles.img} />
                  </td>
                  <td style={styles.td}>{user.firstName}</td>
                  <td style={styles.td}>{user.lastName}</td>
                  <td style={styles.td}>{user.username}</td>
                  <td style={styles.td}>{user.phone}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={{ ...styles.td, ...(user.status === 'Quá hạn' ? styles.overdue : {}) }}>
                    {user.status}
                  </td>
                  <td style={styles.td}>
                    <button style={{ color: '#007bff', cursor: 'pointer' }}>Xem</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={styles.noData}>Không tìm thấy người dùng phù hợp.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
