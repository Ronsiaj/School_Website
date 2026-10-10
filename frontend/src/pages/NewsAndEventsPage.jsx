import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { news, imageUrl } from '../api';

export default function NewsAndEventsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    news.list('all')
      .then((data) => setItems(data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="page-section" id="page-news-events">
        <div className="page-banner">
          <h1>News & Events</h1>
          <p>Stay updated with the latest from St. Joseph's</p>
          <div className="breadcrumb">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a><span>/</span><span>News & Events</span>
          </div>
        </div>
        <div className="section-padding">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem'
            }}>
              {loading && <p>Loading…</p>}
              {!loading && items.length === 0 && <p>Nothing here yet — check back soon.</p>}
              {!loading && items.map((n) => (
                <div 
                  key={n.id} 
                  style={{
                    background: '#fcfcfc',
                    border: '1px solid #e0e0e0',
                    padding: '1rem',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onClick={() => n.image && setPreviewImage(imageUrl(n.image))}
                >
                  <div style={{ marginBottom: '1rem', borderBottom: '2px solid var(--maroon)', paddingBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: '#333' }}>
                      {n.title}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.3rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      {n.event_date}
                    </div>
                  </div>

                  {n.image && (
                    <div style={{ overflow: 'hidden', border: '1px solid #ccc', marginBottom: '1rem', background: '#eee' }}>
                      <img 
                        src={imageUrl(n.image)} 
                        alt={n.title} 
                        style={{ width: '100%', display: 'block', objectFit: 'cover' }} 
                        loading="lazy" 
                      />
                    </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#444', lineHeight: 1.6, textAlign: 'justify' }}>
                      {n.description}
                    </p>
                  </div>
                  
                  {n.image && (
                    <div style={{ marginTop: '1rem', textAlign: 'right', fontSize: '0.85rem', color: 'var(--maroon)', fontWeight: 'bold' }}>
                      View Full <i className="fas fa-search-plus"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newspaper Modal */}
      {previewImage && (
        <div 
          className="modal-overlay show" 
          style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.85)' }}
          onClick={() => setPreviewImage(null)}
        >
          <div 
            style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setPreviewImage(null)} 
              style={{ position: 'absolute', top: '-40px', right: '-10px', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', opacity: 0.8 }}
            >
              <i className="fas fa-times"></i>
            </button>
            <img 
              src={previewImage} 
              alt="Full view" 
              style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '4px', objectFit: 'contain', boxShadow: '0 4px 30px rgba(0,0,0,0.5)' }} 
            />
          </div>
        </div>
      )}
    </>
  );
}
