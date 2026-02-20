import React, { useState } from 'react';
import { Menu, Bell, Search, User, Settings, LogOut } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    {
      id: 1,
      title: 'New Course Added',
      message: 'React Advanced Patterns added',
      time: '2 min ago',
      unread: true
    }
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-30">
      <div className="px-4 flex justify-between h-16">

        {/* LEFT */}
        <div className="flex items-center">
          {onToggleSidebar && (
            <button onClick={onToggleSidebar}>
              <Menu size={24} />
            </button>
          )}

          <h1 className="ml-4 text-xl font-semibold">
            Admin Dashboard
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
            <input
              className="pl-8 border rounded px-2 py-1"
              placeholder="Search..."
            />
          </div>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={20} />
            </button>

            {showNotifications && (
              <div className="absolute right-0 bg-white shadow w-64 mt-2">
                {notifications.map(n => (
                  <div key={n.id} className="p-2 border-b">
                    {n.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* USER */}
          <div className="relative">
            <button onClick={() => setShowUserMenu(!showUserMenu)}>
              {user?.name || 'Admin'}
            </button>

            {showUserMenu && (
              <div className="absolute right-0 bg-white shadow w-48 mt-2">
                <button onClick={() => navigate('/admin/profile')}>
                  Profile
                </button>

                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
