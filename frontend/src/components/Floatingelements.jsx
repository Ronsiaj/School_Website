import React from 'react';

export default function Floatingelements() {
  return (
    <>
<button className="scroll-top" id="scrollTopBtn" onClick={(e) => { window.scrollTo({top:0,behavior:'smooth'}) }}
        aria-label="Scroll to top"><i className="fas fa-chevron-up"></i></button>
    <a href="#" className="float-admission" onClick={(e) => { e.preventDefault(); window.navigateTo('admissions'); }}><i
            className="fas fa-graduation-cap"></i> Admissions Open</a>
    <a href="https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20admissions."
        className="float-whatsapp" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i
            className="fab fa-whatsapp"></i></a>
    </>
  );
}
