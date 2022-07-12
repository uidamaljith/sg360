import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth';

export const RequireAuth = ({ children }) => {
  //const auth = useAuth();
  const auth = localStorage.token;
  if (!auth) {
    return <Navigate to='/login'></Navigate>
  }
  return children
};