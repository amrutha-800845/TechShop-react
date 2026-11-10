import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";


const UserMenu = () => {
    return (
        <div className="user-menu">

            <FaUser className="user-icon" />

            <div className="user-card">

                <h2>Hello!</h2>

                <h3>Access account and manage orders</h3>

                <Link to="/login">
                    <button>Login / Signup</button>
                </Link>

                <hr />

                <h4>Please Login</h4>

            </div>

        </div>
    );
};

export default UserMenu;