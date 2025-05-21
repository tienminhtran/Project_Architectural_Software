import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useUser from '../../../hooks/useUser'; // đường dẫn có thể thay đổi tùy bạn
import { Button } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query'; // hoặc react-query

export default function UserAccess() {
  const {
    getAllUserRole1AndNoOrderPaging, // React Query hook lấy danh sách user
    updateStatusUser, // function update status user
    sendEmailNotify, // function gửi email thông báo
  } = useUser();

  // Dữ liệu user từ API (React Query)
  const userNoOrders = getAllUserRole1AndNoOrderPaging.data?.response ?? [];
  const refetchUsers = getAllUserRole1AndNoOrderPaging.refetch;

  const [days, setDays] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Hàm lọc theo ngày tạo
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

  // Hàm xử lý hủy tài khoản (update status)
  const handleCancelAccounts = async () => {
    const cancelUsers = filteredUsers.length > 0 ? filteredUsers : userNoOrders;

    if (cancelUsers.length === 0) {
      Swal.fire('Thông báo', 'Không có thành viên nào để hủy!', 'info');
      return;
    }

    // Xác nhận với người dùng
    const result = await Swal.fire({
      title: `Bạn có chắc muốn hủy ${cancelUsers.length} thành viên không?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, hủy ngay!',
      cancelButtonText: 'Hủy',
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Đang xử lý...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const errors = [];

      // Lặp gọi API update status user
      await Promise.all(
        cancelUsers.map(async (user) => {
          try {
            // Lưu ý hàm updateStatusUser nhận (id, status)
            await updateStatusUser(user.id, 'canceled');
          } catch (error) {
            errors.push(`Thất bại user ID ${user.id}: ${error.message}`);
          }
        })
      );

      Swal.close();

      if (errors.length > 0) {
        Swal.fire('Lỗi', `Hủy tài khoản thất bại với ${errors.length} user. Vui lòng thử lại!`, 'error');
        console.error(errors);
      } else {
        Swal.fire('Thành công', 'Hủy các tài khoản thành công!', 'success');
        setFilteredUsers([]); // reset filter nếu cần
        refetchUsers(); // load lại danh sách user mới
      }
    }
  };

  // Mutation gửi email
  const sendEmailNotifyMutation = useMutation({
    mutationFn: ({ email, nameuser }) => sendEmailNotify({ email, nameuser }),
    onSuccess: () => {
      Swal.fire('Thành công', 'Gửi email thành công!', 'success');
    },
    onError: (error) => {
      console.error('Send email failed:', error);
      Swal.fire('Lỗi', 'Gửi email thất bại. Vui lòng thử lại!', 'error');
    },
  });


  // Gửi email thông báo hàng loạt cho user bị lọc (hoặc all)
  const handleSendBatchEmail = async () => {
    const targetUsers = filteredUsers.length > 0 ? filteredUsers : userNoOrders;

    if (targetUsers.length === 0) {
      Swal.fire('Thông báo', 'Không có người dùng để gửi email!', 'info');
      return;
    }

    const result = await Swal.fire({
      title: `Bạn có chắc muốn gửi email thông báo đến ${targetUsers.length} người dùng không?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, gửi ngay!',
      cancelButtonText: 'Hủy',
    });

    if (!result.isConfirmed) return;

    Swal.fire({
      title: 'Đang gửi email...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const errors = [];

    // Gửi mail tuần tự (hoặc có thể Promise.all nếu API chịu được)
    for (const user of targetUsers) {
      const email = user.email;
      const nameuser = `${user.firstname ?? ''} ${user.lastname ?? ''}`.trim();
      console.log(`Gửi email đến ${email} (${nameuser})`);


      try {
        await sendEmailNotifyMutation.mutateAsync({ email, nameuser });
      } catch (error) {
        errors.push(`Lỗi gửi mail user ID ${user.id}: ${error.message}`);
      }
    }

    Swal.close();

    if (errors.length > 0) {
      Swal.fire('Lỗi', `Có ${errors.length} email gửi không thành công. Vui lòng thử lại!`, 'error');
      console.error(errors);
    } else {
      Swal.fire('Thành công', 'Đã gửi email thông báo đến tất cả người dùng!', 'success');
    }
  };

  // Hàm render bảng
  const renderTable = (data, title, includeOrder = false) => {
    const hasScroll = data.length > 7;
    return (
      <div style={styles.tableWrapper}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</div>
          <div style={{ fontSize: 14, color: '#888' }}>Tổng số người dùng: {data.length}</div>
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
                <th style={styles.th}>Date send mail</th>
                {includeOrder && <th style={styles.th}>No. Order</th>}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map(user => (
                  <tr key={user.id}>
                    <td style={styles.td}>{user.id}</td>
                    <td style={styles.td}>
                      <img
                        src={user.image || user.profile || 'https://via.placeholder.com/40'}
                        alt="avatar"
                        style={styles.img}
                      />
                    </td>
                    <td style={styles.td}>{user.firstname}</td>
                    <td style={styles.td}>{user.lastname}</td>
                    <td style={styles.td}>{user.username}</td>
                    <td style={styles.td}>{user.phone_number}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>{new Date(user.createdAt).toLocaleDateString()}</td>
                    {includeOrder && <td style={styles.td}>{user.orderCount ?? 0}</td>}
                    <td style={styles.td}>
                      {user.emailNotificationDate ? new Date(user.emailNotificationDate).toLocaleString() : 'Chưa gửi mail'}
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
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Nhập số ngày để lọc"
          value={days}
          onChange={e => setDays(e.target.value)}
          style={{ marginRight: 10, padding: 5 }}
        />
        <button onClick={handleFilter}>Lọc</button>
      </div>
      <button
        onClick={handleSendBatchEmail}
        variant="primary"
        style={{ marginBottom: 10, backgroundColor: '#007bff', color: 'white', padding: '8px 15px', border: 'none', borderRadius: 4, cursor: 'pointer' }}
      >
        Thông báo Mail hủy tài khoản - 10 ngày
      </button>
      <button onClick={handleCancelAccounts} style={{ marginBottom: 10, backgroundColor: '#d33', color: 'white', padding: '8px 15px', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        Hủy các tài khoản
      </button>

      {renderTable(filteredUsers.length > 0 ? filteredUsers : userNoOrders, 'Danh sách người dùng')}
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
    marginBottom: 20,
    fontSize: 14,
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
