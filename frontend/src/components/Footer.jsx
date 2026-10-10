import React from 'react';

export default function Footer({ showSidebarLayout }) {
  return (
    <>
<footer className={`footer ${showSidebarLayout ? 'admin-footer' : ''}`} role="contentinfo">
        <div className="footer-grid">
            <div className="footer-brand">
                <h3>St. Joseph's School</h3>
                <p>A premier institution dedicated to academic excellence, character formation, and holistic development
                    since 1965. Guided by our motto — Love & Serve.</p>
                <div className="footer-social">
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            <div className="footer-col">
                <h4>Quick Links</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('about-school'); }}>About School</a>
                <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('academics'); }}>Academics</a>
                <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('admissions'); }}>Admissions</a>
                <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('gallery'); }}>Gallery</a>
                <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('contact'); }}>Contact Us</a>
            </div>
            <div className="footer-col">
                <h4>Our School</h4>
                <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('vision-mission'); }}>Vision & Mission</a>
                <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('leadership'); }}>Leadership</a>
                <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('departments'); }}>Departments</a>
                <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('campus'); }}>Campus</a>
                <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('achievements-page'); }}>Achievements</a>
            </div>
            <div className="footer-col">
                <h4>Contact Info</h4>
                <a href="tel:+918012345678"><i className="fas fa-phone-alt"
                        style={{"marginRight":"0.5rem","color":"var(--gold)"}}></i>+91 80 1234 5678</a>
                <a href="mailto:info@stjosephsschool.edu"><i className="fas fa-envelope"
                        style={{"marginRight":"0.5rem","color":"var(--gold)"}}></i>info@stjosephsschool.edu</a>
                <a href="#"><i className="fas fa-map-marker-alt" style={{"marginRight":"0.5rem","color":"var(--gold)"}}></i>123
                    Education Lane, Knowledge City</a>
                <a href="#"><i className="fas fa-clock" style={{"marginRight":"0.5rem","color":"var(--gold)"}}></i>Mon–Sat: 8AM –
                    4PM</a>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2025 St. Joseph's School. All rights reserved. | Love & Serve</p>
        </div>
    </footer>
    </>
  );
}
