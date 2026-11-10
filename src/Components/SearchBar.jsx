import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ onClose }) => {

    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);

    const searchRef = useRef(null);
    const navigate = useNavigate();

    const products = useSelector(
        (state) => state.product.data
    );

    // Filter products by name, information and category
    const filteredProducts = products.filter((item) => {

        const searchText = search.trim().toLowerCase();

        if (!searchText) return false;

        return (
            item.title?.toLowerCase().includes(searchText) ||
            item.info?.toLowerCase().includes(searchText) ||
            item.category?.toLowerCase().includes(searchText)
        );

    }).slice(0, 8);

    // Open selected product
    const handleProductClick = (id) => {

        navigate(`/product/${id}`);

        setSearch("");
        setShowResults(false);

        if (onClose) onClose();
    };

    // Close suggestions when clicking outside
    useEffect(() => {

        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    return (

        <div className="search-wrapper" ref={searchRef}>

            {/* SEARCH INPUT */}

            <div className="search-input-box">

                <FaSearch className="search-input-icon" />

                <input
                    type="text"
                    placeholder="Search for product..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                    autoFocus
                />

                {search && (
                    <button
                        type="button"
                        className="search-clear"
                        onClick={() => {
                            setSearch("");
                            setShowResults(false);
                        }}
                    >
                        <FaTimes />
                    </button>
                )}

            </div>

            {/* SEARCH SUGGESTIONS */}

            {showResults && search.trim() !== "" && (

                <div className="search-results">

                    {filteredProducts.length > 0 ? (

                        filteredProducts.map((item) => (

                            <div
                                className="search-result-item"
                                key={item.id}
                                onClick={() => handleProductClick(item.id)}
                            >

                                <img
                                    src={item.images?.[0]}
                                    alt={item.title}
                                />

                                <div>
                                    <h5>{item.title}</h5>
                                    <p>{item.info}</p>
                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="search-no-result">
                            No products found
                        </div>

                    )}

                </div>

            )}

        </div>
    );
};

export default SearchBar;