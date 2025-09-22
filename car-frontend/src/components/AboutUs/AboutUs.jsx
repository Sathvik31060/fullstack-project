import React from "react";
import CarPng from "../../assets/images/car1.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const AboutUs = () => {
  // Data for features section
  const features = [
    {
      name: "Reliable Service",
      description: "We offer dependable vehicles and prompt services.",
      icon: <i className="fas fa-car-side" aria-hidden="true"></i>,
      delay: 100,
      link: "#reliable",
    },
    {
      name: "Affordable Pricing",
      description: "Competitive pricing with the best value for your money.",
      icon: <i className="fas fa-dollar-sign" aria-hidden="true"></i>,
      delay: 200,
      link: "#pricing",
    },
    {
      name: "Wide Range of Cars",
      description: "Diverse selection of vehicles for all your needs.",
      icon: <i className="fas fa-car" aria-hidden="true"></i>,
      delay: 300,
      link: "#fleet",
    },
  ];

  // Footer navigation links
  const footerLinks = [
    {
      title: "Home",
      link: "/",
      ariaLabel: "Go to home page",
    },
    {
      title: "About",
      link: "/about",
      ariaLabel: "Learn more about us",
    },
    {
      title: "Contact",
      link: "/contact",
      ariaLabel: "Contact us",
    },
    {
      title: "Blog",
      link: "/blog",
      ariaLabel: "Read our blog",
    },
  ];

  // Social media links
  const socialMedia = [
    {
      icon: <FaInstagram aria-label="Instagram" />,
      url: "https://instagram.com/yourprofile",
      name: "Instagram",
    },
    {
      icon: <FaFacebook aria-label="Facebook" />,
      url: "https://facebook.com/yourpage",
      name: "Facebook",
    },
    {
      icon: <FaLinkedin aria-label="LinkedIn" />,
      url: "https://linkedin.com/yourprofile",
      name: "LinkedIn",
    },
  ];

  return (
    <div className="dark:bg-dark bg-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div data-aos="slide-right" data-aos-duration="1500" className="flex justify-center">
            <img
              src={CarPng}
              alt="Luxury rental car"
              className="max-h-[300px] sm:scale-125 sm:-translate-x-8 drop-shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold font-serif">
              About Our Company
            </h1>
            <p data-aos="fade-up" className="text-lg leading-relaxed">
              RSS Motors specializes in premium car rentals, offering you the freedom to travel in style and comfort.
            </p>
            <p data-aos="fade-up">
              As a market leader, we provide an extensive selection of vehicles to suit every need, from economy cars to luxury models, all maintained to the highest standards.
            </p>
            <button
              data-aos="fade-up"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Explore Our Fleet
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="dark:bg-black dark:text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-serif font-semibold">
              Why Choose RSS Motors
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={feature.delay}
                className="bg-dark hover:bg-primary text-white hover:text-black p-8 rounded-lg transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 grid place-items-center">
                  {feature.icon}
                </div>
                <h2 className="text-2xl font-bold mb-3">{feature.name}</h2>
                <p className="mb-4">{feature.description}</p>
                <a
                  href={feature.link}
                  className="inline-block font-semibold text-primary group-hover:text-black transition-colors duration-300"
                  aria-label={`Learn more about ${feature.name}`}
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-100 dark:bg-dark rounded-t-3xl mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-serif">RSS Motors</h2>
              <p className="text-sm">
                Premium car rental services for all your travel needs.
              </p>
              <address className="not-italic space-y-2">
                <div className="flex items-center gap-3">
                  <FaLocationArrow aria-hidden="true" />
                  <span>L.B Nagar, Hyderabad, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMobileAlt aria-hidden="true" />
                  <a href="tel:+91123456789">+91 123456789</a>
                </div>
              </address>
              <div className="flex gap-4 pt-4">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-primary transition-colors duration-300"
                    aria-label={`Visit our ${social.name} page`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 col-span-2">
              {["Navigation", "Company", "Support"].map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                  <h3 className="text-lg font-bold">{section}</h3>
                  <ul className="space-y-2">
                    {footerLinks.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.link}
                          className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300"
                          aria-label={link.ariaLabel}
                        >
                          <span aria-hidden="true">→</span>
                          <span>{link.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;