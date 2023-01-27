import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute2 = ({ isAuthenticated }) => {

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}

export default ProtectedRoute2;