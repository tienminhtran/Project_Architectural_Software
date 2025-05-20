 import React, { useState } from 'react';
import useUser from '../../../hooks/useUser'; // adjust the path if needed

export default function UserAccess() {
  const { getAllUserRole1AndNoOrderPaging } = useUser();
  const userNoOrders = getAllUserRole1AndNoOrderPaging.data?.response ?? [];

  const [days, setDays] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleFilter = () => {
    if (!days || isNaN(days)) return;

    const now = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(now.getDate() - Number(days));

    const filtered = userNoOrders.filter(user => {
      const createdDate = new Date(user.createdAt);
      return createdDate <= thresholdDate;
    });

    setFilteredUsers(filtered);
  };

  const renderTable = (data, title, includeOrder = false) => {
    const hasScroll = data.length > 7;
    return (
      <div style={styles.tableWrapper}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</div>
          <div style={{ fontSize: 14, color: '#888' }}>
            Tổng số người dùng: {data.length}
          </div>
        </div>
        <div style={{ maxHeight: hasScroll ? 300 : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID User</th>
                <th style={styles.th}>Profile</th>
                <th style={styles.th}>First Name</th>
                <th style={styles.th}>Last Name</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Created At</th>
                {includeOrder && <th style={styles.th}>No. Order</th>}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map(user => (
                  <tr key={user.id}>
                    <td style={styles.td}>{user.id}</td>
                    <td style={styles.td}>
                      <img src={user.image || user.profile || 'https://via.placeholder.com/40'} alt="avatar" style={styles.img} />
                    </td>
                    <td style={styles.td}>{user.firstname}</td>
                    <td style={styles.td}>{user.lastname}</td>
                    <td style={styles.td}>{user.username}</td>
                    <td style={styles.td}>{user.phone_number}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>{new Date(user.createdAt).toLocaleDateString()}</td>
                    {includeOrder && <td style={styles.td}>{user.orderCount ?? 0}</td>}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={includeOrder ? 10 : 9} style={styles.noData}>
                    Không tìm thấy người dùng phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          padding: 20,
          backgroundColor: '#f9fafb',
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          fontFamily: 'Segoe UI, Tahoma, sans-serif',
        }}
      >
        {/* Nhập số ngày muốn lọc quá hạn so với ngày tạo và ngày hiện tại */}
        <input
          type="number"
          placeholder="Nhập số ngày quá hạn"
          value={days}
          onChange={e => setDays(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #d1d5db',
            width: '100%',
            maxWidth: 250,
            marginBottom: 12,
            fontSize: 14,
          }}
        />
        <button
          onClick={handleFilter}
          style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          Lọc
        </button>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1e40af')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2563eb')}
          >
            Thông báo user, 10 ngày sau hủy tài khoản
          </button>
          <button
            style={{
              backgroundColor: '#ef4444',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#b91c1c')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#ef4444')}
          >
            Hủy các tài khoản ngay
          </button>
        </div>
      </div>

      <div style={styles.container}>
        {renderTable(filteredUsers.length > 0 ? filteredUsers : userNoOrders, 'Bảng người dùng USER chưa có đơn hàng')}
      </div>
    </div>
  );
}
const styles = {
  container: {
    padding: 24,
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f2937',
  },
  tableWrapper: {
    overflowX: 'auto',
    marginBottom: 40,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px 16px',
    backgroundColor: '#f3f4f6',
    borderBottom: '1px solid #e5e7eb',
    fontWeight: 600,
    color: '#374151',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #e5e7eb',
    color: '#4b5563',
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
    color: '#ef4444',
    fontWeight: 'bold',
  },
  noData: {
    textAlign: 'center',
    padding: 20,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  rowHover: {
    transition: 'background 0.3s',
  },

};
