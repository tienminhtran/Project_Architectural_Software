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
<div class="etra-content">
  <h1>Hành Trình Bứt Phá Giới Hạn, Kiến Tạo Giá Trị Khác Biệt Tại ETraDe</h1>

  <p>Câu chuyện của <strong>ETraDe</strong> không chỉ đơn thuần là hành trình của một doanh nghiệp, mà còn là minh chứng cho khát vọng vươn lên, phá bỏ mọi rào cản để kiến tạo những giá trị độc đáo.  Xuất phát từ một khởi đầu đầy khiêm tốn, nảy mầm từ ước mơ giản dị của một game thủ – người mong muốn những người cùng đam mê có thể dễ dàng tiếp cận với những cỗ máy và bộ gear mơ ước, ETraDe đã trải qua một hành trình bứt phá ngoạn mục, vươn mình trở thành một trong những nhà bán lẻ IT hàng đầu tại Việt Nam.</p>

  <p>Thành công rực rỡ mà ETraDe đạt được không chỉ đến từ những chiến lược kinh doanh sắc bén hay sự nhạy bén với thị trường, mà sâu xa hơn, nó được xây dựng trên nền tảng của một niềm tin mạnh mẽ: <strong>tiềm năng của con người là vô hạn</strong>Tại ETraDe, chúng tôi hiểu rằng, mỗi cá nhân đều ẩn chứa những khả năng phi thường, chỉ cần được khơi gợi và nuôi dưỡng trong một môi trường phù hợp, họ có thể vượt qua mọi giới hạn, đạt được những thành tựu tưởng chừng như không thể.</p>

  <div class="etra-highlight">
    “Chúng tôi tin rằng, sự khác biệt tạo nên sức mạnh tập thể.”
  </div>

  <p>Chính vì lẽ đó, ETraDe không ngừng nỗ lực để xây dựng một môi trường làm việc đa dạng, nơi mọi ý tưởng đều được trân trọng</p>

  <p>Không chỉ chú trọng vào môi trường làm việc, ETraDe còn cam kết mang đến mức thu nhập xứng đáng</p>

  <p>Tại ETraDe, cơ hội phát triển không chỉ dừng lại ở những vị trí cố định, mà là một hành trình không ngừng nghỉ</p>

  <p><strong>ETraDe</strong> không chỉ là một nơi làm việc, mà còn là một <em>cộng đồng, một gia đình</em>, nơi mỗi thành viên được khuyến khích để bứt phá mọi giới hạn, , cùng nhau tạo ra những giá trị khác biệt, góp phần vào sự phát triển của ngành IT Việt Nam và xây dựng một tương lai đầy hứa hẹn. Nếu bạn mang trong mình khát vọng chinh phục những đỉnh cao mới, nếu bạn tin vào sức mạnh của sự sáng tạo và tinh thần đồng đội, hãy đến với ETraDe, nơi hành trình phát triển của bạn sẽ được chắp cánh, và những giá trị khác biệt sẽ được lan tỏa.</p>
</div>

        <Footer />
    </div>

  );
};

export default RecruitmentPage;
