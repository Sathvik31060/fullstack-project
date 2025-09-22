import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import car1 from "../../assets/images/white-car.png";
import car2 from "../../assets/images/car5.png";
import car3 from "../../assets/images/car6.png";
import rent1 from "../../assets/images/rent1.jpg";
import rent2 from "../../assets/images/rent2.jpg";
import rent3_1 from "../../assets/images/rent3.jpg";
import rent4 from "../../assets/images/rent4.png";
import rent5 from "../../assets/images/rent5.png";
import premiumCar1 from "../../assets/images/banner.png";
import premiumCar2 from "../../assets/images/Enzo.png";
import premiumCar3 from "../../assets/images/must.png";
import rentt1 from "../../assets/images/rentt.jpg";
import rentt6 from "../../assets/images/renttttt.png";
import prem1 from "../../assets/images/prem1.png";
import prem2 from "../../assets/images/mg.jpg";
import rentt2 from "../../assets/images/renttt.jpg";
import prem3 from "../../assets/images/kia.png";
import rentt4 from "../../assets/images/image.png";
import rentt3 from "../../assets/images/rentttt.jpg";
import prem4 from "../../assets/images/ford.png";
import premiumj from "../../assets/images/jag.png";

const carList = [
  { 
    name: "Range Rover", 
    price: 500, 
    image: car1,
    details: {
      engine: "3.0L Turbocharged V6",
      transmission: "8-Speed Automatic",
      seats: 5,
      fuelType: "Diesel",
      features: ["4WD", "Panoramic Sunroof", "Touch Pro Duo Infotainment", "Meridian Sound System"],
      description: "The Range Rover combines luxury with off-road capability, offering a premium driving experience with advanced technology and refined comfort."
    }
  },
  { 
    name: "Scorpio Nepolian", 
    price: 140, 
    image: car2,
    details: {
      engine: "2.2L mHawk Diesel",
      transmission: "6-Speed Manual",
      seats: 7,
      fuelType: "Diesel",
      features: ["4WD", "Touchscreen Infotainment", "Climate Control", "Rear AC Vents"],
      description: "The Mahindra Scorpio N is a rugged SUV known for its powerful performance and spacious interior, perfect for family trips and off-road adventures."
    }
  },
  { 
    name: "Scorpio 2014", 
    price: 100, 
    image: car3,
    details: {
      engine: "2.2L mHawk Diesel",
      transmission: "5-Speed Manual",
      seats: 7,
      fuelType: "Diesel",
      features: ["4WD", "Power Steering", "Manual AC", "CD Player"],
      description: "The classic Scorpio offers reliable performance with robust build quality, suitable for both city driving and rough terrains."
    }
  },
  { 
    name: "Innova v4", 
    price: 120, 
    image: rent1,
    details: {
      engine: "2.4L Diesel",
      transmission: "5-Speed Manual",
      seats: 8,
      fuelType: "Diesel",
      features: ["Automatic Climate Control", "Touchscreen Infotainment", "Rear Parking Camera", "Dual Airbags"],
      description: "Toyota Innova is a versatile MPV known for its exceptional comfort, reliability and spacious cabin, making it ideal for family trips."
    }
  },
  { 
    name: "Maruthi Suzuki Swift", 
    price: 90, 
    image: rent2,
    details: {
      engine: "1.2L K-Series Petrol",
      transmission: "5-Speed Manual",
      seats: 5,
      fuelType: "Petrol",
      features: ["Touchscreen Infotainment", "Automatic Climate Control", "Keyless Entry", "Dual Airbags"],
      description: "The Swift is a popular hatchback known for its peppy performance, excellent mileage and agile handling, perfect for city driving."
    }
  },
  { 
    name: "Audi A3", 
    price: 210, 
    image: rent3_1,
    details: {
      engine: "2.0L TFSI Petrol",
      transmission: "7-Speed S tronic",
      seats: 5,
      fuelType: "Petrol",
      features: ["Virtual Cockpit", "MMI Touch Display", "Panoramic Sunroof", "Quattro AWD"],
      description: "The Audi A3 combines luxury and sportiness in a compact package, offering premium features and dynamic performance."
    }
  },
  { 
    name: "Honda City", 
    price: 180, 
    image: rent4,
    details: {
      engine: "1.5L i-VTEC Petrol",
      transmission: "CVT Automatic",
      seats: 5,
      fuelType: "Petrol",
      features: ["LaneWatch Camera", "Touchscreen Infotainment", "Sunroof", "Eco Assist System"],
      description: "The Honda City is a premium sedan known for its refined engine, spacious cabin and advanced features, offering a comfortable driving experience."
    }
  },
  { 
    name: "Fortuner", 
    price: 190, 
    image: rent5,
    details: {
      engine: "2.8L Diesel",
      transmission: "6-Speed Automatic",
      seats: 7,
      fuelType: "Diesel",
      features: ["4WD", "Touchscreen Infotainment", "Cruise Control", "Dual Zone AC"],
      description: "The Toyota Fortuner is a powerful SUV with commanding road presence, offering luxury, performance and off-road capability."
    }
  },
  { 
    name: "Kia Seltos", 
    price: 190, 
    image: prem3,
    details: {
      engine: "1.5L Turbo Petrol",
      transmission: "7-Speed DCT",
      seats: 5,
      fuelType: "Petrol",
      features: ["10.25-inch Touchscreen", "Bose Sound System", "Ventilated Seats", "Smart Pure Air Purifier"],
      description: "The Kia Seltos is a feature-packed compact SUV with stylish design, premium interiors and multiple powertrain options."
    }
  },
  { 
    name: "MG-Hector", 
    price: 190, 
    image: prem2,
    details: {
      engine: "1.5L Turbo Petrol",
      transmission: "6-Speed Manual",
      seats: 5,
      fuelType: "Petrol",
      features: ["10.4-inch Touchscreen", "Panoramic Sunroof", "Connected Car Tech", "Ambient Lighting"],
      description: "The MG Hector offers a perfect blend of technology and comfort with its internet car features and premium cabin experience."
    }
  },
  { 
    name: "Benz C-Class", 
    price: 190, 
    image: rentt2,
    details: {
      engine: "2.0L Turbo Petrol",
      transmission: "9-Speed Automatic",
      seats: 5,
      fuelType: "Petrol",
      features: ["MBUX Infotainment", "Ambient Lighting", "Memory Seats", "Burmester Sound System"],
      description: "The Mercedes-Benz C-Class epitomizes luxury with its elegant design, cutting-edge technology and superb driving dynamics."
    }
  },
  { 
    name: "Ford-Explorer", 
    price: 190, 
    image: prem4,
    details: {
      engine: "3.0L EcoBoost V6",
      transmission: "10-Speed Automatic",
      seats: 7,
      fuelType: "Petrol",
      features: ["SYNC 4 Infotainment", "Panoramic Vista Roof", "360-Degree Camera", "Ford Co-Pilot360"],
      description: "The Ford Explorer is a spacious three-row SUV offering powerful performance, advanced safety features and modern technology."
    }
  },
  { 
    name: "Skoda Slavia", 
    price: 190, 
    image: rentt3,
    details: {
      engine: "1.5L TSI Petrol",
      transmission: "7-Speed DSG",
      seats: 5,
      fuelType: "Petrol",
      features: ["10-inch Touchscreen", "Ventilated Seats", "Sunroof", "Connected Car Tech"],
      description: "The Skoda Slavia is a premium sedan with European design, superior build quality and engaging driving dynamics."
    }
  },
  { 
    name: "Skoda Kushaq", 
    price: 190, 
    image: rentt1,
    details: {
      engine: "1.0L TSI Petrol",
      transmission: "6-Speed Automatic",
      seats: 5,
      fuelType: "Petrol",
      features: ["10-inch Touchscreen", "Ventilated Seats", "Sunroof", "Connected Car Tech"],
      description: "The Skoda Kushaq is a compact SUV with bold styling, premium interiors and efficient TSI engines, offering great value."
    }
  },
];

