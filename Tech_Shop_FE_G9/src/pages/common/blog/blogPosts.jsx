import React from "react";
import "../../../assets/css/Blog.css";
import HeaderUserBasic from "../../../components/layout/HeaderUserBasic";

const Blog = () => {


  const posts = [
    {
      title: "Tổng hợp các phần mềm cắt ghép video trên điện thoại và máy tính tốt nhất",
      date: "Thứ Hai 28/04/2025",
      author: "Hoàng Minh Tuyết",
      image: "https://picsum.photos/200/120?random=1",
    },
    {
      title: "Bật mí cách thêm dòng trong Excel cực nhanh và hiệu quả",
      date: "Thứ Hai 28/04/2025",
      author: "Lâm Trương Thảo Uyên",
      image: "https://picsum.photos/200/120?random=2",
    },
    {
      title: "Cách tải Valorant Mobile phiên bản mới nhất 2025",
      date: "Thứ Hai 28/04/2025",
      author: "Lê Minh Tâm",
      image: "https://picsum.photos/200/120?random=3",
    },
    {
      title: "Cách tải Valorant Mobile phiên bản mới nhất 2025",
      date: "Thứ Hai 28/04/2025",
      author: "Lê Minh Tâm",
      image: "https://picsum.photos/200/120?random=3",
    },    {
      title: "Cách tải Valorant Mobile phiên bản mới nhất 2025",
      date: "Thứ Hai 28/04/2025",
      author: "Lê Minh Tâm",
      image: "https://picsum.photos/200/120?random=3",
    },    {
      title: "Cách tải Valorant Mobile phiên bản mới nhất 2025",
      date: "Thứ Hai 28/04/2025",
      author: "Lê Minh Tâm",
      image: "https://picsum.photos/200/120?random=3",
    },    {
      title: "Cách tải Valorant Mobile phiên bản mới nhất 2025",
      date: "Thứ Hai 28/04/2025",
      author: "Lê Minh Tâm",
      image: "https://picsum.photos/200/120?random=3",
    },
  ];

  const quickLinks = [
    "Tai nghe Cloud III S Wireless mới của HyperX có thời lượng pin...",
    "Hướng dẫn cách xoay dọc màn hình máy tính cực nhanh chóng",
    "Top 9+ phần mềm chỉnh sửa video miễn phí trên máy tính, điện thoại",
    "NotebookLM là gì? Hướng dẫn chi tiết cách dùng NotebookLM...",
    "CUDA NVIDIA là gì? Chức năng của CUDA trong GPU",
    "Giải đáp siêu máy tính Project Digits NVIDIA mạnh cỡ nào?",
  ];

  return (
    <div className="blog__container">
      <HeaderUserBasic title="Blog" />
      {/* Row 1 */}
      <div className="blog__row-wrapper">
        <div className="blog__main-row">
          <div className="blog__row blog__row--2-1">
            <div className="blog__col blog__col--2">
              <img
                src="https://picsum.photos/400/200?random=1"
                alt="Star Wars"
                className="blog__image"
              />
              <h2 className="blog__title">Star Wars Outlaw Gold Edition</h2>
            </div>
            <div className="blog__col blog__col--1">
              <img
                src="https://picsum.photos/400/200?random=2"
                alt="Anime Rangers"
                className="blog__image"
              />
              <h2 className="blog__title">Code Anime Rangers X mới nhất</h2>
            </div>
          </div>
        </div>

        <div className="blog__sidebar-row">
          <div className="blog__section">
            <div className="blog__section-title-wrapper">
              <h3 className="blog__section-title">CHỦ ĐỀ HOT</h3>
              <span className="blog__icon-fire">
                <img
                  src="https://file.hstatic.net/200000636033/file/icon-blog-1_8b6add82876c457ba582b628c32266e5.png"
                  alt="icon fire"
                  style={{ width: "40px", height: "44px" }}
                />
              </span>
            </div>
            <div className="blog__tags">
              {["Code game", "Minecraft", "AI", "Free Fire", "Roblox"].map(
                (tag) => (
                  <div key={tag} className="blog__tag">
                    {tag}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="blog__row-wrapper">
        <div className="blog__main-row">
          <div className="blog__row blog__row--1-1-1">
            <div className="blog__col">
              <img
                src="https://picsum.photos/400/200?random=3"
                alt="Định vị iPhone"
                className="blog__image"
              />
              <p>Tổng hợp cách định vị iPhone</p>
            </div>
            <div className="blog__col">
              <img
                src="https://picsum.photos/400/200?random=4"
                alt="AI Video"
                className="blog__image"
              />
              <p>Chuyển đổi văn bản thành video AI</p>
            </div>
            <div className="blog__col">
              <img
                src="https://picsum.photos/400/200?random=5"
                alt="Word"
                className="blog__image"
              />
              <p>Cách làm mục lục trong Word</p>
            </div>
          </div>
        </div>

        <div className="blog__sidebar-row">
          <div className="blog__section">
            <div className="blog__section-title-wrapper">
              <h3 className="blog__section-title">CHỦ ĐỀ GAME</h3>
              <span className="blog__icon-fire">
                <img
                  src="https://file.hstatic.net/200000636033/file/icon-blog-1_8b6add82876c457ba582b628c32266e5.png"
                  alt="icon fire"
                  style={{ width: "40px", height: "44px" }}
                />
              </span>
            </div>
            <div className="blog__tags">
              {[ "Game FPS", "Game RPG", "Game Co-op", "Game Hành động", "Game sinh tồn", ].map((tag) => (
                <div key={tag} className="blog__tag">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* row 3 */}

      <div className="blog__row-wrapper">
        <div className="blog__main-row">
          <div className="blog__list-left">
            {posts.map((post, index) => (
              <div className="blog__list-item" key={index}>
                <img src={post.image} alt={post.title} className="blog__list-img" />
                <div className="blog__list-content">
                  <h3 className="blog__list-title">{post.title}</h3>
                  <p className="blog__list-meta">
                    📅 {post.date} &nbsp; | &nbsp; 🧑 {post.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="blog__sidebar-row">
          <div className="blog__section">
            <div className="blog__section-title-wrapper">
              <h3 className="blog__section-title-list">XEM NHANH</h3>
              <span className="blog__icon-set">
                <img
                  src="https://file.hstatic.net/200000636033/file/icon-blog-2_b45434d35b2c41b38931556be9e6dd2f.png"
                  alt="icon fire"
                  style={{ width: "40px", height: "44px" }}
                />
              </span>
            </div>
            <ul className="quick-view-list">
            {quickLinks.map((item, index) => (
              <li className="quick-view-item" key={index}>
                <img
                  src={`https://picsum.photos/60/40?random=${index + 5}`}
                  alt="thumb"
                  className="quick-thumb"
                />
                <p>{item}</p>
              </li>
            ))}
          </ul>
          </div>
        </div>

      </div>


    </div>
  );
};

export default Blog;