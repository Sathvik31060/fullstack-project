import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import axios from 'axios';
import CarPng from "../../assets/images/LoginLambo.png";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: '',
    confirmAdminCode: ''
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [showConfirmAdminCode, setShowConfirmAdminCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const validatePasswordStrength = (password) => {
    let strength = "Weak";
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      strength = "Strong";
    } else if (password.length >= 6 && (/[A-Z]/.test(password) || /[0-9]/.test(password))) {
      strength = "Moderate";
    }
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      validatePasswordStrength(value);
    }

    // Clear error when typing
    if (errorMessage) setErrorMessage('');
  };

  const validateAdminCode = (code) => {
    return code === '121289';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Validate all fields
    if (!formData.name || !formData.email || !formData.password || 
        !formData.confirmPassword || !formData.adminCode || !formData.confirmAdminCode) {
      setErrorMessage('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    if (formData.adminCode !== formData.confirmAdminCode) {
      setErrorMessage('Admin codes do not match.');
      setIsSubmitting(false);
      return;
    }

    // Strict validation for admin code
    if (!validateAdminCode(formData.adminCode)) {
      setErrorMessage('Invalid Admin Code. Please enter the correct admin code.');
      setIsSubmitting(false);
      return;
    }

    if (passwordStrength === "Weak") {
      setErrorMessage('Password is too weak. Please choose a stronger password.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:1234/api/auth/admin/signup',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          adminCode: formData.adminCode
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Code-Verified': 'true'
          }
        }
      );

      if (response.status === 200) {
        alert('Admin account created successfully!');
        navigate('/admin/login');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Admin signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

          {/* Right side: Admin SignUp Form */}
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold font-serif">
                Admin Sign Up
              </h1>
              <p className="text-sm text-gray-600">Restricted access - Admin code required</p>

              <form data-aos="fade-up" onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  <p className={`text-sm ${passwordStrength === 'Strong' ? 'text-green-500' : passwordStrength === 'Moderate' ? 'text-orange-500' : 'text-red-500'}`}>
                    {passwordStrength} Password
                  </p>
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Re-enter Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Re-enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Admin Code Input */}
                <div className="relative">
                  <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700">
                    Admin Code
                  </label>
                  <input
                    type={showAdminCode ? "text" : "password"}
                    id="adminCode"
                    name="adminCode"
                    value={formData.adminCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter admin code ()"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowAdminCode(!showAdminCode)}
                  >
                    {showAdminCode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Confirm Admin Code Input */}
                <div className="relative">
                  <label htmlFor="confirmAdminCode" className="block text-sm font-medium text-gray-700">
                    Re-enter Admin Code
                  </label>
                  <input
                    type={showConfirmAdminCode ? "text" : "password"}
                    id="confirmAdminCode"
                    name="confirmAdminCode"
                    value={formData.confirmAdminCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Re-enter admin code"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmAdminCode(!showConfirmAdminCode)}
                  >
                    {showConfirmAdminCode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-yellow-500 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-400 hover:scale-105 transition-transform duration-300 w-full ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Admin Account'}
                </button>
              </form>

              {errorMessage && (
                <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-md">
                  {errorMessage}
                </div>
              )}

              <p data-aos="fade-up" className="text-sm text-gray-600 text-center">
                Already have an admin account?{' '}
                <span
                  onClick={() => navigate('/admin/login')}
                  className="text-yellow-500 cursor-pointer hover:underline"
                >
                  Admin Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;