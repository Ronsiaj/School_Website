import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, setSession } from '../api';
import { showToast } from '../toast';

export default function AdminloginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const data = await auth.login(email, password);
      setSession(data.token, data.name);
      showToast(`Login successful! Welcome, ${data.name}.`, 'success');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Try admin / Admin@123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="page-section" id="page-admin-login" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f6f9' }}>
        <div className="section-padding" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="admin-login-wrap" style={{ margin: 0, width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div className="nav-logo" style={{ width: '65px', height: '65px', fontSize: '1.3rem', margin: '0 auto 1rem' }}>L&S</div>
              <h2>Admin Login</h2>
              <p className="login-sub">Access the school administration panel</p>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-group">
                <label htmlFor="admin-user">Username</label>
                <input
                  type="text"
                  id="admin-user"
                  name="admin-user-field"
                  placeholder="Enter username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="admin-pass">Password</label>
                <input
                  type="password"
                  id="admin-pass"
                  name="admin-pass-field"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              {error && (
                <div id="loginError" style={{ color: '#C0392B', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <i className="fas fa-exclamation-circle"></i> {error}
                </div>
              )}
              <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} disabled={loading}>
                <i className="fas fa-sign-in-alt"></i> {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

          </div>
        </div>
      </section>
    </>
  );
}
