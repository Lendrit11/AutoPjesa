import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../../assets/css/mobile.css";

const Mobile = ({ onClose, className }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const toggleSubmenu = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5298/api/user/Blog/search?term=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleResultClick = (partId) => {
    navigate(`/Product/${partId}`);
    setShowResults(false);
    setSearchTerm("");
    onClose(); // mbyll menu mobile pas klikimit
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`mobile-menu_wrapper ${className}`}>
      <div className="offcanvas-menu-inner">
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
          aria-label="Close menu"
        >
          <i className="ion-android-close"></i>
        </button>

        {/* 🔍 Mobile Search */}
        <div className="offcanvas-inner_search" ref={searchRef}>
          <form className="inner-searchbox" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for item..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value === "") {
                  setResults([]);
                  setShowResults(false);
                }
              }}
              onFocus={() => {
                if (results.length > 0) setShowResults(true);
              }}
            />
            <button className="search_btn" type="submit">
              <i className="ion-ios-search-strong"></i>
            </button>
          </form>

          {showResults && results.length > 0 && (
            <div className="search-results-dropdown">
              {results.map((part) => (
                <div
                  key={part.partId}
                  className="search-result-item"
                  onClick={() => handleResultClick(part.partId)}
                  style={{ cursor: "pointer" }}
                >
                  {part.imageUrl && (
                    <img src={part.imageUrl} alt={part.name} width={50} />
                  )}
                  <div>
                    <h5>{part.name}</h5>
                    <p>{part.price} €</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 📱 Mobile Navigation */}
        <nav className="offcanvas-navigation">
          <ul className="mobile-menu">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
            <li className={`menu-item-has-children ${openSubmenu === "home" ? "active" : ""}`}>
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSubmenu("home");
                }}
              >
                <br />
                <span className="">Settings</span>
                <br />
              </a>
              <ul className={`sub-menu ${openSubmenu === "home" ? "open" : ""}`}>
                <li className="unactive"><Link to="/login">Login</Link></li>
                <li className="unactive"><Link to="/Profile">Account</Link></li>
                <li className="unactive"><Link to="/Wishlist">Wishlist</Link></li>
                <li className="unactive"><Link >Log out</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Mobile;
