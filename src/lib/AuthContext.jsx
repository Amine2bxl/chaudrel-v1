import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const noopAsync = async () => null;

export const AuthProvider = ({ children }) => {
  const value = {
    user: null,
    isAuthenticated: false,
    isLoadingAuth: false,
    isLoadingPublicSettings: false,
    authError: null,
    appPublicSettings: null,
    authChecked: true,
    logout: noopAsync,
    navigateToLogin: noopAsync,
    checkUserAuth: noopAsync,
    checkAppState: noopAsync,
  };
  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
