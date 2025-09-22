import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import axios from 'axios';
import CarPng from "../../assets/images/mclaren.png";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isAdminLoggedIn === 'true') navigate('/Admin');
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:1234/api/auth/login',
        { email, password }
      );
      if (response.status === 200) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify(response.data));
        alert('Admin Login Successful!');
        navigate('/Admin');
      }
    } catch (error) {
      setErrorMessage('Invalid admin credentials.');
    }
  };

  const handleUserLoginRedirect = () => {
    navigate('/Login');
  };

  const handleAdminSignUpRedirect = () => {
    navigate('/AdminSignUp');
  };

  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          {/* Left side: Car Image */}
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt="Car"
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>

          {/* Right side: Login Form */}
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold font-serif">
                Admin Login
              </h1>
              <form data-aos="fade-up" onSubmit={handleLogin} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter admin email"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-yellow-500 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-400 hover:scale-105 transition-transform duration-300"
                >
                  Admin Login
                </button>
              </form>

              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}

              <div data-aos="fade-up" className="text-sm text-gray-600 space-y-1">
                <p>
                  Not an admin?{' '}
                  <span
                    onClick={handleUserLoginRedirect}
                    className="text-yellow-500 cursor-pointer hover:underline"
                  >
                    User Login
                  </span>
                </p>
                <p>
                  Don't have an admin account?{' '}
                  <span
                    onClick={handleAdminSignUpRedirect}
                    className="text-yellow-500 cursor-pointer hover:underline"
                  >
                    Sign Up for Admin
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;