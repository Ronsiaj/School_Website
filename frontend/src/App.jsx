import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Announcementbar from './components/Announcementbar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Floatingelements from './components/Floatingelements';
import Admissionpopup from './components/Admissionpopup';
import Lightbox from './components/Lightbox';
import Toastcontainer from './components/Toastcontainer';

// Pages
import HomePage from './pages/HomePage';
import AboutSchoolPage from './pages/AboutSchoolPage';
import AdmissionsPage from './pages/AdmissionsPage';
import AcademicsPage from './pages/AcademicsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import CampusPage from './pages/CampusPage';
import LifeatSchoolPage from './pages/LifeatSchoolPage';
import GalleryPage from './pages/GalleryPage';
import NewsAndEventsPage from './pages/NewsAndEventsPage';
import LeadershipPage from './pages/LeadershipPage';
import VisionAndMissionPage from './pages/VisionAndMissionPage';
import WhychooseusPage from './pages/WhychooseusPage';
import ContactPage from './pages/ContactPage';
import AdminloginPage from './pages/AdminloginPage';
import Admindashboard from './pages/Admindashboard';
import Admingallery from './pages/Admingallery';
import Adminnews from './pages/Adminnews';
import Admincontent from './pages/Admincontent';
import AdminEnquiries from './pages/AdminEnquiries';
import Adminadmissions from './pages/Adminadmissions';
import RequireAuth from './components/RequireAuth';

import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Expose navigate to window for inline onclicks temporarily
    window.navigateTo = (page) => {
      // Map old page names to routes
      const routes = {
        'home': '/',
        'about-school': '/about',
        'vision-mission': '/vision-mission',
        'leadership': '/leadership',
        'why-choose-us': '/why-choose-us',
        'academics': '/academics',
        'departments': '/departments',
        'campus': '/campus',
        'life-at-school': '/life-at-school',
        'admissions': '/admissions',
        'gallery': '/gallery',
        'news-events': '/news-events',
        'contact': '/contact',
        'admin-login': '/admin/login',
        'admin-dashboard': '/admin/dashboard',
        'admin-gallery': '/admin/gallery',
        'admin-news': '/admin/news',
        'admin-content': '/admin/content',
        'admin-enquiries': '/admin/enquiries',
        'admin-admissions': '/admin/admissions'
      };
      
      const target = routes[page] || '/';
      navigate(target);
    };

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [navigate, location]);

  return (
    <Routes>
      {/* Public and Auth Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutSchoolPage />} />
        <Route path="/vision-mission" element={<VisionAndMissionPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/why-choose-us" element={<WhychooseusPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/campus" element={<CampusPage />} />
        <Route path="/life-at-school" element={<LifeatSchoolPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/news-events" element={<NewsAndEventsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminloginPage />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
        <Route path="/admin/dashboard" element={<Admindashboard />} />
        <Route path="/admin/gallery" element={<Admingallery />} />
        <Route path="/admin/news" element={<Adminnews />} />
        <Route path="/admin/content" element={<Admincontent />} />
        <Route path="/admin/enquiries" element={<AdminEnquiries />} />
        <Route path="/admin/admissions" element={<Adminadmissions />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
