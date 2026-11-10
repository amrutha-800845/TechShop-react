import React from "react";
import { Link } from "react-router-dom";

import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaChevronUp
} from "react-icons/fa";

// Footer Menu Data
const footMenu = [
    {
        id: 1,
        title: "Help",
        menu: [
            { id: 1, link: "FAQs", path: "/" },
            { id: 2, link: "Track Order", path: "/" },
            { id: 3, link: "Cancel Order", path: "/" },
            { id: 4, link: "Return Order", path: "/" },
            { id: 5, link: "Warranty Info", path: "/" }
        ]
    },
    {
        id: 2,
        title: "Policies",
        menu: [
            { id: 1, link: "Return Policy", path: "/" },
            { id: 2, link: "Security", path: "/" },
            { id: 3, link: "Sitemap", path: "/" },
            { id: 4, link: "Privacy Policy", path: "/" },
            { id: 5, link: "Terms & Conditions", path: "/" }
        ]
    },
    {
        id: 3,
        title: "Company",
        menu: [
            { id: 1, link: "About Us", path: "/" },
            { id: 2, link: "Contact Us", path: "/" },
            { id: 3, link: "Service Centres", path: "/" },
            { id: 4, link: "Careers", path: "/" },
            { id: 5, link: "Affiliates", path: "/" }
        ]
    }
];

// Social Media Data
const footSocial = [
    {
        id: 1,
        icon: FaFacebookF,
        path: "/"
    },
    {
        id: 2,
        icon: FaTwitter,
        path: "/"
    },
    {
        id: 3,
        icon: FaInstagram,
        path: "/"
    },
    {
        id: 4,
        icon: FaLinkedinIn,
        path: "/"
    }
];

function Footer() {

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="footer">

            {/* Footer Top Section */}
            <div className="footer-top">

                <div className="footer-subscribe">

                    <h3>Tech-Shop</h3>

                    <p>
                        Subscribe to our Email alerts to receive
                        early discount offers, and new products info.
                    </p>

                    <input
                        type="email"
                        placeholder="Email Address*"
                    />

                    <button>Subscribe</button>

                </div>

                {/* Footer Menus */}
                <div className="footer-menus">

                    {footMenu.map((section) => (

                        <div className="footer-menu" key={section.id}>

                            <h4>{section.title}</h4>

                            {section.menu.map((item) => (

                                <Link to={item.path} key={item.id}>
                                    {item.link}
                                </Link>

                            ))}

                        </div>

                    ))}

                </div>

            </div>

            {/* Footer Bottom Section */}
            <div className="footer-bottom">

                <p>2026 | All Rights Reserved ©.</p>

                <div className="footer-right">

                    {/* Social Media Icons */}
                    <div className="social-icons">

                        {footSocial.map((social) => {

                            const Icon = social.icon;

                            return (
                                <Link to={social.path} key={social.id}>
                                    <Icon />
                                </Link>
                            );

                        })}

                    </div>

                    {/* Scroll To Top Button */}
                    <button
                        className="scroll-top"
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                    >
                        <FaChevronUp />
                    </button>

                </div>

            </div>

        </footer>
    );
}

export default Footer;