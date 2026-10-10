import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gallery, imageUrl } from '../api';

const TABS = ['all', 'campus', 'events', 'sports', 'achievements'];

export default function GalleryPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [active, setActive] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    gallery.list(active)
      .then((data) => setItems(data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <>
      <section className="page-section" id="page-gallery">
        <div className="page-banner">
          <h1>Gallery</h1>
          <p>Moments captured from our vibrant campus life</p>
          <div className="breadcrumb">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a><span>/</span><span>Gallery</span>
          </div>
        </div>
        <div className="section-padding">
          <div className="container">
            <div className="news-tabs" style={{ marginBottom: '2rem' }}>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`news-tab ${active === tab ? 'active' : ''}`}
                  onClick={() => setActive(tab)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="gallery-page-grid" id="galleryPageGrid">
              {loading && <p>Loading…</p>}
              {!loading && items.length === 0 && <p>No images in this category yet.</p>}
              {!loading && items.map((g) => (
                <div key={g.id} className="gp-item" style={{ borderRadius: 'var(--radius)', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 2px 10px var(--shadow)', position: 'relative' }}>
                  <img src={imageUrl(g.image)} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <div className="gp-overlay">
                    <i className="fas fa-search-plus"></i>
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    {g.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
