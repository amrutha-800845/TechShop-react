import React from "react";

import {
    Routes,
    Route,
    useLocation,
    useNavigate
} from "react-router-dom";

import Home from "../Components/Home";
import AllProducts from "../Components/AllProducts";
import Cart from "../Components/Cart";
import ProductDetails from "../Components/ProductDetails";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Routings = () => {

    const location = useLocation();
    const navigate = useNavigate();

    // Authentication popup conditions
    const isLogin = location.pathname === "/login";
    const isSignup = location.pathname === "/signup";

    // Close popup
    const closePopup = () => {
        navigate("/");
    };

    return (
        <>

            {/* MAIN PAGE ROUTES */}

            <Routes>

                {/* Home Page */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* All Products Page */}
                <Route
                    path="/products"
                    element={<AllProducts />}
                />

                {/* Cart Page */}
                <Route
                    path="/cart"
                    element={<Cart />}
                />

                {/* Individual Product Details */}
                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />

                {/* Home behind Login Popup */}
                <Route
                    path="/login"
                    element={<Home />}
                />

                {/* Home behind Signup Popup */}
                <Route
                    path="/signup"
                    element={<Home />}
                />

                {/* Fallback Route */}
                <Route
                    path="*"
                    element={<Home />}
                />

            </Routes>


            {/* LOGIN POPUP */}

            {isLogin && (

                <div
                    className="auth-overlay"
                    onClick={closePopup}
                >

                    <div
                        className="auth-popup"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <Login />

                    </div>

                </div>

            )}


            {/* SIGNUP POPUP */}

            {isSignup && (

                <div
                    className="auth-overlay"
                    onClick={closePopup}
                >

                    <div
                        className="auth-popup"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <Signup />

                    </div>

                </div>

            )}

        </>
    );
};

export default Routings;