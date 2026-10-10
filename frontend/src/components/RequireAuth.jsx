import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, isLoggedIn, clearSession } from '../api';

export default function RequireAuth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoggedIn()) {
        setIsLoading(false);
        return;
      }
      try {
        await auth.me(); // Verify token with backend
        setIsAuthenticated(true);
      } catch (err) {
        clearSession();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f6f9' }}>
        <div style={{ textAlign: 'center' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--maroon)' }}></i>
          <p style={{ marginTop: '1rem', color: 'var(--charcoal-light)' }}>Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
