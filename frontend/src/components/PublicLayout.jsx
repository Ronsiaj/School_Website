import React from 'react';
import { Outlet } from 'react-router-dom';
import Announcementbar from './Announcementbar';
import Navbar from './Navbar';
import Footer from './Footer';
import Floatingelements from './Floatingelements';
import Admissionpopup from './Admissionpopup';
import Lightbox from './Lightbox';
import Toastcontainer from './Toastcontainer';

export default function PublicLayout() {
  return (
    <>
      <Announcementbar />
      <Navbar />
      <main id="mainContent">
        <Outlet />
      </main>
      <Footer showSidebarLayout={false} />
      <Floatingelements />
      <Admissionpopup />
      <Lightbox />
      <Toastcontainer />
    </>
  );
}
