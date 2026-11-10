import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaFacebookF,
    FaGoogle,
    FaTwitter
} from "react-icons/fa";

const Login = () => {

    const navigate = useNavigate();

    return (

        <div className="login-box">

            {/* Close Button */}
            <button
                type="button"
                className="signup-close"
                onClick={() => navigate("/")}
            >
                ×
            </button>

            <h2>Login</h2>

            <p>
                New to Tech-Shop?
                <Link to="/signup"> Create an account</Link>
            </p>

            {/* Login Form */}
            <form>

                <input
                    type="email"
                    placeholder="Email"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    required
                />

                <button type="submit" className="signup-btn">
                    Login
                </button>

            </form>

            {/* Social Login Divider */}
            <div className="signup-divider">

                <span></span>

                <h4>or login with</h4>

                <span></span>

            </div>

            {/* Social Login Icons */}
            <div className="signup-social">

                <button type="button" className="facebook">
                    <FaFacebookF />
                    <span>Facebook</span>
                </button>

                <button type="button" className="google">
                    <FaGoogle />
                    <span>Google</span>
                </button>

                <button type="button" className="twitter">
                    <FaTwitter />
                    <span>Twitter</span>
                </button>

            </div>

        </div>
    );
};

export default Login;