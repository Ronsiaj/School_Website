import React, { useEffect, useState } from 'react';
import { achievements } from '../api';
import { showToast } from '../toast';

export default function Adminachievements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ student_name: '', achievement: '', year: String(new Date().getFullYear()), image: null });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await achievements.list();
      setItems(data.items || []);
    } catch (err) {
      showToast(err.message || 'Could not load achievements.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.student_name || !form.achievement) {
      showToast('Student name and achievement are required.', 'error');
      return;
    }
    const formData = new FormData();
    formData.append('student_name', form.student_name);
    formData.append('achievement', form.achievement);
    formData.append('year', form.year);
    if (form.image) formData.append('image', form.image);

    setSaving(true);
    try {
      await achievements.create(formData);
      showToast('Achievement added.', 'success');
      setForm({ student_name: '', achievement: '', year: String(new Date().getFullYear()), image: null });
      setShowForm(false);
      load();
    } catch (err) {
      showToast(err.message || 'Could not add achievement.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await achievements.remove(id);
      showToast('Achievement deleted.', 'success');
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (err) {
      showToast(err.message || 'Delete failed.', 'error');
    }
  };

  return (
    <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Manage Achievements</h2>
            <button className="btn btn-primary btn-sm" onClick={() => setShowForm((s) => !s)}>
              <i className="fas fa-plus"></i> {showForm ? 'Cancel' : 'Add Achievement'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAdd} className="admin-table-wrap" style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'grid', gap: '0.75rem', maxWidth: 480 }}>
              <div className="form-group">
                <label>Student Name</label>
                <input type="text" value={form.student_name} onChange={(e) => setForm({ ...form, student_name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Achievement</label>
                <textarea rows="3" value={form.achievement} onChange={(e) => setForm({ ...form, achievement: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="text" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Image (optional)</label>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
              </div>
              <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </form>
          )}

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Achievement</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan={4}>Loading…</td></tr>}
                {!loading && items.length === 0 && <tr><td colSpan={4}>No achievements yet.</td></tr>}
                {!loading && items.map((a) => (
                  <tr key={a.id}>
                    <td>{a.student_name}</td>
                    <td>{a.achievement}</td>
                    <td>{a.year}</td>
                    <td className="admin-actions">
                      <button className="del-btn" onClick={() => handleDelete(a.id)}><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </>
  );
}
