import React from "react";
import SliderModule from "react-slick";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";

const SlickSlider = SliderModule.default || SliderModule;

const Carousel = () => {

  const navigate = useNavigate();

  const products = useSelector(
    (state) => state.product.data
  );

  // Navigate to the respective product details page
  const handleShopNow = (productName) => {

    const product = products.find(
      (item) => item.title === productName
    );

    if (product) {
      navigate(`/product/${product.id}`);
    } else {
      console.log("Product not found:", productName);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover: true,
    pauseOnFocus: false,
    cssEase: "ease-in-out"
  };

  return (
    <div className="container mt-5">

      <SlickSlider {...settings}>

        {/* SLIDE 1 */}
        <div>
          <div className="hero">

            <p className="bgname">Over Ear</p>

            <div className="row align-items-center">

              <div className="col-lg-8">

                <h4>JBL Live 660NC</h4>

                <h1>Keep The Noise Out,</h1>
                <h1>Or in. You Choose</h1>

                <p>
                  ₹9,999
                  <span>₹14,999</span>
                </p>

                <button
                  className="btn1"
                  onClick={() => handleShopNow("JBL Live 660NC")}
                >
                  Shop Now
                </button>

              </div>

              <div className="col-lg-4">
                <img
                  src="/jbl660nc-1.png"
                  alt="JBL Live 660NC"
                  className="image"
                />
              </div>

            </div>
          </div>
        </div>


        {/* SLIDE 2 */}
        <div>
          <div className="hero">

            <p className="bgname">In Ear</p>

            <div className="row align-items-center">

              <div className="col-lg-8">

                <h4>boAt Airdopes 131</h4>

                <h1>Featherweight For</h1>
                <h1>Comfort All-Day.</h1>

                <p>
                  ₹1,099
                  <span>₹2,999</span>
                </p>

                <button
                  className="btn1"
                  onClick={() => handleShopNow("boAt Airdopes 131")}
                >
                  Shop Now
                </button>

              </div>

              <div className="col-lg-4">
                <img
                  src="/boat131-3.png"
                  alt="boAt Airdopes 131"
                  className="image"
                />
              </div>

            </div>
          </div>
        </div>


        {/* SLIDE 3 */}
        <div>
          <div className="hero">

            <p className="bgname">Over Ear</p>

            <div className="row align-items-center">

              <div className="col-lg-8">

                <h4>Sony WH-XB910N</h4>

                <h1>Give Your Favourite</h1>
                <h1>Music A Boost.</h1>

                <p>
                  ₹13,489
                  <span>₹19,990</span>
                </p>

                <button
                  className="btn1"
                  onClick={() => handleShopNow("Sony WH-XB910N")}
                >
                  Shop Now
                </button>

              </div>

              <div className="col-lg-4">
                <img
                  src="/sonyXb910n-1.png"
                  alt="Sony WH-XB910N"
                  className="image"
                />
              </div>

            </div>
          </div>
        </div>

      </SlickSlider>
    </div>
  );
};

export default Carousel;