import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import admissionPoster from '../assets/admission_poster.png';

export default function Admissionpopup() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/admin')) {
      setShow(false);
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className={`modal-overlay ${show ? 'show' : ''}`} id="admissionPopup">
        <div className="modal-box"
          style={{ position: 'relative', padding: '0', background: 'transparent', boxShadow: 'none', maxWidth: '650px', overflow: 'visible' }}>
          <button className="modal-close" onClick={handleClose} aria-label="Close"
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--white)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', zIndex: '10' }}>
            <i className="fas fa-times"></i>
          </button>
          <img src={admissionPoster} alt="Admissions Open"
            style={{ width: '100%', height: 'auto', maxHeight: '90vh', objectFit: 'contain', display: 'block', borderRadius: 'var(--radius-lg)', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', margin: '0 auto' }} />
        </div>
      </div>
    </>
  );
}
