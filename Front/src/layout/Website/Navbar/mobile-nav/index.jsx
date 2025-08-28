import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import '../../../../assets/css/mobile.css'; // Ndryshuar

const MobileMenu = ({ onClose, className }) => {
  const [submenuActive, setSubmenuActive] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuClose = () => {
    if (onClose) onClose();
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5298/api/user/login/logout", {}, { withCredentials: true });
      toast.success("Logout i suksesshëm!");
      navigate("/login");
    } catch (error) {
      console.error("Gabim gjatë logout:", error);
    }
  };

  const toggleDropdown = (id) => {
    setSubmenuActive(submenuActive === id ? null : id);
  };

  const searchItems = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const res = await fetch(`http://localhost:5298/api/user/Blog/search?term=${encodeURIComponent(query)}`);
      const data = await res.json();
      setFilteredItems(data);
      setShowDropdown(true);
    } catch (err) {
      console.error("Gabim në kërkim:", err);
    }
  };

  const handleResultClick = (partId) => {
    navigate(`/Product/${partId}`);
    setShowDropdown(false);
    setQuery("");
    handleMenuClose();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`mobile-panel ${className || ""}`}>
      <div className="mobile-panel__inner">

        <button
          className="mobile-panel__close-btn"
          onClick={(e) => {
            e.preventDefault();
            handleMenuClose();
          }}
          aria-label="Close"
        >
          <i className="ion-android-close"></i>
        </button>

        <div className="mobile-panel__search" ref={inputRef}>
          <form onSubmit={searchItems} className="mobile-search__form">
            <input
              type="text"
              placeholder="Kërko produkt..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value === "") {
                  setFilteredItems([]);
                  setShowDropdown(false);
                }
              }}
              onFocus={() => {
                if (filteredItems.length > 0) setShowDropdown(true);
              }}
            />
            <button type="submit" className="mobile-search__btn">
              <i className="ion-ios-search-strong"></i>
            </button>
          </form>

          {showDropdown && filteredItems.length > 0 && (
            <div className="mobile-search__results">
              {filteredItems.map((item) => (
                <div
                  key={item.partId}
                  className="mobile-search__item"
                  onClick={() => handleResultClick(item.partId)}
                >
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} width={50} />
                  )}
                  <div>
                    <h5>{item.name}</h5>
                    <p>{item.price} €</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className="mobile-panel__nav">
          <ul className="mobile-nav__list">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>

            <li className={`mobile-nav__item--has-children ${submenuActive === "settings" ? "open" : ""}`}>
              <a href="#!" onClick={(e) => {
                e.preventDefault();
                toggleDropdown("settings");
              }}>
                <p>Settings</p>
              </a>
              <ul className={`mobile-submenu ${submenuActive === "settings" ? "visible" : ""}`}>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/Profile">Account</Link></li>
                <li><Link to="/Wishlist">Wishlist</Link></li>
                <li><Link to="#" onClick={handleLogout}>Log out</Link></li>
              </ul>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  );
};

export default MobileMenu;
