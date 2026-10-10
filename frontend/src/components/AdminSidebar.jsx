import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, clearSession, getAdminName } from '../api';

const LINKS = [
  { page: 'admin-dashboard', path: '/admin/dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
  { page: 'admin-gallery', path: '/admin/gallery', icon: 'fa-images', label: 'Manage Gallery' },
  { page: 'admin-news', path: '/admin/news', icon: 'fa-newspaper', label: 'Manage News' },
  { page: 'admin-admissions', path: '/admin/admissions', icon: 'fa-user-graduate', label: 'Manage Admissions' },
  { page: 'admin-content', path: '/admin/content', icon: 'fa-edit', label: 'Manage Content' },
  { page: 'admin-enquiries', path: '/admin/enquiries', icon: 'fa-envelope', label: 'Manage Enquiries' },
];

export default function AdminSidebar({ active, isOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.logout();
    clearSession();
    navigate('/admin/login');
  };

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="admin-user">
        <div className="au-avatar"><i className="fas fa-user-shield"></i></div>
        <h4>{getAdminName()}</h4><small>Super Admin</small>
      </div>
      <nav>
        {LINKS.map((link) => (
          <a
            key={link.page}
            href="#"
            className={active === link.page ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); navigate(link.path); }}
            data-page={link.page}
          >
            <i className={`fas ${link.icon}`}></i> {link.label}
          </a>
        ))}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); handleLogout(); }}
          style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </nav>
    </div>
  );
}
