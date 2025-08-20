import { useEffect, useState } from "react";
import '../../../assets/css/vendor/bootstrap.min.css';
import '../../../assets/css/vendor/font-awesome.css';
import '../../../assets/css/vendor/fontawesome-stars.css';
import '../../../assets/css/vendor/ion-fonts.css';
import '../../../assets/css/plugins/slick.css';
import '../../../assets/css/plugins/animate.css';
import '../../../assets/css/plugins/jquery-ui.min.css';
import '../../../assets/css/plugins/lightgallery.min.css';
import '../../../assets/css/plugins/nice-select.css';
import '../../../assets/css/style.css';
import axios from "axios";
import Footer  from "../footer/index";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null); // postimi që hapet në modal
  const pageSize = 5;

  useEffect(() => {
    axios.get(`http://localhost:5298/api/user/Blog/paged`, {
      params: { pageNumber, pageSize, order: sortOrder }
    })
    .then(response => {
      setBlogs(response.data.blogs);
      setTotalCount(response.data.totalCount);
    })
    .catch(error => console.error(error));
  }, [pageNumber, sortOrder]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const openModal = (blog) => {
    setSelectedBlog(blog);
  };

  const closeModal = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="main-wrapper">
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2>Blog View</h2>
<div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
  <select
    onChange={(e) => {
      setSortOrder(e.target.value);
      setPageNumber(1);
    }}
    value={sortOrder}
    style={{
      padding: "8px 16px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      backgroundColor: "#f9f9f9",
      color: "#333",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
      outline: "none",
      transition: "border-color 0.2s ease-in-out",
    }}
    onFocus={(e) => (e.target.style.borderColor = "#ffaa00")}
    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
  >
    <option value="desc"> Më të rejat</option>
    <option value="asc"> Më të vjetrat</option>
  </select>
</div>

          </div>
        </div>
      </div>

      <div className="uren-blog_area list-view_area">
        <div className="container-fluid">
          <div className="row list-item_wrap">
            {blogs.map((blog) => (
              <div 
                className="col-lg-6" 
                key={blog.blogId} 
                onClick={() => openModal(blog)} 
                style={{ cursor: "pointer" }}
              >
                <div className="blog-item">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="blog-img img-hover_effect">
                        <img src={blog.photoUrl} alt={blog.title} />
                        <span className="post-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="blog-content">
                        <h3>{blog.title}</h3>
                        <p>{blog.description.substring(0, 100)}...</p>
                        <div className="uren-btn-ps_left">
                          <button className="uren-btn-2" onClick={(e) => { e.stopPropagation(); openModal(blog); }}>
                            Lexo më shumë
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
{/* Pagination */}
<div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: '8px' }}>
  {/* Butoni Para me ikonë dhe disable kur në faqe 1 */}
  <button 
    onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} 
    disabled={pageNumber === 1}
    style={{
      padding: '6px 12px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: pageNumber === 1 ? '#eee' : '#fff',
      cursor: pageNumber === 1 ? 'not-allowed' : 'pointer',
      fontWeight: 'bold'
    }}
    aria-label="Faqja e mëparshme"
  >
    &lt;
  </button>

  {/* Numrat e faqeve */}
  {[...Array(totalPages)].map((_, idx) => {
    const page = idx + 1;
    const isActive = pageNumber === page;
    return (
      <button
        key={page}
        onClick={() => setPageNumber(page)}
        style={{
          padding: '6px 12px',
          borderRadius: '4px',
          border: isActive ? '2px solid #ffaa00ff' : '1px solid #ccc',
          backgroundColor: isActive ? '#ffaa00ff' : '#fff',
          color: isActive ? '#fff' : '#131111ff',
          cursor: 'pointer',
          fontWeight: isActive ? 'bold' : 'normal',
          transition: 'all 0.2s ease-in-out'
        }}
      >
        {page}
      </button>
    );
  })}

  {/* Butoni Pas me ikonë dhe disable kur në faqen e fundit */}
  <button 
    onClick={() => setPageNumber(prev => Math.min(prev + 1, totalPages))} 
    disabled={pageNumber === totalPages}
    style={{
      padding: '6px 12px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: pageNumber === totalPages ? '#eee' : '#fff',
      cursor: pageNumber === totalPages ? 'not-allowed' : 'pointer',
      fontWeight: 'bold'
    }}
    aria-label="Faqja e ardhshme"
  >
    &gt;
  </button>
</div>

        </div>
      </div>

      {/* Modal */}
      {selectedBlog && (
        <div 
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={closeModal} // Klikimi jashtë modalit e mbyll
        >
          <div 
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 8,
              maxWidth: "600px",
              width: "90%",
              position: "relative",
              maxHeight: "80vh",
              overflowY: "auto"
            }}
            onClick={e => e.stopPropagation()} // Mos mbyl modalin kur klikoj brenda
          >
            <button 
              onClick={closeModal} 
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer"
              }}
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2>{selectedBlog.title}</h2>
            <img 
              src={selectedBlog.photoUrl} 
              alt={selectedBlog.title} 
              style={{ width: "100%", marginBottom: 10, borderRadius: 4 }} 
            />
            <p>{selectedBlog.description}</p>
            <p><i>Data e postimit: {new Date(selectedBlog.createdAt).toLocaleDateString()}</i></p>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Blog;
