import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { achievements, imageUrl } from '../api';

export default function AchievementsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    achievements.list()
      .then((data) => setItems(data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="page-section" id="page-achievements-page">
        <div className="page-banner">
          <h1>Achievements</h1>
          <p>Celebrating excellence in every field</p>
          <div className="breadcrumb">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a><span>/</span><span>Achievements</span>
          </div>
        </div>
        <div className="section-padding">
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="section-header">
              <span className="overline">Hall of Excellence</span>
              <h2>Our Achievements</h2>
              <div className="divider"></div>
            </div>
            <div className="achievement-list" id="achievementList">
              {loading && <p>Loading…</p>}
              {!loading && items.length === 0 && <p>Achievements will appear here once added by the school.</p>}
              {!loading && items.map((a) => (
                <div className="achievement-item" key={a.id}>
                  <div className="ach-date">
                    <div className="day">{a.year}</div>
                  </div>
                  {a.image && (
                    <div className="ach-img">
                      <img src={imageUrl(a.image)} alt={a.student_name} loading="lazy" />
                    </div>
                  )}
                  <div className="ach-info">
                    <h3>{a.student_name}</h3>
                    <p>{a.achievement}</p>
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
