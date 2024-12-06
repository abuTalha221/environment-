import React, { useState } from 'react';

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'users':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">User Management</h2>
            <p className="text-gray-600">Manage user accounts here. View details, delete users, or update user information.</p>
            <table className="min-w-full table-auto mt-6 bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-indigo-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Example user rows */}
                <tr>
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4">John Doe</td>
                  <td className="px-6 py-4">john.doe@example.com</td>
                  <td className="px-6 py-4">
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Notifications</h2>
            <ul className="mt-6">
              <li className="bg-yellow-100 shadow-lg rounded-lg p-4 mb-2">New user signed up: John Doe</li>
              <li className="bg-yellow-100 shadow-lg rounded-lg p-4 mb-2">User Jane Smith updated their profile</li>
            </ul>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Settings</h2>
            <p>Manage system settings and preferences here.</p>
          </div>
        );
      case 'profile':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Admin Profile</h2>
            <p>Edit your personal profile information here.</p>
          </div>
        );
      case 'reports':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Reports</h2>
            <p>Generate and view various system reports.</p>
          </div>
        );
      case 'logs':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">System Logs</h2>
            <p>View system logs and activity tracking.</p>
          </div>
        );
      case 'activity':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Activity Tracking</h2>
            <p>Track recent admin and user activities in the system.</p>
          </div>
        );
      case 'edit-profile':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
            <p>Edit your personal and contact information.</p>
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-indigo-500 text-white shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-bold">Total Users</h3>
                <p className="text-3xl font-semibold mt-4">100</p>
              </div>
              <div className="bg-pink-500 text-white shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-bold">Pending Account Deletions</h3>
                <p className="text-3xl font-semibold mt-4">2</p>
              </div>
              <div className="bg-yellow-500 text-white shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-bold">New Notifications</h3>
                <p className="text-3xl font-semibold mt-4">5</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex flex-col">
        <div className="py-4 px-6 bg-purple-700 font-bold text-lg">Admin Panel</div>
        <ul className="flex-grow px-4 py-6">
          <li
            className={`py-2 px-4 rounded-lg cursor-pointer mb-2 ${selectedMenu === 'dashboard' ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            onClick={() => setSelectedMenu('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={`py-2 px-4 rounded-lg cursor-pointer mb-2 ${selectedMenu === 'users' ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            onClick={() => setSelectedMenu('users')}
          >
            User Management
          </li>
          <li
            className={`py-2 px-4 rounded-lg cursor-pointer mb-2 ${selectedMenu === 'notifications' ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            onClick={() => setSelectedMenu('notifications')}
          >
            Notifications
          </li>
          <li
            className={`py-2 px-4 rounded-lg cursor-pointer mb-2 ${selectedMenu === 'settings' ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            onClick={() => setSelectedMenu('settings')}
          >
            Settings
          </li>
          <li
            className={`py-2 px-4 rounded-lg cursor-pointer mb-2 ${selectedMenu === 'profile' ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            onClick={() => setSelectedMenu('profile')}
          >
            Admin Profile
          </li>
          <li
            className={`py-2 px-4 rounded-lg cursor-pointer mb-2 ${selectedMenu === 'edit-profile' ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            onClick={() => setSelectedMenu('edit-profile')}
          >
            Edit Profile
          </li>
          <li
            className={`py-2 px-4 rounded-lg cursor-pointer mb-2 ${selectedMenu === 'reports' ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            onClick={() => setSelectedMenu('reports')}
          >
            Reports
          </li>
          <li
            className={`py-2 px-4 rounded-lg cursor-pointer mb-2 ${selectedMenu === 'logs' ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            onClick={() => setSelectedMenu('logs')}
          >
            System Logs
          </li>
          <li
            className={`py-2 px-4 rounded-lg cursor-pointer mb-2 ${selectedMenu === 'activity' ? 'bg-purple-600' : 'hover:bg-purple-600'}`}
            onClick={() => setSelectedMenu('activity')}
          >
            Activity Tracking
          </li>
        </ul>
        <div className="px-4 py-4">
          <button
            onClick={() => alert("Logging out...")}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
