import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setCategory } from "../Redux/productSlice";
import { addToCart } from "../Redux/cartSlice";

const Products = () => {

    const dispatch = useDispatch();

    // Add to cart feedback states
    const [addedProductId, setAddedProductId] = useState(null);
    const [showToast, setShowToast] = useState(false);

    const timerRef = useRef(null);

    // Clear timer when component unmounts
    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, []);

    // Add product to cart
    const handleAddToCart = (item) => {

        dispatch(addToCart(item));

        setAddedProductId(item.id);
        setShowToast(true);

        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setAddedProductId(null);
            setShowToast(false);
        }, 2000);
    };

    // Get products from Redux
    const { data, selectedCategory } = useSelector(
        (state) => state.product
    );

    // Categories
    const categories = [
        "All",
        "Headphones",
        "Earbuds",
        "Earphones",
        "Neckbands"
    ];

    // Display first 11 products
    const limitedProducts = data.slice(0, 11);

    // Filter products
    const filteredProducts =
        selectedCategory === "All"
            ? limitedProducts
            : limitedProducts.filter(
                (item) => item.category === selectedCategory
            );

    return (

        <div className="techshop">

            {/* SUCCESS TOAST */}
            {showToast && (
                <div className="cart-toast">
                    ✓ Product added to cart successfully!
                </div>
            )}

            {/* HEADING */}
            <h3>Top Products</h3>

            {/* CATEGORY MENU */}
            <div className="category-menu">

                {categories.map((item) => (

                    <button
                        key={item}
                        className={
                            selectedCategory === item ? "active" : ""
                        }
                        onClick={() => dispatch(setCategory(item))}
                    >
                        {item}
                    </button>

                ))}

            </div>

            {/* PRODUCTS GRID */}
            <div className="product-grid">

                {filteredProducts.map((item) => (

                    <div className="product-card" key={item.id}>

                        {/* CLICKABLE PRODUCT IMAGE */}
                        <Link
                            to={`/product/${item.id}`}
                            className="product-image"
                        >

                            <img
                                src={`/${item.images?.[0]}`}
                                alt={item.title}
                            />

                        </Link>

                        {/* PRODUCT DETAILS */}
                        <div className="product-details">

                            <h5>{item.title}</h5>

                            <p>{item.info}</p>

                            {/* RATING */}
                            <div className="rating">

                                {"★".repeat(item.rateCount || 0)}

                                <span>
                                    {" "}({item.ratings || 0})
                                </span>

                            </div>

                            {/* PRICE */}
                            <div className="price">

                                <strong>
                                    ₹{Number(item.finalPrice).toLocaleString("en-IN")}
                                </strong>

                                <del>
                                    ₹{Number(item.originalPrice).toLocaleString("en-IN")}
                                </del>

                            </div>

                            {/* ADD TO CART */}
                            <button
                                className={
                                    addedProductId === item.id ? "added" : ""
                                }
                                onClick={() => handleAddToCart(item)}
                            >

                                {addedProductId === item.id
                                    ? "✓ ADDED TO CART"
                                    : "ADD TO CART"}

                            </button>

                        </div>

                    </div>

                ))}

                {/* BROWSE ALL PRODUCTS */}
                {selectedCategory === "All" && (

                    <Link
                        to="/products"
                        className="product-card browse-card"
                    >

                        <h3>
                            Browse All
                            <br />
                            Products <span>→</span>
                        </h3>

                    </Link>

                )}

            </div>

        </div>
    );
};

export default Products;