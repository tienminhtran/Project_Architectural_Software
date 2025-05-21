import React from "react";
import "../../../assets/css/Blog.css";
import HeaderUser from "../../../components/layout/HeaderUser";

const Blog = () => {


  const posts = [
    {
      title: "Tổng hợp các phần mềm cắt ghép video trên điện thoại và máy tính tốt nhất",
      date: "Thứ Hai 28/04/2025",
      author: "Hoàng Minh Tuyết",
      image: "https://file.hstatic.net/200000722513/article/tai-tlauncher-minecraft-thumb_e0e3c43418c04ecd879b88317184686f_grande.jpg",
    },
    {
      title: "Bật mí cách thêm dòng trong Excel cực nhanh và hiệu quả",
      date: "Thứ Hai 28/04/2025",
      author: "Lâm Trương Thảo Uyên",
      image: "https://file.hstatic.net/200000722513/article/adobe-express-thumb__2__ca8a8b8448ba4aecb0b18cdddcc814a5_grande.jpg",
    },
    {
      title: "Bỏ túi 17+ phần mềm làm video trên máy tính chuyên nghiệp và tốt nhất",
      date: "Thứ Hai 28/04/2025",
      author: "Lê Minh Tâm",
      image: "https://file.hstatic.net/200000722513/article/phan-mem-doc-file-xml-thumb__1__518d3774087642a0b0eef9906b8471e0_grande.jpg",
    },
    {
      title: "Cách tải Valorant Mobile phiên bản mới nhất 2025",
      date: "Thứ Hai 28/04/2025",
      author: "Lê Minh Tâm",
      image: "https://file.hstatic.net/200000722513/article/phan-mem-lam-video-thumb_b832c53a430a4b849324c56fbc461d01_grande.jpg",
    },    {
      title: "[MSI] Nhận code game DOOM: The Dark Ages Premium Edition khi mua RTX 50 Series",
      date: "Thứ Hai 28/04/2025",
      author: "Lê Minh Tâm",
      image: "https://file.hstatic.net/200000722513/article/code_game_275ed0e2a0334a18a41d1fdbd538ca16_grande.jpg",
    },    {
      title: "Mua ASUS NVIDIA GEFORCE RTX™ 50 SERIES nhận code game DOOM: The Dark Ages Premium Edition",
      date: "Thứ Hai 28/04/2025",
      author: "Lê Minh Tâm",
      image: "https://file.hstatic.net/200000722513/article/nhan_code_game_doom_3aab286886d549f1b3f7af65535d942a_grande.jpg",
    },    {
      title: "Cách sử dụng Hailuo AI video chuyển đổi văn bản thành video nhanh chóng",
      date: "Thứ Hai 21/03/2025",
      author: "Lê Minh Tâm",
      image: "https://file.hstatic.net/200000722513/article/asusasus_f8ec7472e93a4ac0b5aabbe360aabc7d_grande.jpg",
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
    <div>
        <HeaderUser showCategory={false} showBanner={false} currentTab={"Blog"} />


      <div className="blog__container">
        {/* Row 1 */}
        <div className="blog__row-wrapper">
          <div className="blog__main-row">
            <div className="blog__row blog__row--2-1">
              <div className="blog__col blog__col--2">
                <img
                  src="https://file.hstatic.net/200000722513/article/gearvn-asus-ra-mat-chiec-ban-phim-rog-ket-hop-cung-zywoo-banner_cce3f458e3194eb5a183e40cb514e7a9_large.jpg"
                  alt="Star Wars"
                  className="blog__image"
                />
                <h2 className="blog__title">Star Wars Outlaw Gold Edition</h2>
              </div>
              <div className="blog__col blog__col--1">
                <img
                  src="https://file.hstatic.net/200000722513/article/code-skibidi-tower-defense-thumbnail__1__a10ae935b6624d3990d37aa180037a33_grande.jpg"
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
                  src="https://file.hstatic.net/200000722513/article/phan-mem-cat-ghep-video-thumb__1__0b2bceefa3bc42dba4fb305e614d2b1b_grande.jpg"
                  alt="Định vị iPhone"
                  className="blog__image"
                />
                <p>Tổng hợp cách định vị iPhone</p>
              </div>
              <div className="blog__col">
                <img
                  src="https://file.hstatic.net/200000722513/article/cach-them-dong-trong-excel-thumbnail_802e26e39c594751999bd3ba672a0d79_grande.jpg"
                  alt="AI Video"
                  className="blog__image"
                />
                <p>Chuyển đổi văn bản thành video AI</p>
              </div>
              <div className="blog__col">
                <img
                  src="https://file.hstatic.net/200000722513/article/tai-valorant-mobile-thumb__1__1610d68601da4f50b11bd522619ba1b4_grande.jpg"
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
                    src="https://file.hstatic.net/200000636033/file/icon-blog-1_8b6add82876c457ba582b628c32266e5.png"
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
    </div>

  );
};

export default Blog;