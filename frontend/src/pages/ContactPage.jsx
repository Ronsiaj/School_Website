import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contact } from '../api';
import { showToast } from '../toast';

export default function ContactPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const update = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        setErrors((er) => ({ ...er, [field]: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = true;
        if (!/^\d{10}$/.test(form.phone)) newErrors.phone = true;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = true;
        if (!form.subject) newErrors.subject = true;
        if (!form.message.trim()) newErrors.message = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmitting(true);
        try {
            const res = await contact.send(form);
            showToast(res.message || 'Thank you! Your message has been sent.', 'success');
            setForm({ name: '', phone: '', email: '', subject: '', message: '' });
        } catch (err) {
            showToast(err.message || 'Cannot connect to server. Message not sent.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <section className="page-section" id="page-contact">
                <div className="page-banner">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you</p>
                    <div className="breadcrumb"><a href="#"
                        onClick={(e) => { e.preventDefault(); window.navigateTo('home'); }}>Home</a><span>/</span><span>Contact</span></div>
                </div>
                <div className="section-padding">
                    <div className="container">
                        <div className="contact-grid">
                            <div className="contact-form-wrap">
                                <h3 style={{ "marginBottom": "0.5rem" }}>Send Us a Message</h3>
                                <p style={{ "marginBottom": "1.5rem", "fontSize": "0.9rem" }}>Fill out the form below and we'll get back
                                    to you within 24 hours.</p>
                                <form id="contactForm" onSubmit={handleSubmit}>
                                    <div style={{ "display": "grid", "gridTemplateColumns": "1fr 1fr", "gap": "1rem" }}>
                                        <div className={`form-group ${errors.name ? 'has-error' : ''}`}><label htmlFor="cf-name">Full Name *</label><input type="text"
                                            id="cf-name" placeholder="Your full name" value={form.name} onChange={update('name')} />
                                            <div className="error-msg">Please enter your name</div>
                                        </div>
                                        <div className={`form-group ${errors.phone ? 'has-error' : ''}`}><label htmlFor="cf-phone">Phone Number *</label><input
                                            type="tel" id="cf-phone" placeholder="10-digit mobile number" value={form.phone} onChange={update('phone')} />
                                            <div className="error-msg">Mobile number must be exactly 10 digits</div>
                                        </div>
                                    </div>
                                    <div className={`form-group ${errors.email ? 'has-error' : ''}`}><label htmlFor="cf-email">Email Address *</label><input type="email"
                                        id="cf-email" placeholder="your@email.com" value={form.email} onChange={update('email')} />
                                        <div className="error-msg">Please enter a valid email address</div>
                                    </div>
                                    <div className={`form-group ${errors.subject ? 'has-error' : ''}`}><label htmlFor="cf-subject">Subject *</label><select
                                        id="cf-subject" value={form.subject} onChange={update('subject')}>
                                        <option value="">Select a subject</option>
                                        <option>Admission Enquiry</option>
                                        <option>Fee Structure</option>
                                        <option>Academic Information</option>
                                        <option>Transport Enquiry</option>
                                        <option>General Feedback</option>
                                        <option>Complaint</option>
                                        <option>Other</option>
                                    </select>
                                        <div className="error-msg">Please select a subject</div>
                                    </div>
                                    <div className={`form-group ${errors.message ? 'has-error' : ''}`}><label htmlFor="cf-message">Message *</label><textarea
                                        id="cf-message" rows="5" placeholder="Write your message here..." value={form.message} onChange={update('message')}></textarea>
                                        <div className="error-msg">Please enter your message</div>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ "width": "100%" }} disabled={submitting}><i
                                        className="fas fa-paper-plane"></i> {submitting ? 'Sending...' : 'Send Message'}</button>
                                </form>
                            </div>
                            <div style={{ "display": "flex", "flexDirection": "column", "height": "100%" }}>
                                <div className="contact-map" style={{ "flex": "1", "marginBottom": "1.5rem" }}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNiJF!5e0!3m2!1sen!2sin!4v1"
                                        allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                        title="School location map"></iframe>
                                </div>
                                <div
                                    style={{ "background": "var(--white)", "padding": "1.5rem", "borderRadius": "var(--radius-lg)", "boxShadow": "0 4px 20px var(--shadow)" }}>
                                    <h4 style={{ "marginBottom": "1rem", "color": "var(--maroon)" }}><i className="fas fa-info-circle"
                                        style={{ "marginRight": "0.5rem" }}></i>School Details</h4>
                                    <div style={{ "display": "flex", "flexDirection": "column", "gap": "0.75rem", "fontSize": "0.9rem" }}>
                                        <div><strong>Phone:</strong> +91 80 1234 5678</div>
                                        <div><strong>Email:</strong> info@stjosephsschool.edu</div>
                                        <div><strong>Address:</strong> 123 Education Lane, Knowledge City, State — 560001
                                        </div>
                                        <div><strong>Office Hours:</strong> Mon–Sat, 8:00 AM – 4:00 PM</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ "marginTop": "4rem" }}>
                            <div className="section-header"><span className="overline">Stay Connected</span>
                                <h2>Our Distinguished Alumni</h2>
                                <div className="divider"></div>
                            </div>
                            <div className="alumni-grid">
                                <div className="alumni-card">
                                    <div className="alumni-avatar">AS</div>
                                    <h4>Dr. Ananya Sharma</h4>
                                    <div className="alumni-batch">Batch of 2010</div>
                                    <div className="alumni-role">Cardiac Surgeon, AIIMS</div>
                                </div>
                                <div className="alumni-card">
                                    <div className="alumni-avatar">RK</div>
                                    <h4>Rahul Kapoor</h4>
                                    <div className="alumni-batch">Batch of 2005</div>
                                    <div className="alumni-role">CEO, TechVentures India</div>
                                </div>
                                <div className="alumni-card">
                                    <div className="alumni-avatar">PM</div>
                                    <h4>Priya Menon</h4>
                                    <div className="alumni-batch">Batch of 2018</div>
                                    <div className="alumni-role">National Debate Champion</div>
                                </div>
                                <div className="alumni-card">
                                    <div className="alumni-avatar">VD</div>
                                    <h4>Vikram Desai</h4>
                                    <div className="alumni-batch">Batch of 2008</div>
                                    <div className="alumni-role">IAS Officer</div>
                                </div>
                                <div className="alumni-card">
                                    <div className="alumni-avatar">SN</div>
                                    <h4>Sunita Nair</h4>
                                    <div className="alumni-batch">Batch of 2012</div>
                                    <div className="alumni-role">BBC Journalist</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
