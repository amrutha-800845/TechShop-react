import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
    increaseQuantity,
    decreaseQuantity,
    removeCart,
    clearCart
} from "../Redux/cartSlice";

import { FaTrash, FaShoppingCart, FaTimes } from "react-icons/fa";

const Cart = () => {

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) => state.cart.data
    );

    // Calculate original price
    const originalTotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.originalPrice) * item.quantity,
        0
    );

    // Calculate final price
    const finalTotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.finalPrice) * item.quantity,
        0
    );

    // Calculate discount
    const discount = originalTotal - finalTotal;

    // Format price
    const formatPrice = (price) =>
        `₹${price.toLocaleString("en-IN")}`;

    // EMPTY CART
    if (cartItems.length === 0) {

        return (

            <div className="empty-cart-container">

                {/* Empty Cart Icon */}
                <div className="empty-cart-icon">

                    <FaShoppingCart />

                    <FaTimes className="empty-cart-cross" />

                </div>

                {/* Empty Cart Message */}
                <h3>Your Cart is Empty</h3>

                {/* Start Shopping */}
                <Link to="/" className="start-shopping-btn">
                    Start Shopping
                </Link>

            </div>

        );
    }

    return (

        <div className="cart-page">



            <div className="cart-layout">

                {/* LEFT SIDE - CART PRODUCTS */}

                <div className="cart-items">

                    {cartItems.map((item) => (

                        <div className="cart-item" key={item.id}>

                            {/* Product Image */}
                            <div className="cart-item-image">

                                <img
                                    src={item.images?.[0]}
                                    alt={item.title}
                                />

                            </div>

                            {/* Product Details */}
                            <div className="cart-item-details">

                                <h4>{item.title}</h4>

                                <p>{item.info}</p>

                                {/* Price */}
                                <div className="cart-item-price">

                                    <strong>
                                        {formatPrice(Number(item.finalPrice))}
                                    </strong>

                                    <del>
                                        {formatPrice(Number(item.originalPrice))}
                                    </del>

                                </div>

                                {/* Quantity */}
                                <div className="quantity-control">

                                    <button
                                        onClick={() =>
                                            dispatch(decreaseQuantity(item.id))
                                        }
                                    >
                                        −
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        onClick={() =>
                                            dispatch(increaseQuantity(item.id))
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                            {/* Remove Product */}
                            <button
                                className="remove-item"
                                onClick={() =>
                                    dispatch(removeCart(item.id))
                                }
                                title="Remove product"
                            >
                                <FaTrash />
                            </button>

                        </div>

                    ))}

                </div>

                {/* RIGHT SIDE - PRICE DETAILS */}

                <div className="cart-summary">

                    <div className="summary-row">

                        <span>Original Price</span>

                        <strong>
                            {formatPrice(originalTotal)}
                        </strong>

                    </div>

                    <div className="summary-row">

                        <span>Discount</span>

                        <strong className="discount">
                            - {formatPrice(discount)}
                        </strong>

                    </div>

                    <div className="summary-row">

                        <span>Delivery</span>

                        <strong className="free">
                            Free
                        </strong>

                    </div>

                    <hr />

                    {/* Total Price */}
                    <div className="summary-total">

                        <h3>Total Price</h3>

                        <h3>
                            {formatPrice(finalTotal)}
                        </h3>

                    </div>

                    {/* Checkout */}
                    <button className="checkout-btn">
                        CHECKOUT
                    </button>

                    {/* Clear Cart */}
                    <button
                        className="clear-cart-btn"
                        onClick={() => dispatch(clearCart())}
                    >
                        CLEAR CART
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Cart;