import React from 'react';

export default function Lightbox() {
  return (
    <>
<div className="lightbox-overlay" id="lightbox">
        <button className="lightbox-close" onClick={(e) => { window.closeLightbox() }} aria-label="Close lightbox"><i
                className="fas fa-times"></i></button>
        <button className="lightbox-nav lightbox-prev" onClick={(e) => { window.lightboxNav(-1) }} aria-label="Previous image"><i
                className="fas fa-chevron-left"></i></button>
        <img id="lightboxImg" alt="Gallery image preview" />
        <button className="lightbox-nav lightbox-next" onClick={(e) => { window.lightboxNav(1) }} aria-label="Next image"><i
                className="fas fa-chevron-right"></i></button>
    </div>
    </>
  );
}
