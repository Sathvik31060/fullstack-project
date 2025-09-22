import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();

  const sendOTP = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });
      const res = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      
      setOtpSent(true);
      setMessage({ text: res.data.message, type: "success" });
      startResendCountdown();
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "Failed to send OTP. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setMessage({ text: "Please enter a valid 6-digit OTP", type: "error" });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { 
        email, 
        otp 
      });
      
      setMessage({ text: res.data.message, type: "success" });
      localStorage.setItem("authToken", res.data.token);
      navigate("/dashboard"); // Redirect after successful login
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "Invalid OTP. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  const startResendCountdown = () => {
    setResendDisabled(true);
    let timer = 60;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resendOTP = async () => {
    if (resendDisabled) return;
    await sendOTP();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            OTP Authentication
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {otpSent 
              ? "Enter the 6-digit OTP sent to your email" 
              : "Enter your email to receive an OTP"}
          </p>
        </div>

        {message.text && (
          <div className={`rounded-md p-4 ${message.type === "error" ? "bg-red-50" : "bg-green-50"}`}>
            <div className={`text-sm ${message.type === "error" ? "text-red-700" : "text-green-700"}`}>
              {message.text}
            </div>
          </div>
        )}

        <div className="mt-8 space-y-6">
          {!otpSent ? (
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <button
                onClick={sendOTP}
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          ) : (
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength="6"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  disabled={loading}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="6-digit OTP"
                />
              </div>
              <button
                onClick={verifyOTP}
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </button>
              <div className="text-center text-sm text-gray-600">
                <button 
                  onClick={resendOTP} 
                  disabled={resendDisabled}
                  className={`font-medium ${resendDisabled ? 'text-gray-400' : 'text-blue-600 hover:text-blue-500'}`}
                >
                  {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPLogin;