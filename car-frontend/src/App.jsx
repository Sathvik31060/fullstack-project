import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import AboutUs from "./components/AboutUs/AboutUs";
import CarList from "./components/CarList/CarList";
import Booking from "./components/Booking/Booking";
import Payment from "./components/Payment/Payment";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
//import KYCForm from "./components/KYCForm/KYCForm";
import ServicesList from "./components/ServiceList/ServiceList";
import AOS from "aos";
import "aos/dist/aos.css";
import Testimonial from "./components/Testimonial/Testimonial";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminSignup from "./components/AdminSignup/AdminSignup";
import Admin from "./components/Admin/Admin";
const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;

  // Handling theme change
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Initialize AOS (Animate on Scroll)
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          {/* Protected routes */}
          <Route
            path="/home"
            element={isAuthenticated ? <Hero theme={theme} /> : <Navigate to="/" />}
          />
          <Route
            path="/about"
            element={isAuthenticated ? <AboutUs /> : <Navigate to="/" />}
          />
         <Route
            path="/Footer"
            element={isAuthenticated ? <Footer /> : <Navigate to="/" />}
          />
           
          <Route
            path="/cars"
            element={isAuthenticated ? <CarList /> : <Navigate to="/" />}
          />
          <Route
            path="/booking"
            element={isAuthenticated ? <Booking /> : <Navigate to="/" />}
          />
          <Route
            path="/payment"
            element={isAuthenticated ? <Payment /> : <Navigate to="/" />}
          />
           <Route
            path="/ServiceList"
            element={isAuthenticated ? <ServicesList /> : <Navigate to="/" />}
          />
           <Route
            path="/Testimonial"
            element={isAuthenticated ? <Testimonial /> : <Navigate to="/" />}
          />
          
           <Route
            path="/AdminLogin"
            element={isAuthenticated ? <AdminLogin/> : <Navigate to="/" />}
          />
           <Route
            path="/AdminSignup"
            element={isAuthenticated ? <AdminSignup/> : <Navigate to="/" />}
          />
          <Route
            path="/Admin"
            element={isAuthenticated ? <Admin/> : <Navigate to="/" />}
          />
          
          
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback for undefined routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