const premiumCarList = [
  { 
    name: "BMW 7 Series", 
    price: 900, 
    image: premiumCar1,
    details: {
      engine: "3.0L Turbocharged I6",
      transmission: "8-Speed Automatic",
      seats: 5,
      fuelType: "Petrol",
      features: ["iDrive 7.0", "Gesture Control", "Bowers & Wilkins Sound", "Executive Lounge"],
      description: "The BMW 7 Series is the epitome of luxury and technology, offering unparalleled comfort, cutting-edge features and powerful performance."
    }
  },
  { 
    name: "Ferrari spyder", 
    price: 1000, 
    image: premiumCar2,
    details: {
      engine: "3.9L Twin-Turbo V8",
      transmission: "7-Speed Dual-Clutch",
      seats: 2,
      fuelType: "Petrol",
      features: ["Retractable Hard Top", "Manettino Dial", "Carbon Ceramic Brakes", "Ferrari Dynamic Enhancer"],
      description: "The Ferrari Spider is the ultimate expression of Italian performance and style, offering breathtaking acceleration and open-top driving pleasure."
    }
  },
  { 
    name: "Mustang", 
    price: 1200, 
    image: premiumCar3,
    details: {
      engine: "5.0L V8",
      transmission: "10-Speed Automatic",
      seats: 4,
      fuelType: "Petrol",
      features: ["Active Valve Exhaust", "MagneRide Damping", "12-inch Digital Cluster", "Recaro Seats"],
      description: "The Ford Mustang is an American icon, delivering thrilling V8 power, muscular styling and modern technology in a legendary package."
    }
  },
  { 
    name: "Lexus", 
    price: 1200, 
    image: rentt4,
    details: {
      engine: "3.5L V6 Hybrid",
      transmission: "E-CVT",
      seats: 5,
      fuelType: "Hybrid",
      features: ["Mark Levinson Sound", "Heated/Ventilated Seats", "Panoramic View Monitor", "Lexus Safety System+"],
      description: "Lexus offers exceptional refinement with whisper-quiet cabins, impeccable build quality and advanced hybrid technology for effortless performance."
    }
  },
  { 
    name: "Lexus", 
    price: 1200, 
    image: rentt6,
    details: {
      engine: "3.5L V6 Hybrid",
      transmission: "E-CVT",
      seats: 5,
      fuelType: "Hybrid",
      features: ["Mark Levinson Sound", "Heated/Ventilated Seats", "Panoramic View Monitor", "Lexus Safety System+"],
      description: "Lexus offers exceptional refinement with whisper-quiet cabins, impeccable build quality and advanced hybrid technology for effortless performance."
    }
  },
  { 
    name: "Benz-S Class", 
    price: 1200, 
    image: prem1,
    details: {
      engine: "3.0L Inline-6 Turbo",
      transmission: "9-Speed Automatic",
      seats: 5,
      fuelType: "Petrol",
      features: ["MBUX Hyperscreen", "Energizing Comfort", "Rear Executive Seats", "Burmester 4D Sound"],
      description: "The Mercedes-Benz S-Class sets the benchmark for luxury vehicles with its innovative technology, sublime comfort and impeccable craftsmanship."
    }
  },
  { 
    name: "Jaguar", 
    price: 1200, 
    image: premiumj,
    details: {
      engine: "5.0L Supercharged V8",
      transmission: "8-Speed Automatic",
      seats: 4,
      fuelType: "Petrol",
      features: ["Touch Pro Duo", "Meridian Sound System", "Configurable Dynamics", "Activity Key"],
      description: "Jaguar combines British elegance with thrilling performance, offering dynamic handling, sumptuous interiors and distinctive styling."
    }
  },
];

