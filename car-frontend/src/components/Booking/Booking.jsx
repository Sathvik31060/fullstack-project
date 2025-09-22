import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCar = location.state?.car || null;

  const [formData, setFormData] = useState({
    carName: selectedCar?.name || "",
    rentalPrice: selectedCar?.price || "",
    fullName: "",
    email: "",
    phone: "",
    licenseNumber: "", // Added license number
    startDate: "",
    endDate: "",
    totalPrice: 0,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      calculateTotalPrice();
    }
  }, [formData.startDate, formData.endDate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required";

    if (!formData.licenseNumber.trim())
      newErrors.licenseNumber = "License number is required";
    else if (!/^[a-zA-Z0-9]{16}$/.test(formData.licenseNumber))
      newErrors.licenseNumber = "License number must be exactly 16 alphanumeric characters";

    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) > new Date(formData.endDate)
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const calculateTotalPrice = () => {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    if (startDate && endDate && startDate <= endDate) {
      const timeDiff = endDate - startDate;
      const dayCount = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Count both start and end days
      const totalPrice = dayCount * parseFloat(formData.rentalPrice);
      setFormData((prevData) => ({ ...prevData, totalPrice }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const confirmPayment = window.confirm(
        `Your total booking price is ${formData.totalPrice.toFixed(2)}. Do you want to proceed to payment?`
      );

      if (confirmPayment) {
        navigate("/payment", { state: { bookingDetails: formData } });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for date input min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Booking
          </h1>
          <p className="text-gray-600">
            Fill in your details to reserve the {formData.carName}
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden" data-aos="fade-up">
          <div className="md:flex">
            {/* Left side - Car Summary */}
            <div className="md:w-1/3 bg-gray-900 text-white p-8">
              <h2 className="text-xl font-semibold mb-6">Booking Summary</h2>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Vehicle</h3>
                <p className="text-gray-300">{formData.carName}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Rental Rate</h3>
                <p className="text-2xl font-bold text-blue-400">
                  ${formData.rentalPrice}{" "}
                  <span className="text-sm font-normal text-gray-400">/ day</span>
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Rental Period</h3>
                {formData.startDate && formData.endDate ? (
                  <>
                    <p className="text-gray-300">
                      {new Date(formData.startDate).toLocaleDateString()} -{" "}
                      {new Date(formData.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      (
                      {Math.ceil(
                        (new Date(formData.endDate) - new Date(formData.startDate)) /
                          (1000 * 3600 * 24)
                      ) + 1}{" "}
                      days)
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400">Select dates</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-lg font-medium mb-2">Total Amount</h3>
                <p className="text-3xl font-bold text-blue-400">
                  ${formData.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Right side - Booking Form */}
            <div className="md:w-2/3 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-gray-800">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.fullName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter Full Name SIR"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="User@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Number & License Number side by side */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="licenseNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        License Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="licenseNumber"
                        name="licenseNumber"
                        maxLength={16}
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.licenseNumber ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter 16-character license"
                      />
                      {errors.licenseNumber && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.licenseNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rental Details */}
                <div className="pt-6 border-t border-gray-200">
                  <h2 className="text-xl font-semibold mb-6 text-gray-800">
                    Rental Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pick-Up Date */}
                    <div>
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Pick-Up Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        min={today}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.startDate ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.startDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.startDate}
                        </p>
                      )}
                    </div>

                    {/* Drop-Off Date */}
                    <div>
                      <label
                        htmlFor="endDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Drop-Off Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        min={formData.startDate || today}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.endDate ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.endDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.endDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        Total Amount
                      </h3>
                      <p className="text-sm text-gray-500">
                        Including all taxes and fees
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      ${formData.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Processing..." : "Proceed to Payment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;