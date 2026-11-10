import React from "react";
import * as SliderModule from "react-slick";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";

const SlickSlider =
  SliderModule.default?.default ||
  SliderModule.default ||
  SliderModule;

const Slides = () => {

  const navigate = useNavigate();

  // Get products from Redux
  const reduxProducts = useSelector(
    (state) => state.product.data
  );

  const products = [
    {
      id: 1,
      name: "boAt ROckerz 255",
      image: "boat255r-1.png",
      price: "₹899",
      discount: "₹2,990"
    },
    {
      id: 2,
      name: "JBL Endurance Run Sports",
      image: "jbl-endu-1.png",
      price: "₹999",
      discount: "₹1,599"
    },
    {
      id: 3,
      name: "boAt Airdopes 203",
      image: "boat203-1.png",
      price: "₹1,074",
      discount: "₹3,999"
    },
    {
      id: 4,
      name: "boAt Rockerz 518",
      image: "boat518-1.png",
      price: "₹1,299",
      discount: "₹3,990"
    },
    {
      id: 5,
      name: "JBL Tune 760NC",
      image: "jbl760nc-1.png",
      price: "₹5,999",
      discount: "₹7,999"
    }
  ];

  // Handle image click
  const handleProductClick = (productName) => {

    const selectedProduct = reduxProducts.find(
      (item) =>
        item.title.toLowerCase() === productName.toLowerCase()
    );

    if (selectedProduct) {
      navigate(`/product/${selectedProduct.id}`);
    } else {
      console.log("Product not found:", productName);
    }
  };

  // Duplicate products for continuous scrolling
  const sliderProducts = [...products, ...products];

  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "0px",

    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    cssEase: "ease-in-out",

    arrows: false,
    dots: true,

    pauseOnHover: true,
    pauseOnFocus: false,
    rtl: false,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true
        }
      }
    ]
  };

  return (
    <div style={{ textAlign: "center" }}>

      <section className="product-section">

        <h2 className="slider-heading">
          Featured Products
        </h2>

        <div
          className="slider-container"
          style={{ marginTop: "10px" }}
        >

          <SlickSlider {...settings}>

            {sliderProducts.map((product, index) => (

              <div key={`${product.id}-${index}`}>

                <div className="product-card">

                  <h5>{product.name}</h5>

                  {/* CLICKABLE PRODUCT IMAGE */}
                  <img
                    src={`/${product.image}`}
                    alt={product.name}
                    className="product-image w-50"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleProductClick(product.name)
                    }
                  />

                  <h4>
                    {product.price}

                    <del
                      style={{
                        color: "#999",
                        fontSize: "15px",
                        marginLeft:"10px"
                      }}
                    >
                      {product.discount}
                    </del>
                  </h4>

                </div>

              </div>

            ))}

          </SlickSlider>

        </div>

      </section>

    </div>
  );
};

export default Slides;