import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../Redux/cartSlice";

import {
    sortMenu,
    brandsMenu,
    categoryMenu
} from "../data/filterData";

const AllProducts = () => {

    const dispatch = useDispatch();

    const products = useSelector(
        (state) => state.product.data
    );

    const [selectedSort, setSelectedSort] = useState("Latest");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Identify brand from product title
    const getBrand = (title = "") => {
        const name = title.toLowerCase();

        if (name.includes("jbl")) return "JBL";
        if (name.includes("boat")) return "BoAt";
        if (name.includes("sony")) return "Sony";

        return "";
    };

    // Brand checkbox handler
    const handleBrandChange = (brand) => {
        setSelectedBrands((previous) =>
            previous.includes(brand)
                ? previous.filter((item) => item !== brand)
                : [...previous, brand]
        );
    };

    // Category checkbox handler
    const handleCategoryChange = (category) => {
        setSelectedCategories((previous) =>
            previous.includes(category)
                ? previous.filter((item) => item !== category)
                : [...previous, category]
        );
    };

    // Filter and sort products
    const filteredProducts = useMemo(() => {

        let result = [...products];

        if (selectedBrands.length > 0) {
            result = result.filter((item) =>
                selectedBrands.includes(getBrand(item.title))
            );
        }

        if (selectedCategories.length > 0) {
            result = result.filter((item) =>
                selectedCategories.includes(item.category)
            );
        }

        switch (selectedSort) {

            case "Price(Lowest First)":
                result.sort(
                    (a, b) => Number(a.finalPrice) - Number(b.finalPrice)
                );
                break;

            case "Price(Highest First)":
                result.sort(
                    (a, b) => Number(b.finalPrice) - Number(a.finalPrice)
                );
                break;

            case "Top Rated":
                result.sort(
                    (a, b) => Number(b.rateCount || 0) - Number(a.rateCount || 0)
                );
                break;

            case "Latest":
                result.sort((a, b) => Number(b.id) - Number(a.id));
                break;

            case "Featured":
            default:
                break;
        }

        return result;

    }, [products, selectedBrands, selectedCategories, selectedSort]);

    const formatPrice = (price) =>
        `₹${Number(price).toLocaleString("en-IN")}`;

    return (

        <div className="all-products-page">

            {/* SIDEBAR */}

            <aside className="filter-sidebar">

                {/* Sort By */}
                <div className="filter-group">

                    <h4>Sort By</h4>

                    {sortMenu.map((item) => (

                        <label className="sort-option" key={item.id}>

                            <input
                                type="radio"
                                name="sort"
                                checked={selectedSort === item.title}
                                onChange={() => setSelectedSort(item.title)}
                            />

                            <span>{item.title}</span>

                        </label>

                    ))}

                </div>

                {/* Brand Filter */}
                <div className="filter-group">

                    <h4>Brands</h4>

                    {brandsMenu.map((item) => (

                        <label className="filter-option" key={item.id}>

                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(item.label)}
                                onChange={() => handleBrandChange(item.label)}
                            />

                            <span>{item.label}</span>

                        </label>

                    ))}

                </div>

                {/* Category Filter */}
                <div className="filter-group">

                    <h4>Category</h4>

                    {categoryMenu.map((item) => (

                        <label className="filter-option" key={item.id}>

                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(item.label)}
                                onChange={() => handleCategoryChange(item.label)}
                            />

                            <span>{item.label}</span>

                        </label>

                    ))}

                </div>

                {/* Clear Filters */}
                <button
                    className="clear-filters"
                    onClick={() => {
                        setSelectedBrands([]);
                        setSelectedCategories([]);
                        setSelectedSort("Latest");
                    }}
                >
                    Clear Filters
                </button>

            </aside>

            {/* PRODUCTS SECTION */}

            <main className="all-products-content">

                <div className="products-header">
                    <h2>All Products</h2>
                    <p>{filteredProducts.length} Products Found</p>
                </div>

                <div className="all-products-grid">

                    {filteredProducts.length > 0 ? (

                        filteredProducts.map((item) => (

                            <div className="all-product-card" key={item.id}>

                                <div className="all-product-image">
                                    <img
                                        src={item.images?.[0]}
                                        alt={item.title}
                                    />
                                </div>

                                <div className="all-product-details">

                                    <div className="all-product-rating">
                                        {"★".repeat(item.rateCount || 0)}
                                        <span> ({item.ratings || 0})</span>
                                    </div>

                                    <h3>{item.title}</h3>

                                    <p>{item.info}</p>

                                    <hr />

                                    <div className="all-product-price">

                                        <strong>
                                            {formatPrice(item.finalPrice)}
                                        </strong>

                                        <del>
                                            {formatPrice(item.originalPrice)}
                                        </del>

                                    </div>

                                    <button
                                        onClick={() => dispatch(addToCart(item))}
                                    >
                                        Add to cart
                                    </button>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="no-products">
                            <h3>No Products Found</h3>
                            <p>Try changing your filters.</p>
                        </div>

                    )}

                </div>

                <Link to="/" className="back-home">
                    ← Back to Home
                </Link>

            </main>

        </div>
    );
};

export default AllProducts;