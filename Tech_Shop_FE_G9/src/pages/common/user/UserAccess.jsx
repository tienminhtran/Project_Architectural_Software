import React from 'react';
import useUser from '../../../hooks/useUser'; // adjust the path if needed

export default function UserAccess() {
  const { getAllUserHasOrderPaging, getAllUserRole1Paging } = useUser();

  const userHasOrders = getAllUserHasOrderPaging.data?.response ?? [];
  const userRole1 = getAllUserRole1Paging.data?.response ?? [];

  console.log('userHasOrders', userHasOrders);
  console.log('userRole1', userRole1);
  const styles = {
    container: { padding: 24, fontFamily: 'Arial, sans-serif' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    tableWrapper: { overflowX: 'auto', marginBottom: 40 },
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

const renderTable = (data, title, includeOrder = false) => {
  const hasScroll = data.length > 5;
  return (
    <div style={styles.tableWrapper}>
      <h2>{title}</h2>
      <div style={{ maxHeight: hasScroll ? 300 : 'auto', overflowY: hasScroll ? 'scroll' : 'visible' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Profile</th>
              <th style={styles.th}>First Name</th>
              <th style={styles.th}>Last Name</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Created At</th>
              <th style={styles.th}>Status</th>
              {includeOrder && <th style={styles.th}>No. Order</th>}
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map(user => (
                <tr key={user.id}>
                  <td style={styles.td}>
                    <img src={user.image || user.profile || 'https://via.placeholder.com/40'} alt="avatar" style={styles.img} />
                  </td>
                  <td style={styles.td}>{user.firstname}</td>
                  <td style={styles.td}>{user.lastname}</td>
                  <td style={styles.td}>{user.username}</td>
                  <td style={styles.td}>{user.phone_number}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td style={{ ...styles.td, ...(user.active === 'Quá hạn' ? styles.overdue : {}) }}>
                    {user.active}
                  </td>
                  {includeOrder && <td style={styles.td}>{user.orderCount ?? 0}</td>}
                  <td style={styles.td}>
                    <button style={{ color: '#007bff', cursor: 'pointer' }}>Xem</button>
                  </td>
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
    <div style={styles.container}>
      <div style={styles.title}>Quản lý người dùng</div>

      {renderTable(userHasOrders, 'Bảng người dùng đã mua', true)}
      {renderTable(userRole1, 'Bảng người dùng USER')}
    </div>
  );
}
