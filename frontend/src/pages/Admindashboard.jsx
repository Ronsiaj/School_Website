import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboard, news, imageUrl } from '../api';
import { showToast } from '../toast';

export default function Admindashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [statsData, newsData] = await Promise.all([dashboard.stats(), news.list('all')]);
        setStats(statsData);
        setRecent((newsData.items || []).slice(0, 4));
      } catch (err) {
        showToast(err.message || 'Could not load dashboard data.', 'error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
          <h2 style={{ marginBottom: '1.5rem' }}>Dashboard</h2>
          <div className="admin-stat-grid">
            <div className="admin-stat-card">
              <div className="asc-icon maroon"><i className="fas fa-images"></i></div>
              <div>
                <div className="asc-num">{loading ? '—' : stats?.gallery_count ?? 0}</div>
                <div className="asc-label">Gallery Images</div>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="asc-icon gold"><i className="fas fa-newspaper"></i></div>
              <div>
                <div className="asc-num">{loading ? '—' : stats?.news_count ?? 0}</div>
                <div className="asc-label">News & Events</div>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="asc-icon green"><i className="fas fa-trophy"></i></div>
              <div>
                <div className="asc-num">{loading ? '—' : stats?.achievements_count ?? 0}</div>
                <div className="asc-label">Achievements</div>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="asc-icon blue"><i className="fas fa-envelope"></i></div>
              <div>
                <div className="asc-num">{loading ? '—' : stats?.messages_count ?? 0}</div>
                <div className="asc-label">Contact Messages</div>
              </div>
            </div>
          </div>
          <div className="admin-table-wrap">
            <div className="admin-table-header">
              <h3>Recent News & Events</h3>
              <button className="btn btn-sm btn-primary" onClick={(e) => { e.preventDefault(); navigate('/admin/news'); }}>
                <i className="fas fa-plus"></i> Add New
              </button>
            </div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={4}>Loading…</td></tr>
                  )}
                  {!loading && recent.length === 0 && (
                    <tr><td colSpan={4}>No news or events yet.</td></tr>
                  )}
                  {!loading && recent.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.image ? (
                          <img src={imageUrl(item.image)} alt={item.title} style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4, marginRight: 8, verticalAlign: 'middle' }} />
                        ) : null}
                        {item.title}
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>{item.type}</td>
                      <td>{item.event_date}</td>
                      <td><span className={`status-badge ${item.status === 'published' ? 'active' : 'draft'}`}>{item.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    </>
  );
}
