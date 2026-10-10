import React, { useEffect, useState } from 'react';
import { content } from '../api';
import { showToast } from '../toast';

const FIELDS = [
  { key: 'vision_statement', label: 'Vision Statement', icon: 'fa-eye', color: 'var(--maroon)' },
  { key: 'mission_statement', label: 'Mission Statement', icon: 'fa-bullseye', color: 'var(--gold)' },
  { key: 'founder_message', label: "Founder's Message", icon: 'fa-user-tie', color: 'var(--maroon)' },
  { key: 'principal_message', label: "Principal's Message", icon: 'fa-chalkboard-teacher', color: 'var(--gold)' },
];

export default function Admincontent() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await content.leadership();
        setValues(data || {});
      } catch (err) {
        showToast(err.message || 'Could not load content.', 'error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async (key) => {
    setSavingKey(key);
    try {
      await content.update({ [key]: values[key] || '' });
      showToast('Saved successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Could not save changes.', 'error');
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <>
          <h2 style={{ marginBottom: '1.5rem' }}>Manage Content</h2>
          {loading ? (
            <p>Loading…</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }}>
              {FIELDS.map((f) => (
                <div key={f.key} className="admin-table-wrap" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.05rem' }}>
                    <i className={`fas ${f.icon}`} style={{ color: f.color, marginRight: '0.5rem' }}></i>{f.label}
                  </h3>
                  <textarea
                    rows="4"
                    style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.75rem', fontSize: '0.9rem', resize: 'vertical' }}
                    value={values[f.key] || ''}
                    onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    style={{ marginTop: '0.75rem' }}
                    onClick={() => handleSave(f.key)}
                    disabled={savingKey === f.key}
                  >
                    <i className="fas fa-save"></i> {savingKey === f.key ? 'Saving…' : 'Save'}
                  </button>
                </div>
              ))}
            </div>
          )}
    </>
  );
}
