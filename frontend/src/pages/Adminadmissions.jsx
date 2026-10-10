import React, { useEffect, useState } from 'react';
import { admissions, imageUrl } from '../api';
import { showToast } from '../toast';

export default function Adminadmissions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await admissions.list();
      setItems(data.items || []);
    } catch (err) {
      showToast(err.message || 'Could not load admissions.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const formData = new FormData();
      formData.append('status', status);
      await admissions.updateStatus(id, formData);
      showToast('Status updated successfully.', 'success');
      setItems(items.map(it => it.id === id ? { ...it, status } : it));
      if (viewItem && viewItem.id === id) {
        setViewItem({ ...viewItem, status });
      }
    } catch (err) {
      showToast(err.message || 'Failed to update status.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this admission application?')) return;
    try {
      await admissions.remove(id);
      showToast('Application deleted.', 'success');
      setItems((prev) => prev.filter((it) => it.id !== id));
      if (viewItem && viewItem.id === id) setViewItem(null);
    } catch (err) {
      showToast(err.message || 'Delete failed.', 'error');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Manage Admissions</h2>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '1.5rem', fontWeight: 600 }}>Student Name</th>
              <th style={{ padding: '1.5rem', fontWeight: 600 }}>Class</th>
              <th style={{ padding: '1.5rem', fontWeight: 600 }}>Parent Name</th>
              <th style={{ padding: '1.5rem', fontWeight: 600 }}>Phone</th>
              <th style={{ padding: '1.5rem', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1.5rem', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} style={{ padding: '1.5rem' }}>Loading…</td></tr>}
            {!loading && items.length === 0 && <tr><td colSpan={6} style={{ padding: '1.5rem' }}>No applications found.</td></tr>}
            {!loading && items.map((n) => (
              <tr key={n.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1.5rem', color: 'var(--text)', fontWeight: 500 }}>{n.student_name}</td>
                <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>{n.class_applied}</td>
                <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>{n.parent_name}</td>
                <td style={{ padding: '1.5rem', color: 'var(--text-light)' }}>{n.phone}</td>
                <td style={{ padding: '1.5rem' }}>
                  <span style={{ 
                    background: n.status === 'approved' ? 'rgba(40, 167, 69, 0.15)' : (n.status === 'rejected' ? 'rgba(220, 53, 69, 0.15)' : 'rgba(255, 193, 7, 0.15)'), 
                    color: n.status === 'approved' ? '#28a745' : (n.status === 'rejected' ? '#dc3545' : '#ffc107'), 
                    padding: '0.4rem 1rem', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}>
                    {n.status}
                  </span>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn" style={{ background: 'rgba(107, 26, 43, 0.08)', color: 'var(--maroon)', border: 'none', width: '35px', height: '35px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setViewItem(n)} title="View Details">
                      <i className="fas fa-eye"></i>
                    </button>
                    {n.status === 'pending' && (
                      <>
                        <button className="btn" style={{ background: 'rgba(40, 167, 69, 0.08)', color: '#28a745', border: 'none', width: '35px', height: '35px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleUpdateStatus(n.id, 'approved')} title="Approve">
                          <i className="fas fa-check"></i>
                        </button>
                        <button className="btn" style={{ background: 'rgba(220, 53, 69, 0.08)', color: '#dc3545', border: 'none', width: '35px', height: '35px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleUpdateStatus(n.id, 'rejected')} title="Reject">
                          <i className="fas fa-times"></i>
                        </button>
                      </>
                    )}
                    <button className="btn" style={{ background: 'rgba(220, 53, 69, 0.08)', color: '#dc3545', border: 'none', width: '35px', height: '35px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleDelete(n.id)} title="Delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {viewItem && (
        <div className="modal-overlay show" style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', overflowY: 'auto' }}>
          <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '12px', width: '100%', maxWidth: '700px', margin: '2rem 1rem', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <button 
                onClick={() => setViewItem(null)} 
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.05)', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#666', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <i className="fas fa-times"></i>
            </button>
            <h2 style={{ marginBottom: '0.5rem', color: 'var(--maroon)', fontSize: '1.6rem' }}>Application Details</h2>
            <div style={{ color: '#777', marginBottom: '2rem', fontSize: '0.9rem' }}>Submitted on: {new Date(viewItem.created_at).toLocaleString()}</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                    <h4 style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 0.4rem 0' }}>Student Name</h4>
                    <div style={{ fontSize: '1.1rem', fontWeight: '500', color: '#333' }}>{viewItem.student_name}</div>
                </div>
                <div>
                    <h4 style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 0.4rem 0' }}>Class Applied</h4>
                    <div style={{ fontSize: '1.1rem', fontWeight: '500', color: '#333' }}>{viewItem.class_applied}</div>
                </div>
                <div>
                    <h4 style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 0.4rem 0' }}>Date of Birth</h4>
                    <div style={{ fontSize: '1.1rem', fontWeight: '500', color: '#333' }}>{viewItem.dob}</div>
                </div>
                <div>
                    <h4 style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 0.4rem 0' }}>Gender</h4>
                    <div style={{ fontSize: '1.1rem', fontWeight: '500', color: '#333' }}>{viewItem.gender}</div>
                </div>
                <div>
                    <h4 style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 0.4rem 0' }}>Parent Name</h4>
                    <div style={{ fontSize: '1.1rem', fontWeight: '500', color: '#333' }}>{viewItem.parent_name}</div>
                </div>
                <div>
                    <h4 style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 0.4rem 0' }}>Phone</h4>
                    <div style={{ fontSize: '1.1rem', fontWeight: '500', color: '#333' }}>{viewItem.phone}</div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                    <h4 style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 0.4rem 0' }}>Email</h4>
                    <div style={{ fontSize: '1.1rem', fontWeight: '500', color: '#333' }}>{viewItem.email}</div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                    <h4 style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 0.4rem 0' }}>Address</h4>
                    <div style={{ fontSize: '1rem', color: '#444', lineHeight: 1.5, background: '#f9f9f9', padding: '1rem', borderRadius: '6px' }}>{viewItem.address}</div>
                </div>
            </div>

            <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem', color: '#444' }}>Documents</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {['photo', 'birth_certificate', 'marksheet'].map(docKey => {
                    if (viewItem.documents && viewItem.documents[docKey]) {
                        return (
                            <a key={docKey} href={imageUrl(viewItem.documents[docKey])} target="_blank" rel="noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: '#f4f6f9', borderRadius: '8px', textDecoration: 'none', color: 'var(--maroon)', transition: 'all 0.2s', border: '1px solid #e0e6ed' }}>
                                <i className="fas fa-file-alt" style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#6c757d' }}></i>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize' }}>{docKey.replace('_', ' ')}</span>
                            </a>
                        );
                    }
                    return null;
                })}
                {(!viewItem.documents || Object.keys(viewItem.documents).length === 0) && (
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>No documents uploaded.</div>
                )}
            </div>
            
            {viewItem.status === 'pending' && (
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                    <button className="btn" style={{ background: '#28a745', color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 600 }} onClick={() => { handleUpdateStatus(viewItem.id, 'approved'); setViewItem({...viewItem, status: 'approved'}); }}>
                        <i className="fas fa-check"></i> Approve Application
                    </button>
                    <button className="btn" style={{ background: '#dc3545', color: '#fff', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 600 }} onClick={() => { handleUpdateStatus(viewItem.id, 'rejected'); setViewItem({...viewItem, status: 'rejected'}); }}>
                        <i className="fas fa-times"></i> Reject Application
                    </button>
                </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
