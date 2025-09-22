import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import axios from 'axios'; // NEW
import CarPng from "../../assets/images/LoginLambo.png";
import OTPLogin from '../OTPLogin/OTPLogin';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [useOTP, setUseOTP] = useState(false);
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

  // NEW: Updated handleSignUp with Axios
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (passwordStrength === "Weak") {
      setErrorMessage('Password is too weak. Please choose a stronger password.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:1234/api/auth/signup',
        { email, password }
      );
      if (response.status === 200) {
        alert('Signup successful!');
        navigate('/Login');
      }
    } catch (error) {
      setErrorMessage('Signup failed. Email may already exist.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/Login');
  };

  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          {/* Left side: Car Image (unchanged) */}
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt="Car"
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>

          {/* Right side: SignUp Form (unchanged UI) */}
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold font-serif">
                {useOTP ? "OTP Login" : "Sign Up"}
              </h1>

              {useOTP ? (
                <OTPLogin />
              ) : (
                <form data-aos="fade-up" onSubmit={handleSignUp} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Enter your email"
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
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePasswordStrength(e.target.value);
                      }}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Enter your password"
                    />
                    <p className={`text-sm ${passwordStrength === 'Strong' ? 'text-green-500' : passwordStrength === 'Moderate' ? 'text-orange-500' : 'text-red-500'}`}>
                      {passwordStrength} Password
                    </p>
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Re-enter Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Re-enter your password"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-yellow-500 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-400 hover:scale-105 transition-transform duration-300"
                  >
                    Sign Up
                  </button>
                </form>
              )}

              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}

              <p data-aos="fade-up" className="text-sm text-gray-600">
                Already have an account?{' '}
                <span
                  onClick={handleLoginRedirect}
                  className="text-yellow-500 cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>

              <p
                onClick={() => setUseOTP(!useOTP)}
                className="text-blue-500 cursor-pointer text-sm text-center hover:underline"
              >
                {useOTP ? "Use Password Instead" : "Login with OTP"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;