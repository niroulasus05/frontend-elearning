import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function Admin() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation bar */}
      <Navbar />

      {/* Layout with sidebar and main content */}
      <div className="flex">

        {/* Main content area */}
        <main className="flex-1 p-6">
          {/* Nested routes render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin;