const CarList = () => {
  const [selectedCars, setSelectedCars] = useState([]);
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (car) => {
    setSelectedCars((prevSelectedCars) => {
      if (prevSelectedCars.includes(car)) {
        return prevSelectedCars.filter((selectedCar) => selectedCar !== car);
      } else {
        return [...prevSelectedCars, car];
      }
    });
  };

  const handleBooking = () => {
    if (selectedCars.length > 0) {
      navigate("/booking", { state: { car: selectedCars[0] } });
    } else {
      alert("Please select a car to book.");
    }
  };

  const showCarDetails = (car) => {
    setSelectedCarDetails(car);
    setShowDetailsModal(true);
  };

  const closeModal = () => {
    setShowDetailsModal(false);
  };

  return (
    <div className="pb-24">
      <div className="container">
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">Rent a Car</h1>
        <p className="text-sm pb-10">
          Our Rental car services are available in the majority of cities in India.
        </p>

        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Standard Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {carList.map((data, index) => (
              <div key={index} className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group">
                <div className="w-full h-[120px]">
                  <img src={data.image} alt={data.name} className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${data.price}/Day</p>
                    <button 
                      onClick={() => showCarDetails(data)}
                      className="text-blue-600 hover:underline"
                    >
                      Details
                    </button>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    id={`car-${index}`}
                    onChange={() => handleCheckboxChange(data)}
                  />
                  <label htmlFor={`car-${index}`} className="text-sm ml-2"></label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mt-16 mb-6">Premium Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {premiumCarList.map((data, index) => (
              <div key={index} className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group">
                <div className="w-full h-[120px]">
                  <img src={data.image} alt={data.name} className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${data.price}/Day</p>
                    <button 
                      onClick={() => showCarDetails(data)}
                      className="text-blue-600 hover:underline"
                    >
                      Details
                    </button>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <input
                    type="checkbox"
                    id={`premium-car-${index}`}
                    onChange={() => handleCheckboxChange(data)}
                  />
                  <label htmlFor={`premium-car-${index}`} className="text-sm ml-2"></label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        {selectedCars.length > 0 && (
          <div className="grid place-items-center mt-8">
            <button className="button-outline" onClick={handleBooking}>
              Book Now
            </button>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedCarDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedCarDetails.name}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <img 
                    src={selectedCarDetails.image} 
                    alt={selectedCarDetails.name} 
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-xl font-semibold mt-4">${selectedCarDetails.price}/Day</p>
                </div>
                
                <div className="md:w-1/2">
                  <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                  <ul className="space-y-2 mb-4">
                    <li><strong>Engine:</strong> {selectedCarDetails.details.engine}</li>
                    <li><strong>Transmission:</strong> {selectedCarDetails.details.transmission}</li>
                    <li><strong>Seats:</strong> {selectedCarDetails.details.seats}</li>
                    <li><strong>Fuel Type:</strong> {selectedCarDetails.details.fuelType}</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {selectedCarDetails.details.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p>{selectedCarDetails.details.description}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedCars([selectedCarDetails]);
                    closeModal();
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Select This Car
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;