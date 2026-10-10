import React, { useEffect, useState } from 'react';
import { gallery, imageUrl } from '../api';
import { showToast } from '../toast';

export default function Admingallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('campus');
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await gallery.list('all');
      setItems(data.items || []);
    } catch (err) {
      showToast(err.message || 'Could not load gallery.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      showToast('Title and image are required.', 'error');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', file);

    setSaving(true);
    try {
      await gallery.create(formData);
      showToast('Image uploaded successfully.', 'success');
      setTitle(''); setFile(null); setShowForm(false);
      load();
    } catch (err) {
      showToast(err.message || 'Upload failed.', 'error');
    } finally {
      setSaving(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await gallery.remove(id);
      showToast('Image deleted successfully.', 'success');
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (err) {
      showToast(err.message || 'Delete failed.', 'error');
    }
  };

  return (
    <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Manage Gallery</h2>
            <button className="btn btn-primary btn-sm" onClick={() => setShowForm((s) => !s)}>
              <i className={showForm ? "fas fa-times" : "fas fa-upload"}></i> {showForm ? 'Cancel' : 'Upload Image'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleUpload} className="admin-table-wrap" style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'grid', gap: '0.75rem', maxWidth: 480 }}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Image title" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="campus">Campus</option>
                  <option value="events">Events</option>
                  <option value="sports">Sports</option>
                  <option value="achievements">Achievements</option>
                </select>
              </div>
              <div className="form-group">
                <label>Image (JPG/PNG/WEBP, max 5MB)</label>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files[0])} />
              </div>
              <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
                {saving ? 'Uploading…' : 'Save'}
              </button>
            </form>
          )}

          <div className="admin-table-wrap">
            <table className="admin-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Image Preview</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Album Name</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Date Added</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan={5} style={{ padding: '1.5rem' }}>Loading...</td></tr>}
                {!loading && items.length === 0 && <tr><td colSpan={5} style={{ padding: '1.5rem' }}>No gallery images yet.</td></tr>}
                {!loading && items.map((g) => (
                  <tr key={g.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => setPreviewImage(imageUrl(g.image))}>
                          <img src={imageUrl(g.image)} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem', color: 'var(--text)', fontWeight: 500 }}>
                      {g.title}
                    </td>
                    <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>
                      {(() => {
                        const d = new Date(g.created_at);
                        const pad = (n) => n.toString().padStart(2, '0');
                        return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
                      })()}
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
                        <button className="btn" style={{ background: 'rgba(107, 26, 43, 0.08)', color: 'var(--maroon)', border: 'none', width: '35px', height: '35px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setPreviewImage(imageUrl(g.image))} title="View Image">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn" style={{ background: 'rgba(107, 26, 43, 0.08)', color: 'var(--maroon)', border: 'none', width: '35px', height: '35px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleDelete(g.id)} title="Delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {previewImage && (
            <div 
              className="modal-overlay show" 
              style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.85)' }}
              onClick={() => setPreviewImage(null)}
            >
              <div 
                style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={(e) => e.stopPropagation()} // Prevent click inside image from closing
              >
                <button 
                  onClick={() => setPreviewImage(null)} 
                  style={{ position: 'absolute', top: '-40px', right: '-10px', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', opacity: 0.8 }}
                >
                  <i className="fas fa-times"></i>
                </button>
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '8px', objectFit: 'contain', boxShadow: '0 4px 30px rgba(0,0,0,0.5)' }} 
                />
              </div>
            </div>
          )}
    </>
  );
}
