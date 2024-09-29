// AuthenticatedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function AuthenticatedRoute({ children }) {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect them to the login page, but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default AuthenticatedRoute