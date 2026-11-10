import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addToCart } from "../Redux/cartSlice";
import reviewsData from "../data/reviewsData";
import Services from "./Services";

const ProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const products = useSelector(
        (state) => state.product.data
    );

    const product = products.find(
        (item) => String(item.id) === String(id)
    );

    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState("Specifications");

    // Reset image and tab when changing products
    useEffect(() => {
        setSelectedImage(0);
        setActiveTab("Specifications");
    }, [id]);

    // Public folder image path
    const getImageUrl = (imageName) => {
        return imageName ? `/${imageName}` : "";
    };

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product Not Found</h2>
                <Link to="/">Continue Shopping</Link>
            </div>
        );
    }

    const formatPrice = (price) =>
        `₹${Number(price).toLocaleString("en-IN")}`;

    const originalPrice = Number(product.originalPrice);
    const finalPrice = Number(product.finalPrice);

    const discount = originalPrice - finalPrice;

    const relatedProducts = products
        .filter(
            (item) =>
                item.category === product.category &&
                item.id !== product.id
        )
        .slice(0, 4);

    const specifications = product.specifications || {
        Brand: product.brand || product.title.split(" ")[0],
        Model: product.title,
        "Generic Name": product.category,
        Description: product.info,
        Connectivity: product.connectivity || "Wireless",
        Type: product.type || "Standard"
    };

    return (

        <div className="product-detail-page">

            {/* PRODUCT MAIN SECTION */}

            <div className="detail-main">

                {/* IMAGE GALLERY */}

                <div className="detail-gallery">

                    {/* THUMBNAILS */}

                    <div className="thumbnail-list">

                        {product.images?.map((image, index) => (

                            <button
                                type="button"
                                key={index}
                                className={
                                    selectedImage === index
                                        ? "thumbnail active-thumbnail"
                                        : "thumbnail"
                                }
                                onClick={() => setSelectedImage(index)}
                            >

                                <img
                                    src={getImageUrl(image)}
                                    alt={`${product.title} ${index + 1}`}
                                />

                            </button>

                        ))}

                    </div>

                    {/* MAIN IMAGE */}

                    <div className="main-product-image">

                        <img
                            src={getImageUrl(
                                product.images?.[selectedImage]
                            )}
                            alt={product.title}
                        />

                    </div>

                </div>


                {/* PRODUCT INFORMATION */}

                <div className="detail-information" style={{marginLeft:"45px"}}>

                    <h2>{product.title}</h2>

                    <p>{product.info}</p>

                    <div className="detail-rating">

                        <span>
                            {"★".repeat(product.rateCount || 0)}
                        </span>

                        ({product.ratings} Ratings)

                    </div>

                    <hr />

                    {/* PRICE */}

                    <div className="detail-price">

                        <h2>{formatPrice(finalPrice)}</h2>

                        <del>{formatPrice(originalPrice)}</del>

                    </div>

                    <p className="detail-discount">
                        You save {formatPrice(discount)}
                    </p>

                    <p className="detail-tax">
                        (Inclusive of all taxes)
                    </p>

                    <div className="stock-status">
                        ✓ In Stock
                    </div>

                    <hr />

                    {/* OFFERS */}

                    <h4>Offers and Discounts</h4>

                    <div className="offer-list">

                        <div>No Cost EMI on Credit Card</div>

                        <div>Pay Later & Avail Cashback</div>

                    </div>

                    {/* ADD TO CART */}

                    <button
                        className="detail-add-cart"
                        onClick={() => dispatch(addToCart(product))}
                    >
                        ADD TO CART
                    </button>

                </div>

            </div>


            {/* PRODUCT TABS */}

            <div className="detail-tabs">

                <div className="tab-buttons">

                    {[
                        "Specifications",
                        "Overview",
                        "Reviews"
                    ].map((tab) => (

                        <button
                            type="button"
                            key={tab}
                            className={
                                activeTab === tab ? "active-tab" : ""
                            }
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>

                    ))}

                </div>


                {/* TAB CONTENT */}

                <div className="tab-content">

                    {/* SPECIFICATIONS */}

                    {activeTab === "Specifications" && (

                        <div className="specification-list">

                            {Object.entries(specifications).map(
                                ([key, value]) => (

                                    <div key={key}>
                                        <span>{key}</span>
                                        <strong>{value}</strong>
                                    </div>

                                )
                            )}

                        </div>

                    )}


                    {/* OVERVIEW */}

                    {activeTab === "Overview" && (

                        <div className="overview-content">

                            <h3>
                                The <span>{product.title}</span> provides
                                an excellent audio experience.
                            </h3>

                            <ul>
                                <li>Sound Tuned to Perfection</li>
                                <li>Comfortable to Wear</li>
                                <li>Designed for Everyday Use</li>
                            </ul>

                            <p>
                                {product.description || product.info}
                            </p>

                        </div>

                    )}


                    {/* REVIEWS */}

                    {activeTab === "Reviews" && (

                        <div className="reviews-content">

                            {reviewsData.map((review) => (

                                <div
                                    className="review-card"
                                    key={review.id}
                                >

                                    <h4>{review.name}</h4>

                                    <div className="review-meta">

                                        <span className="review-stars">
                                            {"★".repeat(review.rateCount)}
                                        </span>

                                        <span>|</span>

                                        <span>{review.date}</span>

                                    </div>

                                    <p>{review.review}</p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>


            {/* RELATED PRODUCTS */}

            <section className="related-products">

                <h2>Related Products</h2>

                <div className="related-grid">

                    {relatedProducts.map((item) => (

                        <Link
                            to={`/product/${item.id}`}
                            className="related-card"
                            key={item.id}
                        >

                            <img
                                src={getImageUrl(item.images?.[0])}
                                alt={item.title}
                            />

                            <div className="detail-rating">
                                {"★".repeat(item.rateCount || 0)}
                            </div>

                            <h4>{item.title}</h4>

                            <strong>
                                {formatPrice(item.finalPrice)}
                            </strong>

                            <span>VIEW PRODUCT</span>

                        </Link>

                    ))}

                </div>

            </section>
            <Services />

        </div>
    );
};

export default ProductDetails;