import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar";
import Routings from "./Routers/Routings";
import Footer from "./Components/Footer";

function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }, [location.pathname]);

    return (
        <>
            <Navbar />
            <Routings />

            {/* Hide Footer only on Cart page */}
            {location.pathname !== "/cart" && <Footer />}
        </>
    );
}

export default App;