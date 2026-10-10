import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const isActive = (route) => path === route ? 'active' : '';
  const isAboutActive = ['/about', '/vision-mission', '/why-choose-us', '/leadership'].includes(path) ? 'active' : '';
  const isSchoolActive = ['/academics', '/departments', '/campus', '/life-at-school'].includes(path) ? 'active' : '';

  const handleNav = (page) => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    window.navigateTo(page);
  };

  const toggleDropdown = (e, name) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      <nav className="navbar" id="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
            <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); handleNav('home'); }}>
                <div className="nav-logo">L&S</div>
                <div className="nav-brand-text">
                    <h4>St. Joseph's School</h4>
                    <small>Love & Serve</small>
                </div>
            </a>
            <button 
                className="nav-toggle" 
                id="navToggle" 
                aria-label="Toggle menu" 
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <i className="fas fa-bars"></i>
            </button>
            <div className={`nav-overlay ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} id="navLinks">
                <div className="mobile-drawer-header">
                    <div className="mobile-drawer-brand">
                        <div className="nav-logo" style={{ margin: '0 auto' }}>L&S</div>
                        <h4 style={{ marginTop: '0.5rem', color: '#fff', fontSize: '1.1rem' }}>St. Joseph's</h4>
                    </div>
                    <button className="mobile-drawer-close" onClick={() => setIsMenuOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('home'); }} data-page="home" className={isActive('/')}>Home</a></li>
                <li>
                    <a href="#" className={isAboutActive} onClick={(e) => toggleDropdown(e, 'about')}>
                        About 
                        <i className="fas fa-chevron-down desktop-icon"></i>
                        <i className={`fas ${openDropdown === 'about' ? 'fa-chevron-up' : 'fa-chevron-down'} mobile-icon`}></i>
                    </a>
                    <ul className={`dropdown-menu ${openDropdown === 'about' ? 'open' : ''}`}>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('about-school'); }} data-page="about-school" className={isActive('/about')}>About School</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('vision-mission'); }} data-page="vision-mission" className={isActive('/vision-mission')}>Vision & Mission</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('why-choose-us'); }} data-page="why-choose-us" className={isActive('/why-choose-us')}>Why Choose Us</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('leadership'); }} data-page="leadership" className={isActive('/leadership')}>Leadership</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#" className={isSchoolActive} onClick={(e) => toggleDropdown(e, 'school')}>
                        Our School 
                        <i className="fas fa-chevron-down desktop-icon"></i>
                        <i className={`fas ${openDropdown === 'school' ? 'fa-chevron-up' : 'fa-chevron-down'} mobile-icon`}></i>
                    </a>
                    <ul className={`dropdown-menu ${openDropdown === 'school' ? 'open' : ''}`}>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('academics'); }} data-page="academics" className={isActive('/academics')}>Academics</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('departments'); }} data-page="departments" className={isActive('/departments')}>Departments</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('campus'); }} data-page="campus" className={isActive('/campus')}>Campus</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('life-at-school'); }} data-page="life-at-school" className={isActive('/life-at-school')}>Life at School</a></li>
                    </ul>
                </li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('admissions'); }} data-page="admissions" className={isActive('/admissions')}>Admissions</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('gallery'); }} data-page="gallery" className={isActive('/gallery')}>Gallery</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('news-events'); }} data-page="news-events" className={isActive('/news-events')}>News & Events</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNav('contact'); }} data-page="contact" className={isActive('/contact')}>Contact</a></li>
            </ul>
        </div>
      </nav>
    </>
  );
}
