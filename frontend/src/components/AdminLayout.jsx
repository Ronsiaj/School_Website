import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // We can derive active page from pathname for the sidebar
  let active = 'admin-dashboard';
  if (location.pathname.includes('/gallery')) active = 'admin-gallery';
  if (location.pathname.includes('/news')) active = 'admin-news';
  if (location.pathname.includes('/achievements')) active = 'admin-achievements';
  if (location.pathname.includes('/content')) active = 'admin-content';
  if (location.pathname.includes('/enquiries')) active = 'admin-enquiries';
  if (location.pathname.includes('/admissions')) active = 'admin-admissions';

  return (
    <div className="admin-layout" style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', display: 'flex', flexDirection: 'column' }}>
      <div 
        className={`admin-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} 
        onClick={() => setSidebarOpen(false)}
      ></div>
      <AdminSidebar active={active} isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="admin-main" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 0 }}>
        <div className="admin-mobile-header" style={{ padding: '1rem', background: 'var(--white)', display: 'flex', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <button 
            onClick={() => setSidebarOpen(true)}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--charcoal)', cursor: 'pointer', padding: '0.5rem' }}
          >
            <i className="fas fa-bars"></i>
          </button>
          <h2 style={{ marginLeft: '1rem', fontSize: '1.2rem', margin: 0, color: 'var(--maroon)' }}>Admin Panel</h2>
        </div>
        <div className="admin-content-area" style={{ flex: 1, padding: '2rem' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
