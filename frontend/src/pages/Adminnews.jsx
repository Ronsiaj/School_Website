import React, { useEffect, useState } from 'react';
import { news, imageUrl } from '../api';
import { showToast } from '../toast';

export default function Adminnews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', event_date: '', image: null });
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await news.list('all');
      setItems(data.items || []);
    } catch (err) {
      showToast(err.message || 'Could not load news.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      showToast('Title and description are required.', 'error');
      return;
    }
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('type', 'news'); // Hardcoded since we removed categories
    formData.append('event_date', form.event_date || new Date().toISOString().slice(0, 10));
    if (form.image) formData.append('image', form.image);

    setSaving(true);
    try {
      await news.create(formData);
      showToast('News item created.', 'success');
      setForm({ title: '', description: '', event_date: '', image: null });
      setShowForm(false);
      load();
    } catch (err) {
      showToast(err.message || 'Could not create news item.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this news item?')) return;
    try {
      await news.remove(id);
      showToast('News item deleted.', 'success');
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (err) {
      showToast(err.message || 'Delete failed.', 'error');
    }
  };

  return (
    <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Manage News</h2>
            <button className="btn btn-primary btn-sm" onClick={() => setShowForm((s) => !s)}>
              <i className={showForm ? "fas fa-times" : "fas fa-plus"}></i> {showForm ? 'Cancel' : 'Add News'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAdd} className="admin-table-wrap" style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'grid', gap: '0.75rem', maxWidth: 520 }}>
              <div className="form-group">
                <label>Headline / Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Enter news headline" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Enter news details" />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Newspaper Clipping (Image)</label>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
              </div>
              <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
                {saving ? 'Saving…' : 'Publish News'}
              </button>
            </form>
          )}

          <div className="admin-table-wrap">
            <table className="admin-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Image Preview</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Headline</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan={5} style={{ padding: '1.5rem' }}>Loading…</td></tr>}
                {!loading && items.length === 0 && <tr><td colSpan={5} style={{ padding: '1.5rem' }}>No news available.</td></tr>}
                {!loading && items.map((n) => (
                  <tr key={n.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1.5rem' }}>
                      {n.image ? (
                        <div 
                          style={{ width: '80px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)', cursor: 'pointer', background: '#eee' }} 
                          onClick={() => setPreviewImage(imageUrl(n.image))}
                        >
                          <img src={imageUrl(n.image)} alt={n.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                        </div>
                      ) : (
                        <div style={{ width: '80px', height: '60px', borderRadius: '4px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: '0.8rem' }}>No Image</div>
                      )}
                    </td>
                    <td style={{ padding: '1.5rem', color: 'var(--text)', fontWeight: 500 }}>
                      {n.title}
                    </td>
                    <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>
                      {n.event_date}
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      <span style={{ 
                        background: 'rgba(40, 167, 69, 0.15)', 
                        color: '#28a745', 
                        padding: '0.4rem 1rem', 
                        borderRadius: '20px', 
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}>
                        Published
                      </span>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {n.image && (
                          <button className="btn" style={{ background: 'rgba(107, 26, 43, 0.08)', color: 'var(--maroon)', border: 'none', width: '35px', height: '35px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setPreviewImage(imageUrl(n.image))} title="View Image">
                            <i className="fas fa-eye"></i>
                          </button>
                        )}
                        <button className="btn" style={{ background: 'rgba(107, 26, 43, 0.08)', color: 'var(--maroon)', border: 'none', width: '35px', height: '35px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleDelete(n.id)} title="Delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
