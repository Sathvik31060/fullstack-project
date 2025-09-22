import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link for navigation
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";

// Navigation Links
const NavLinks = [
  {
    id: "1",
    name: "Home",
    link: "/home",
  },
  {
    id: "2",
    name: "Cars",
    link: "/cars",
  },
  {
    id: "3",
    name: "About",
    link: "/about", // Ensure this is linking to /about
  },
  {
    id: "4",
    name: "Booking",
    link: "/booking",
  },
  {
    id: "5",
    name: "Login",
    link: "/",
  },
 
];

const Navbar = ({ theme, setTheme }) => {
  // Toggle the theme between light and dark modes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >
      <div className="container mx-auto px-4 py-4 md:py-0">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <h1 className="text-xl font-bold">Car Rental</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {NavLinks.map((data) => (
                <li key={data.id} className="py-4">
                  <Link
                    to={data.link} // Use Link for navigation
                    className="py-2 hover:border-b-2 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300 text-lg font-medium"
                    aria-label={data.name}
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Toggle Icon */}
          <div onClick={toggleTheme} className="cursor-pointer">
            {theme === "dark" ? (
              <BiSolidSun className="text-2xl" />
            ) : (
              <BiSolidMoon className="text-2xl" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
