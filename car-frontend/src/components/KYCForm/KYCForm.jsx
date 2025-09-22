import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaAddressCard, FaIdCard, FaCamera, FaCheckCircle } from "react-icons/fa";
//import './KYCForm.css';

function KYCForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    idProof: "",
    selfie: null,
    selfiePreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      selfie: file,
      selfiePreview: URL.createObjectURL(file),
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ KYC Submitted Successfully!");
  };

  return (
    <motion.div className="kyc-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {step === 1 && (
        <motion.div className="step" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
          <h2><FaUser /> Enter Your Name</h2>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <button onClick={nextStep}>Next →</button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div className="step" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
          <h2><FaAddressCard /> Enter Address</h2>
          <input type="text" name="address" placeholder="Street, City, ZIP" onChange={handleChange} required />
          <button onClick={prevStep}>← Back</button>
          <button onClick={nextStep}>Next →</button>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div className="step" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
          <h2><FaIdCard /> Select ID Proof</h2>
          <select name="idProof" onChange={handleChange} required>
            <option value="">Select ID</option>
            <option value="passport">Passport</option>
            <option value="driver_license">Driver's License</option>
          </select>
          <button onClick={prevStep}>← Back</button>
          <button onClick={nextStep}>Next →</button>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div className="step" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
          <h2><FaCamera /> Upload Selfie</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
          {formData.selfiePreview && <img src={formData.selfiePreview} alt="Selfie Preview" className="selfie-preview" />}
          <button onClick={prevStep}>← Back</button>
          <button onClick={nextStep}>Next →</button>
        </motion.div>
      )}

      {step === 5 && (
        <motion.div className="step" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <h2><FaCheckCircle /> Confirm & Submit</h2>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>ID Proof:</strong> {formData.idProof}</p>
          {formData.selfiePreview && <img src={formData.selfiePreview} alt="Selfie Preview" className="selfie-preview" />}
          <button onClick={prevStep}>← Back</button>
          <button onClick={handleSubmit} className="submit-btn">Submit KYC</button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default KYCForm;
