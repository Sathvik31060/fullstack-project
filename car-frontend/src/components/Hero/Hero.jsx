import React from "react";
import PropTypes from "prop-types";
import img1 from "../../assets/images/car.png"; // Adjust the path based on the actual locationz
import img2 from "../../assets/images/banner-car.png";

const Hero = ({ theme }) => {
  return (
    <div className="dark:bg-black dark:text-white duration-300 relative z-20">
      <div className="container min-h-[620px] flex items-center">
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Text Section */}
          <div className="order-2 sm:order-1 space-y-5 sm:pr-32">
            <p
              data-aos="fade-up"
              data-aos-duration="600"
              className="text-yellow-500 text-2xl font-serif mb-4"
            >
              Effortless
            </p>
            <h1
              data-aos="fade-up"
              data-aos-duration="600"
              className="text-5xl lg:text-5xl font-bold font-serif leading-tight mb-6"
            >
              Car Rental
            </h1>
            <p 
            data-aos = "fade-up"
            data-aos-delay="1000"
            className="text-lg mb-6">
              Rent a car with us and enjoy a hassle-free travel experience.
            </p>
            <button 
            data-aos = "fade-up"
            data-aos-delay="1500"
            className="bg-yellow-500 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-400 hover:scale-105 transition-transform duration-300">
              Get Started
            </button>
          </div>

          {/* Image Section */}
          <div    
            data-aos="zoom-in"
            data-aos-duration="1500"
            className="order-1 sm:order-2"
          >
            <img
              loading="lazy"
              src={theme === "dark" ? img1 : img2}
              alt="Car rental service banner"
              className="relative -z-10 max-h-[600px] sm:scale-125 drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop type validation
Hero.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default Hero;
