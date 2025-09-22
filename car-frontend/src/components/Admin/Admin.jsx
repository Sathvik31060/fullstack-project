import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import axios from 'axios';

// Sample data generation functions
const generateUsers = () => {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const firstNames = ['John', 'Jane', 'Robert', 'Emily', 'Michael', 'Sarah', 'David', 'Lisa'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson'];
  
  return Array.from({ length: 15 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return {
      id: i + 1,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      status: Math.random() > 0.2 ? 'active' : 'banned',
      name: `${firstName} ${lastName}`
    };
  });
};

const generateBookings = (users) => {
  const vehicles = [
    { make: 'Toyota', model: 'Camry', type: 'Sedan' },
    { make: 'Honda', model: 'Civic', type: 'Sedan' },
    { make: 'Ford', model: 'F-150', type: 'Truck' },
    { make: 'Tesla', model: 'Model 3', type: 'Electric' },
    { make: 'BMW', model: 'X5', type: 'SUV' },
    { make: 'Mercedes', model: 'C-Class', type: 'Luxury' },
    { make: 'Audi', model: 'A4', type: 'Sedan' },
    { make: 'Jeep', model: 'Wrangler', type: 'SUV' }
  ];
  
  const statuses = ['confirmed', 'pending', 'cancelled'];
  
  return Array.from({ length: 20 }, (_, i) => {
    const user = users[Math.floor(Math.random() * users.length)];
    const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7) + 1);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const dailyRate = 50 + Math.floor(Math.random() * 150);
    const totalPrice = days * dailyRate;
    
    return {
      id: 1000 + i,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      vehicle: {
        ...vehicle,
        year: 2018 + Math.floor(Math.random() * 5),
        licensePlate: `ABC-${Math.floor(1000 + Math.random() * 9000)}`
      },
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      totalPrice: totalPrice,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
    };
  });
};

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    totalBookings: 0,
    activeBookings: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    
    if (isAdminLoggedIn !== 'true') {
      navigate('/AdminLogin');
      return;
    }

    // In a real app, you would fetch from API
    // For demo purposes, we'll use mock data
    const mockUsers = generateUsers();
    const mockBookings = generateBookings(mockUsers);
    
    setUsers(mockUsers);
    setBookings(mockBookings);
    
    // Calculate stats
    setStats({
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter(u => u.status === 'active').length,
      newUsers: Math.floor(mockUsers.length * 0.2), // 20% as new
      totalBookings: mockBookings.length,
      activeBookings: mockBookings.filter(b => b.status === 'confirmed').length,
      revenue: mockBookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, booking) => sum + booking.totalPrice, 0)
    });
    
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUser');
    navigate('/AdminLogin');
  };

  const handleUserManagement = (userId, action) => {
    // In a real app, this would be an API call
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { 
              ...user, 
              status: action === 'ban' ? 'banned' : 
                     action === 'promote' ? 'admin' : 
                     user.status 
            } 
          : user
      )
    );
  };

  const handleBookingAction = (bookingId, action) => {
    // In a real app, this would be an API call
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? {
              ...booking,
              status: action === 'confirm' ? 'confirmed' :
                      action === 'reject' ? 'cancelled' :
                      action === 'cancel' ? 'cancelled' :
                      booking.status
            }
          : booking
      )
    );
    
    // Refresh stats after action
    setStats(prev => ({
      ...prev,
      activeBookings: bookings.filter(b => b.status === 'confirmed').length
    }));
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredBookings = bookings.filter(booking =>
    booking.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${booking.vehicle.make} ${booking.vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="dark:bg-dark bg-slate-100 min-h-screen duration-300">
      {/* Admin Header */}
      <header className="bg-white shadow-sm dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-500">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8" data-aos="fade-up">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 dark:text-gray-300">Total Users</h3>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 dark:text-gray-300">Active Users</h3>
            <p className="text-3xl font-bold text-green-500">{stats.activeUsers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 dark:text-gray-300">Total Bookings</h3>
            <p className="text-3xl font-bold">{stats.totalBookings}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 dark:text-gray-300">Revenue</h3>
            <p className="text-3xl font-bold text-purple-500">${stats.revenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Search and Tabs */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search users or bookings..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'users' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('users')}
            >
              User Management
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'bookings' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('bookings')}
            >
              Booking Management
            </button>
          </div>
        </div>

        {/* Users Table */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden" data-aos="fade-up">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold">User Management</h2>
              <span className="text-sm text-gray-500">{filteredUsers.length} users found</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${user.status === 'active' ? 'bg-green-100 text-green-800' : 
                            user.status === 'admin' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {user.status !== 'admin' && (
                          <>
                            <button
                              onClick={() => handleUserManagement(user.id, 'ban')}
                              className="text-red-600 hover:text-red-900 mr-3"
                              disabled={user.status === 'banned'}
                            >
                              {user.status === 'banned' ? 'Banned' : 'Ban'}
                            </button>
                            <button
                              onClick={() => handleUserManagement(user.id, 'promote')}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Make Admin
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Table */}
        {activeTab === 'bookings' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden" data-aos="fade-up">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Booking Management</h2>
              <span className="text-sm text-gray-500">{filteredBookings.length} bookings found</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredBookings.map((booking) => {
                    const startDate = new Date(booking.startDate);
                    const endDate = new Date(booking.endDate);
                    const isPastBooking = endDate < new Date();
                    
                    return (
                      <tr key={booking.id} className={isPastBooking ? 'opacity-70' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          #{booking.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">{booking.user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {booking.vehicle.make} {booking.vehicle.model}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {booking.vehicle.year} • {booking.vehicle.licensePlate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          <div>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</div>
                          <div className="text-xs text-gray-400">
                            {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} days
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {booking.status}
                            {isPastBooking && booking.status === 'confirmed' && ' (completed)'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          ${booking.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {!isPastBooking && (
                            <>
                              {booking.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleBookingAction(booking.id, 'confirm')}
                                    className="text-green-600 hover:text-green-900 mr-3"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => handleBookingAction(booking.id, 'reject')}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {booking.status === 'confirmed' && (
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'cancel')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Cancel
                                </button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Admin Tools Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">System Announcement</h3>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600"
              rows="3"
              placeholder="Write an announcement for all users..."
            ></textarea>
            <button className="mt-3 bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400">
              Broadcast
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => {
                  alert('Generating report...');
                }}
              >
                Generate Monthly Report
              </button>
              <button 
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={() => {
                  alert('Database backup initiated...');
                }}
              >
                Backup Database
              </button>
              <button 
                className="w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                onClick={() => {
                  alert('Showing system logs...');
                }}
              >
                View System Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;