import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrows
const PrevArrow = ({ onClick }) => (
  <button className="custom-sh custom-mrapa" onClick={onClick}>
    <i className="ion-chevron-left"></i>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button className="custom-sh custom-para" onClick={onClick}>
    <i className="ion-chevron-right"></i>
  </button>
);

const Blog = () => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } }
    ]
  };

  const blogPosts = [
    {
      id: 1,
      image: "assets/images/blog/large-size/1.jpg",
      date: "12-09-19",
      title: "Quaerat eligendi dolores autem omnis sed",
      desc: "Maiores accusamus unde nulla quaerat deserunt..."
    },
    {
      id: 2,
      image: "assets/images/blog/large-size/2.jpg",
      date: "15-09-19",
      title: "Nulla voluptatum maiores dolorem nobis",
      desc: "Beatae molestias blanditiis aut recusandae saepe..."
    },
    {
      id: 3,
      image: "assets/images/blog/large-size/3.jpg",
      date: "19-09-19",
      title: "Laudantium minus excepturi expedita dolore",
      desc: "Deserunt, beatae molestias blanditiis aut recusandae..."
    },
    {
      id: 4,
      image: "assets/images/blog/large-size/4.jpg",
      date: "16-09-19",
      title: "Aliquam nihil dolorem beatae totam tempora",
      desc: "Maiores accusamus unde nulla quaerat deserunt..."
    },
    {
      id: 5,
      image: "assets/images/blog/large-size/5.jpg",
      date: "20-09-19",
      title: "Reprehenderit illum iusto sit asperiores",
      desc: "Beatae molestias blanditiis aut recusandae saepe..."
    },
    {
      id: 6,
      image: "assets/images/blog/large-size/6.jpg",
      date: "25-09-19",
      title: "Corrupti, dolore tempore totam voluptate",
      desc: "Deserunt, beatae molestias blanditiis aut recusandae..."
    }
  ];

  return (
    <div className="uren-blog_area bg--white_smoke">
      <div className="container-fluid">
        <div className="section-title_area">
          <span>Our Recent Posts</span>
          <h3>From Our Blogs</h3>
        </div>
        <Slider {...settings} className="blog-slider">
          {blogPosts.map((post) => (
            <div key={post.id} className="slide-item">
              <div className="inner-slide">
                <div className="blog-img img-hover_effect">
                  <a href="blog-details-left-sidebar.html">
                    <img src={post.image} alt="Blog" />
                  </a>
                  <span className="post-date">{post.date}</span>
                </div>
                <div className="blog-content">
                  <h3>
                    <a href="blog-details-left-sidebar.html">{post.title}</a>
                  </h3>
                  <p>{post.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Blog;
