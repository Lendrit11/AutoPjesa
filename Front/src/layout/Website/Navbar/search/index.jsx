import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate(); // 🧭 për navigim

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) return;

        try {
            const response = await fetch(`http://localhost:5298/api/user/Blog/search?term=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setResults(data);
            setShowResults(true);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Funksion për me navigu te produkti
    const handleResultClick = (partId) => {
        navigate(`/Product/${partId}`);
        setShowResults(false);
        setSearchTerm('');
    };

    return (
        <div className="search-wrapper" ref={searchRef}>
            <form className="hm-searchbox" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter your search key ..." 
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (e.target.value === '') {
                            setResults([]);
                            setShowResults(false);
                        }
                    }}
                    onFocus={() => {
                        if (results.length > 0) setShowResults(true);
                    }}
                />
                <button className="header-search_btn" type="submit">
                    <i className="ion-ios-search-strong">
                        <span>Search</span>
                    </i>
                </button>
            </form>

            {showResults && results.length > 0 && (
                <div className="search-results-dropdown">
                    {results.map(part => (
                        <div
                            key={part.partId}
                            className="search-result-item"
                            onClick={() => handleResultClick(part.partId)}
                            style={{ cursor: 'pointer' }}
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
    );
};

export default Search;
