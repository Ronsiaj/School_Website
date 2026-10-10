import React, { useState } from 'react';
import { admissions } from '../api';
import { showToast } from '../toast';

export default function AdmissionsPage() {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        student_name: '', dob: '', gender: '', class_applied: '', 
        parent_name: '', phone: '', email: '', address: '',
        birth_certificate: null, marksheet: null, photo: null
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                if (form[key]) {
                    formData.append(key, form[key]);
                }
            });
            await admissions.create(formData);
            showToast('Application submitted successfully! We will contact you soon.', 'success');
            setShowForm(false);
            setForm({
                student_name: '', dob: '', gender: '', class_applied: '', 
                parent_name: '', phone: '', email: '', address: '',
                birth_certificate: null, marksheet: null, photo: null
            });
        } catch (err) {
            showToast(err.message || 'Failed to submit application.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <section className="page-section" id="page-admissions">
                <div className="page-banner">
                    <h1>Admissions</h1>
                    <p>Begin your child's journey of excellence</p>
                    <div className="breadcrumb"><a href="#"
                        onClick={(e) => { e.preventDefault(); window.navigateTo('home'); }}>Home</a><span>/</span><span>Admissions</span></div>
                </div>
                <div className="section-padding">
                    <div className="container">
                        <div className="section-header"><span className="overline">Admissions 2025-26</span>
                            <h2>How to Apply</h2>
                            <div className="divider"></div>
                            <p>Admissions are now open for classes Kindergarten through XII. Follow the steps below to
                                secure your child's place at St. Joseph's.</p>
                        </div>
                        <div className="admission-steps">
                            <div className="step-item">
                                <div className="step-num">1</div>
                                <div className="step-content">
                                    <h3>Fill the Online Application</h3>
                                    <p>Complete the online application form with accurate student and parent details. Upload
                                        required documents including birth certificate, previous academic records, and
                                        photographs.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-num">2</div>
                                <div className="step-content">
                                    <h3>Pay the Application Fee</h3>
                                    <p>Submit the non-refundable application fee of Rs. 200 through the online payment
                                        portal. Fee receipt will be generated automatically.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-num">3</div>
                                <div className="step-content">
                                    <h3>Entrance Assessment</h3>
                                    <p>Students applying for Class II and above will appear for an age-appropriate entrance
                                        assessment covering English, Mathematics, and General Awareness.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-num">4</div>
                                <div className="step-content">
                                    <h3>Interaction Session</h3>
                                    <p>Shortlisted candidates along with their parents will be invited for a brief
                                        interaction session with the Principal and academic team.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-num">5</div>
                                <div className="step-content">
                                    <h3>Admission Confirmation</h3>
                                    <p>Upon selection, confirm admission by paying the admission fee and submitting original
                                        documents within the specified deadline.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ "textAlign": "center", "marginTop": "3rem" }}>
                            <button className="btn btn-gold" onClick={() => setShowForm(true)}>
                                <i className="fas fa-pen-fancy"></i> Apply Online Now
                            </button>
                        </div>
                        <div className="highlight-box" style={{ "maxWidth": "700px", "margin": "2rem auto 0" }}>
                            <p><strong>Important Dates:</strong> Application deadline: March 31, 2025 | Entrance test: April
                                10, 2025 | Results: April 18, 2025 | Admission confirmation: By April 30, 2025</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admission Form Modal */}
            {showForm && (
                <div className="modal-overlay show" style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', overflowY: 'auto' }}>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '800px', margin: '2rem 1rem', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
                        <button 
                            onClick={() => setShowForm(false)} 
                            style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666' }}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--maroon)' }}>Online Admission Form</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
                            <div className="form-group">
                                <label>Student Name *</label>
                                <input type="text" required value={form.student_name} onChange={e => setForm({...form, student_name: e.target.value})} placeholder="Full name of student" />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth *</label>
                                <input type="date" required value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Gender *</label>
                                <select required value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Class Applying For *</label>
                                <select required value={form.class_applied} onChange={e => setForm({...form, class_applied: e.target.value})}>
                                    <option value="">Select Class</option>
                                    <option value="KG">Kindergarten</option>
                                    <option value="1">Class I</option>
                                    <option value="2">Class II</option>
                                    <option value="3">Class III</option>
                                    <option value="4">Class IV</option>
                                    <option value="5">Class V</option>
                                    <option value="6">Class VI</option>
                                    <option value="7">Class VII</option>
                                    <option value="8">Class VIII</option>
                                    <option value="9">Class IX</option>
                                    <option value="10">Class X</option>
                                    <option value="11">Class XI</option>
                                    <option value="12">Class XII</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Parent/Guardian Name *</label>
                                <input type="text" required value={form.parent_name} onChange={e => setForm({...form, parent_name: e.target.value})} placeholder="Full name of parent" />
                            </div>
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="10-digit mobile number" />
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Email Address *</label>
                                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Active email address" />
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Residential Address *</label>
                                <textarea rows="3" required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Complete home address"></textarea>
                            </div>

                            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #eee', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#444' }}>Document Upload (JPG, PNG, PDF)</h3>
                                <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                                    <div className="form-group">
                                        <label>Birth Certificate *</label>
                                        <input type="file" required accept=".jpg,.jpeg,.png,.pdf" onChange={e => setForm({...form, birth_certificate: e.target.files[0]})} />
                                    </div>
                                    <div className="form-group">
                                        <label>Previous Marksheet</label>
                                        <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e => setForm({...form, marksheet: e.target.files[0]})} />
                                    </div>
                                    <div className="form-group">
                                        <label>Student Photo *</label>
                                        <input type="file" required accept=".jpg,.jpeg,.png" onChange={e => setForm({...form, photo: e.target.files[0]})} />
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 3rem', fontSize: '1.1rem' }} disabled={submitting}>
                                    {submitting ? 'Submitting Application...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
