import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { LayoutDashboard, BookOpen, Users, User, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { admin, loading, logout } = useAdmin();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading admin panel...</p>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  const navLinks = [
    { to: '/admin/home',    label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/admin/courses', label: 'Courses',   icon: <BookOpen className="w-5 h-5" /> },
    { to: '/admin/users',   label: 'Users',     icon: <Users className="w-5 h-5" /> },
    { to: '/admin/profile', label: 'Profile',   icon: <User className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col p-6">

        {/* Logo */}
        <h2 className="text-2xl font-bold mb-2">Admin Panel</h2>

        {/* Logged in user */}
        <p className="text-blue-200 text-sm mb-8 truncate">{admin?.email}</p>

        {/* Nav links */}
        <nav className="space-y-2 flex-1">
          {navLinks.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'hover:bg-blue-700 text-white'
                }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-blue-700 transition text-white mt-4"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;