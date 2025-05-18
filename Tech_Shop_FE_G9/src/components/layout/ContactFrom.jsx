import React, { useState } from 'react';
import HeaderUserBasic from './HeaderUserBasic';
import FooterUser from './Footer';


function ContactForm() {
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý logic gửi liên hệ ở đây (ví dụ: gọi API)
    console.log('Thông tin liên hệ:', {
      topic,
      title,
      content,
      fullName,
      email,
      phoneNumber,
    });
    // Sau khi gửi, có thể đặt lại các trường
    setTopic('');
    setTitle('');
    setContent('');
    setFullName('');
    setEmail('');
    setPhoneNumber('');
  };

  return (
    <div >
        <HeaderUserBasic />
        <div style={{display: 'flex'}}> 
            <div>
                    <img
                    src="../../../public/images/bg/thu-cu-doi-moi.png"
                    alt="Logo"
                    className="CartBuy-OrderBox__logo"
                    style={{ width: "160px" }}
                    />
                </div>

                <div style={styles.container}>
                
                <h2 style={styles.heading}>TRADE XIN HÂN HẠNH ĐƯỢC HỖ TRỢ QUÝ KHÁCH</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                    <label htmlFor="topic" style={styles.label}>Quý khách đang quan tâm về:</label>
                    <select
                        id="topic"
                        value={topic}
                        onChange={handleTopicChange}
                        style={styles.select}
                    >
                        <option value="">Chọn chủ đề</option>
                        {/* Thêm các option chủ đề nếu có */}
                        <option value="sanpham">Sản phẩm</option>
                        <option value="dichvu">Dịch vụ</option>
                        <option value="khac">Khác</option>
                    </select>
                    </div>

                    <div style={styles.formGroup}>
                    <label htmlFor="title" style={styles.label}>Tiêu đề:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Quý khách vui lòng nhập tiêu đề"
                        style={styles.input}
                        required
                    />
                    </div>

                    <div style={styles.formGroup}>
                    <label htmlFor="content" style={styles.label}>Nội dung:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        placeholder="Xin quý khách vui lòng mô tả chi tiết"
                        style={styles.textarea}
                        required
                    />
                    </div>

                    <div style={styles.formGroup}>
                    <label htmlFor="fullName" style={styles.label}>Họ và tên:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={handleFullNameChange}
                        placeholder="Nhập họ tên"
                        style={styles.input}
                        required
                    />
                    </div>

                    <div style={styles.row}>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Địa chỉ Email:</label>
                        <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Nhập Email"
                        style={styles.input}
                        required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="phoneNumber" style={styles.label}>Số điện thoại</label>
                        <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="Nhập sđt"
                        style={styles.input}
                        required
                        />
                    </div>
                    </div>

                    <button type="submit" style={styles.button}>
                    GỬI LIÊN HỆ
                    </button>
                </form>
                </div>

                <div>
                    <img
                    src="../../../public/images/bg/mua-he-ruc-ro.png"
                    alt="Logo"
                    className="CartBuy-OrderBox__logo"
                    style={{ width: "160px" }}
                    />
                </div>

        </div>
 
        <FooterUser />
    </div>

  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: 'white',
    color: '#333',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    minHeight: '100px',
  },
  row: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    backgroundColor: '#337ab7',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
  },
};

export default ContactForm;