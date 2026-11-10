import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();

    return (
        <div className="signup-box">

            <button
                type="button"
                className="signup-close"
                onClick={() => navigate("/")}
            >
                ×
            </button>

            <h2>Signup</h2>

            <p>
                Already have an account?
                <Link to="/login"> Login</Link>
            </p>

            <form>

                <input type="text" placeholder="Username" required />

                <input type="email" placeholder="Email" required />

                <input type="password" placeholder="Password" required />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                />

                <button type="submit" className="signup-btn">
                    Signup
                </button>

            </form>

            <div className="signup-divider">
                <span></span>
                <h4>or login with</h4>
                <span></span>
            </div>

            <div className="signup-social">
                <button type="button" className="facebook">Facebook</button>
                <button type="button" className="google">Google</button>
                <button type="button" className="twitter">Twitter</button>
            </div>

        </div>
    );
};

export default Signup;