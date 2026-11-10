import React, { useState } from "react";

import {
    FaSearch,
    FaShoppingCart,
    FaUser,
    FaTimes
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";

const Navbar = () => {

    // Search bar visibility
    const [showSearch, setShowSearch] = useState(false);

    // Get cart products from Redux
    const cartItems = useSelector(
        (state) => state.cart.data
    );

    // Calculate total cart quantity
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Toggle search bar
    const handleSearchToggle = () => {
        setShowSearch((previous) => !previous);
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark fixed-top tech-navbar">

            <div className="container-fluid">

                {/* LOGO */}

                <Link
                    to="/"
                    className="navbar-brand"
                >
                    Tech-Shop
                </Link>

                {/* MOBILE TOGGLE */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* NAVBAR ITEMS */}

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        {/* SEARCH ICON */}

                        <li className="nav-item">

                            <button
                                type="button"
                                className="nav-link navbar-icon search-toggle"
                                onClick={handleSearchToggle}
                                title="Search products"
                                aria-label="Search products"
                            >
                                {showSearch ? <FaTimes /> : <FaSearch />}
                            </button>

                        </li>

                        {/* CART ICON */}

                        <li className="nav-item">

                            <Link
                                to="/cart"
                                className="nav-link navbar-icon cart-icon"
                                title="Shopping Cart"
                            >

                                <FaShoppingCart />

                                {cartCount > 0 && (

                                    <span className="cart-count">
                                        {cartCount}
                                    </span>

                                )}

                            </Link>

                        </li>

                        {/* USER ICON AND POPUP */}

                        <li className="nav-item user-menu">

                            <FaUser className="user-icon" />

                            <div className="user-card">

                                <h2>Hello!</h2>

                                <h3>
                                    Access account and manage orders
                                </h3>

                                <Link to="/login">
                                    <button>
                                        Login / Signup
                                    </button>
                                </Link>

                                <hr />

                                <h4>Please Login</h4>

                            </div>

                        </li>

                    </ul>

                </div>

            </div>

            {/* SEARCH BAR */}

            {showSearch && (

                <SearchBar
                    onClose={() => setShowSearch(false)}
                />

            )}

        </nav>
    );
};

export default Navbar;