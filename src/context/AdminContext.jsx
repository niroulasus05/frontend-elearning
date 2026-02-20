import React, { createContext, useState, useContext } from 'react';
import { STORAGE_KEYS } from '../constants/constants';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {

  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ADMIN);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to parse admin:', error);
      localStorage.removeItem(STORAGE_KEYS.ADMIN);
      return null;
    }
  });

  const login = (adminData) => {
    localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN);
    setAdmin(null);
  };

  const isAuthenticated = !!admin;

  return (
    <AdminContext.Provider
      value={{
        admin,
        login,
        logout,
        isAuthenticated,
        loading: false
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export default AdminContext;
