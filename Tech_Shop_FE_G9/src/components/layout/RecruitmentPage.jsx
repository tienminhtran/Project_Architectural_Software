import React, { useState } from 'react';
import '../../assets/css/RecruitmentPage.css'; // Assuming you have a CSS file for styling
import HeaderUserBasic  from './HeaderUserBasic';
import Footer from './Footer';



const departments = [
  'Hành Chính',
  'Product Marketing',
  'Tài chính kế toán',
  'Phát triển phần mềm',
  'Phòng kỹ thuật bảo hành',
  'Kinh doanh Online',
  'Showroom Hoàng Hoa Thám',
];

const locations = [
  'HÀ NỘI - THÁI HÀ',
  'HỒ CHÍ MINH - HOÀNG HOA THÁM',
  'HỒ CHÍ MINH - KHA VẠN CÂN',
  'HỒ CHÍ MINH - TRẦN HƯNG ĐẠO',
  'HỒ CHÍ MINH - HOÀNG VĂN THỤ',
  'HỒ CHÍ MINH - AN DƯƠNG VƯƠNG',
];

const jobData = [
  {
    title: 'Marketing Executive',
    department: 'Product Marketing',
    location: 'HỒ CHÍ MINH - HOÀNG HOA THÁM',
    type: 'Toàn thời gian',
    salary: 'Thương lượng',
    date: '16/05 - 15/06/2025',
  },
  {
    title: 'Graphic Designer',
    department: 'Product Marketing',
    location: 'HỒ CHÍ MINH - HOÀNG HOA THÁM',
    type: 'Toàn thời gian',
    salary: 'Thương lượng',
    date: '16/05 - 15/06/2025',
  },
  {
    title: 'Cộng tác viên Livestream',
    department: 'Kinh doanh Online',
    location: 'HỒ CHÍ MINH - HOÀNG HOA THÁM',
    type: 'Bán thời gian',
    salary: 'Thương lượng',
    date: '07/05 - 06/06/2025',
  },
];

const RecruitmentPage = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const toggleDepartment = (dep) => {
    setSelectedDepartments(prev =>
      prev.includes(dep) ? prev.filter(d => d !== dep) : [...prev, dep]
    );
  };

  const toggleLocation = (loc) => {
    setSelectedLocations(prev =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const filteredJobs = jobData.filter(job =>
    (selectedDepartments.length === 0 || selectedDepartments.includes(job.department)) &&
    (selectedLocations.length === 0 || selectedLocations.includes(job.location))
  );

  return (
    <div>
        <HeaderUserBasic />
        <div className="recruitment-page">
      <div className="sidebar">
        <div className="filter-section">
          <h2>PHÒNG BAN</h2>
          <div className="search-bar">
            <input type="text" placeholder="Tìm nhanh phòng ban..." />
            <button><i className="fas fa-search"></i></button>
          </div>
          <div className="filter-options">
            {departments.map(dep => (
              <label key={dep}>
                <input
                  type="checkbox"
                  checked={selectedDepartments.includes(dep)}
                  onChange={() => toggleDepartment(dep)}
                />
                {dep}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h2>ĐỊA ĐIỂM</h2>
          <div className="search-bar">
            <input type="text" placeholder="Tìm nhanh địa điểm..." />
            <button><i className="fas fa-search"></i></button>
          </div>
          <div className="filter-options">
            {locations.map(loc => (
              <label key={loc}>
                <input className="checkbox_TEXT"
                  type="checkbox"
                  checked={selectedLocations.includes(loc)}
                  onChange={() => toggleLocation(loc)}
                />
                {loc}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="job-listings">
        <h1>CÁC CƠ HỘI VIỆC LÀM</h1>

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div className="job-card" key={index}>
              <h3>{job.title}</h3>
              <p><i className="fas fa-clock"></i> {job.type}</p>
              <p><i className="fas fa-map-marker-alt"></i> {job.location}</p>
              <p><i className="fas fa-dollar-sign"></i> {job.salary}</p>
              <p><i className="far fa-calendar-alt"></i> {job.date}</p>
            </div>
          ))
        ) : (
          <p>Không tìm thấy công việc phù hợp.</p>
        )}
      </div>
        </div>
        <Footer />
    </div>

  );
};

export default RecruitmentPage;
