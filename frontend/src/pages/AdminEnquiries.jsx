import React, { useEffect, useState } from 'react';
import { contact } from '../api';
import { showToast } from '../toast';

export default function AdminEnquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await contact.list();
      setItems(data.items || []);
    } catch (err) {
      showToast(err.message || 'Could not load enquiries.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openMessage = (msg) => {
    setSelectedMessage(msg);
  };

  const closeMessage = () => {
    setSelectedMessage(null);
  };

  return (
    <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Manage Enquiries</h2>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan={6}>Loading...</td></tr>}
                {!loading && items.length === 0 && <tr><td colSpan={6}>No enquiries yet.</td></tr>}
                {!loading && items.map((a) => (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.email}</td>
                    <td>{a.phone}</td>
                    <td>{a.subject}</td>
                    <td>{new Date(a.created_at).toLocaleDateString()}</td>
                    <td className="admin-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => openMessage(a)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      {/* Modal for viewing message details */}
      {selectedMessage && (
        <div className="modal-overlay show" style={{ zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-box" style={{ maxWidth: '650px', width: '90%', padding: '0', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', position: 'relative' }}>
            
            <div style={{ background: 'var(--maroon)', color: 'var(--white)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: 'var(--white)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.4rem' }}>
                <i className="fas fa-envelope-open-text" style={{ color: 'var(--gold)' }}></i> 
                Enquiry Details
              </h3>
              <button className="modal-close" onClick={closeMessage} style={{ position: 'static', background: 'rgba(255,255,255,0.1)', color: 'var(--white)', border: 'none', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'none' }}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Full Name</div>
                  <div style={{ fontWeight: '600', color: 'var(--maroon)', fontSize: '1.1rem' }}>{selectedMessage.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Email Address</div>
                  <div style={{ fontWeight: '600' }}><a href={`mailto:${selectedMessage.email}`} style={{ color: 'var(--maroon)', textDecoration: 'none' }}>{selectedMessage.email}</a></div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Mobile Number</div>
                  <div style={{ fontWeight: '600' }}><a href={`tel:${selectedMessage.phone}`} style={{ color: 'var(--text)', textDecoration: 'none' }}>{selectedMessage.phone}</a></div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Subject</div>
                  <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }}></span>
                    {selectedMessage.subject}
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Received On</div>
                  <div style={{ fontWeight: '500', color: 'var(--text)' }}><i className="far fa-calendar-alt" style={{ marginRight: '0.5rem', color: 'var(--gold)' }}></i>{new Date(selectedMessage.created_at).toLocaleString()}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.75rem' }}>Message Content</div>
                <div style={{ 
                  background: 'rgba(107, 26, 43, 0.03)', 
                  padding: '1.5rem', 
                  borderRadius: 'var(--radius)', 
                  borderLeft: '4px solid var(--maroon)',
                  color: 'var(--text)',
                  lineHeight: '1.7',
                  whiteSpace: 'pre-wrap',
                  position: 'relative',
                  fontSize: '1rem'
                }}>
                  <i className="fas fa-quote-left" style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '2.5rem', color: 'rgba(107, 26, 43, 0.05)' }}></i>
                  {selectedMessage.message}
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                 <button onClick={closeMessage} className="btn btn-outline" style={{ padding: '0.5rem 1.5rem' }}>Close</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
