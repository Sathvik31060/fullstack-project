import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
//import { saveAs } from 'file-saver';

// Import your payment method icons
import bankIcon from "../../assets/images/bank.png";
import masterCardIcon from "../../assets/images/master-card.jpg";
import paypalIcon from "../../assets/images/paypal.png";
import qrIcon from "../../assets/images/qr-icon.jpg"; // Add a QR icon
import qrCodePlaceholder from "../../assets/images/qr-placeholder.jpg";

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [formData, setFormData] = useState({
    accountNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "",
    cardName: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const paymentMethods = [
    {
      id: "bank",
      name: "Bank Transfer",
      icon: bankIcon,
      description: "Direct transfer from your bank account"
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: masterCardIcon,
      description: "Visa, Mastercard, American Express"
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: paypalIcon,
      description: "Pay with your PayPal account"
    },
    {
      id: "qr",
      name: "QR Payment",
      icon: qrIcon,
      description: "Scan to pay with mobile banking"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validation rules
    if (name === "cardNumber" && !/^\d*$/.test(value)) return;
    if (name === "accountNumber" && !/^\d*$/.test(value)) return;
    if (name === "cvv" && !/^\d*$/.test(value)) return;
    
    // Length restrictions
    if (name === "cardNumber" && value.length > 16) return;
    if (name === "accountNumber" && value.length > 12) return;
    if (name === "cvv" && value.length > 4) return;

    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const generateQRCode = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setQrGenerated(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const generatePaymentSlip = () => {
    const slipContent = `
      Payment Receipt
      ----------------------------
      Payment Method: ${paymentDetails.method}
      Date: ${new Date().toLocaleString()}
      Transaction ID: ${Math.random().toString(36).substring(2, 15)}
      
      ${paymentDetails.method === "Bank Transfer" ? `
      Account Number: ${formData.accountNumber}
      ` : paymentDetails.method === "Credit/Debit Card" ? `
      Card Number: **** **** **** ${formData.cardNumber.slice(-4)}
      Card Name: ${formData.cardName}
      ` : paymentDetails.method === "PayPal" ? `
      PayPal Email: ${formData.email}
      ` : `
      QR Payment Completed
      `}
      
      Amount: $${paymentDetails.amount.toFixed(2)}
      Status: Completed
      
      Thank you for your payment!
    `;

    const blob = new Blob([slipContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `payment-receipt-${Date.now()}.txt`);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedPayment) {
      newErrors.paymentMethod = "Please select a payment method";
    }
    
    if (selectedPayment === "bank" && !formData.accountNumber) {
      newErrors.accountNumber = "Account number is required";
    } else if (selectedPayment === "bank" && formData.accountNumber.length < 8) {
      newErrors.accountNumber = "Account number must be at least 8 digits";
    }
    
    if (selectedPayment === "card") {
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required";
      } else if (formData.cardNumber.length !== 16) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }
      
      if (!formData.cardName) {
        newErrors.cardName = "Name on card is required";
      }
      
      if (!formData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
      }
      
      if (!formData.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = "CVV must be 3-4 digits";
      }
    }
    
    if (selectedPayment === "paypal" && !formData.email) {
      newErrors.email = "PayPal email is required";
    } else if (selectedPayment === "paypal" && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set payment details for receipt
      const method = paymentMethods.find(m => m.id === selectedPayment)?.name || "Unknown";
      setPaymentDetails({
        method,
        amount: 2400.00, // You can make this dynamic
        date: new Date().toISOString()
      });
      
      setPaymentSuccess(true);
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden text-center p-8" data-aos="fade-up">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">Thank you for your payment</p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
              <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Method:</span> {paymentDetails.method}</p>
                <p><span className="font-medium">Amount:</span> ${paymentDetails.amount.toFixed(2)}</p>
                <p><span className="font-medium">Date:</span> {new Date(paymentDetails.date).toLocaleString()}</p>
                <p><span className="font-medium">Status:</span> <span className="text-green-500">Completed</span></p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={generatePaymentSlip}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
              >
                Download Payment Slip
              </button>
              <button
                onClick={() => setPaymentSuccess(false)}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors"
              >
                Make Another Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
          <p className="text-gray-600 mt-2">Choose your preferred payment method</p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden" data-aos="fade-up">
          <div className="p-8">
            {/* Payment Method Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mb-2">{errors.paymentMethod}</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedPayment === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedPayment === method.id}
                        onChange={() => {}}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <img
                        src={method.icon}
                        alt={method.name}
                        className="h-8 ml-3 mr-2"
                      />
                      <span className="font-medium text-gray-800">
                        {method.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 ml-7">
                      {method.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            {selectedPayment && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* QR Payment Section */}
                {selectedPayment === "qr" && (
                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      QR Payment
                    </h2>
                    
                    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                      <div className="relative mb-6">
                        <img
                          src={qrCodePlaceholder}
                          alt="QR Code"
                          className={`w-48 h-48 ${!qrGenerated ? "filter blur-sm" : ""}`}
                        />
                        {!qrGenerated && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              <p className="mt-2 text-gray-500">QR code will be generated</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button
                        type="button"
                        onClick={generateQRCode}
                        disabled={isSubmitting || qrGenerated}
                        className={`px-6 py-3 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors ${
                          isSubmitting || qrGenerated ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? "Generating..." : qrGenerated ? "QR Generated" : "Generate QR Code"}
                      </button>
                      
                      {qrGenerated && (
                        <div className="mt-4 text-center">
                          <p className="text-sm text-gray-600">Scan this QR code with your banking app to complete payment</p>
                          <p className="text-xs text-gray-500 mt-2">Expires in 15 minutes</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Other Payment Methods */}
                {selectedPayment !== "qr" && (
                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      {selectedPayment === "bank"
                        ? "Bank Transfer Details"
                        : selectedPayment === "card"
                        ? "Card Details"
                        : "PayPal Details"}
                    </h2>

                    {/* Bank Transfer */}
                    {selectedPayment === "bank" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bank Account Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleInputChange}
                          placeholder="Enter 8-12 digit account number"
                          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.accountNumber ? "border-red-500" : "border-gray-300"
                          }`}
                          maxLength="12"
                        />
                        {errors.accountNumber && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.accountNumber}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Card Payment */}
                    {selectedPayment === "card" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            placeholder="John Smith"
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.cardName ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.cardName && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.cardName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.cardNumber ? "border-red-500" : "border-gray-300"
                            }`}
                            maxLength="16"
                          />
                          {errors.cardNumber && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="month"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.expiryDate ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="MM/YY"
                            />
                            {errors.expiryDate && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.expiryDate}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.cvv ? "border-red-500" : "border-gray-300"
                              }`}
                              maxLength="4"
                            />
                            {errors.cvv && (
                              <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PayPal */}
                    {selectedPayment === "paypal" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PayPal Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || (selectedPayment === "qr" && !qrGenerated)}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out ${
                      isSubmitting || (selectedPayment === "qr" && !qrGenerated) ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Processing..." : "Complete Payment"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;