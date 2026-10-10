import React, { useState, useEffect } from 'react';
import image1 from '../assets/school_hero1.jpg';
import image2 from '../assets/school_hero2.jpg';
import image3 from '../assets/school_hero3.jpg';
import aboutImage from '../assets/school_image.jpeg';

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = 3;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slidesCount);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <section className="page-section active" id="page-home">

                <div className="hero" role="banner">
                    <div className={`hero-slide ${currentSlide === 0 ? 'active' : ''}`}>
                        <img src={image1} alt="School campus" />
                        <div className="hero-overlay"></div>
                    </div>
                    <div className={`hero-slide ${currentSlide === 1 ? 'active' : ''}`}>
                        <img src={image2} alt="Students learning" />
                        <div className="hero-overlay"></div>
                    </div>
                    <div className={`hero-slide ${currentSlide === 2 ? 'active' : ''}`}>
                        <img src={image3} alt="School activities" />
                        <div className="hero-overlay"></div>
                    </div>
                    <div className="hero-content">
                        <span className="motto">Love & Serve</span>
                        <h1>Shaping Minds,<br />Building Futures</h1>
                        <p>A legacy of academic excellence, character formation, and holistic development since 1965.</p>
                        <div style={{ "display": "flex", "gap": "1rem", "flexWrap": "wrap", "justifyContent": "center" }}>
                            <button className="btn btn-gold" onClick={(e) => { e.preventDefault(); window.navigateTo('admissions'); }}><i
                                className="fas fa-graduation-cap"></i> Apply Now</button>
                            <button className="btn btn-secondary" style={{ "borderColor": "rgba(255,255,255,0.4)", "color": "var(--white)" }}
                                onClick={(e) => { e.preventDefault(); window.navigateTo('about-school'); }}><i className="fas fa-play-circle"></i> Explore
                                More</button>
                        </div>
                    </div>
                    <div className="hero-arrows">
                        <button onClick={prevSlide} aria-label="Previous slide"><i
                            className="fas fa-chevron-left"></i></button>
                        <button onClick={nextSlide} aria-label="Next slide"><i className="fas fa-chevron-right"></i></button>
                    </div>
                    <div className="hero-dots" id="heroDots">
                        <button className={currentSlide === 0 ? 'active' : ''} onClick={() => goToSlide(0)} aria-label="Slide 1"></button>
                        <button className={currentSlide === 1 ? 'active' : ''} onClick={() => goToSlide(1)} aria-label="Slide 2"></button>
                        <button className={currentSlide === 2 ? 'active' : ''} onClick={() => goToSlide(2)} aria-label="Slide 3"></button>
                    </div>
                </div>


                <section className="about-preview section-padding">
                    <div className="container about-preview-grid">
                        <div className="about-preview-img">
                            <img src={aboutImage} alt="About our school" />
                            <div className="badge-float">60+<br /><span
                                style={{ "fontSize": "0.7rem", "fontFamily": "var(--font-body)", "fontWeight": "400", "letterSpacing": "1px" }}>YEARS</span>
                            </div>
                        </div>
                        <div className="about-preview-text">
                            <span className="overline">Welcome to St. Joseph's</span>
                            <h2>A Tradition of Excellence in Education</h2>
                            <p>Founded in 1965, St. Joseph's School has been a beacon of knowledge and character formation.
                                Our institution blends time-honoured values with modern pedagogical practices to nurture
                                well-rounded individuals.</p>
                            <p>We believe every child is uniquely gifted. Our dedicated faculty, state-of-the-art
                                infrastructure, and comprehensive curriculum ensure that each student receives the attention
                                and resources they need to thrive.</p>
                            <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); window.navigateTo('about-school'); }}>Learn More <i
                                className="fas fa-arrow-right"></i></button>
                            <div className="about-stats">
                                <div className="about-stat">
                                    <div className="num" data-count="2500">0</div>
                                    <div className="label">Students</div>
                                </div>
                                <div className="about-stat">
                                    <div className="num" data-count="120">0</div>
                                    <div className="label">Faculty</div>
                                </div>
                                <div className="about-stat">
                                    <div className="num" data-count="98">0</div>
                                    <div className="label">% Pass Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="section-padding" style={{ "background": "var(--cream-dark)" }}>
                    <div className="container">
                        <div className="section-header">
                            <span className="overline">Why St. Joseph's</span>
                            <h2>What Makes Us Exceptional</h2>
                            <div className="divider"></div>
                        </div>
                        <div className="icon-cards">
                            <div className="icon-card">
                                <div className="icon-wrap"><i className="fas fa-book-open"></i></div>
                                <h3>Academic Excellence</h3>
                                <p>Consistently top-ranking results with a rigorous curriculum designed for deep
                                    understanding and critical thinking.</p>
                            </div>
                            <div className="icon-card">
                                <div className="icon-wrap"><i className="fas fa-flask"></i></div>
                                <h3>Modern Laboratories</h3>
                                <p>Fully equipped science, computer, and language labs providing hands-on learning
                                    experiences for every student.</p>
                            </div>
                            <div className="icon-card">
                                <div className="icon-wrap"><i className="fas fa-users"></i></div>
                                <h3>Expert Faculty</h3>
                                <p>120+ highly qualified and experienced educators committed to bringing out the best in
                                    every learner.</p>
                            </div>
                            <div className="icon-card">
                                <div className="icon-wrap"><i className="fas fa-futbol"></i></div>
                                <h3>Sports & Fitness</h3>
                                <p>Comprehensive sports programme with professional coaching, indoor courts, and athletic
                                    tracks.</p>
                            </div>
                            <div className="icon-card">
                                <div className="icon-wrap"><i className="fas fa-palette"></i></div>
                                <h3>Arts & Culture</h3>
                                <p>Rich programmes in music, dance, drama, and visual arts fostering creativity and
                                    self-expression.</p>
                            </div>
                            <div className="icon-card">
                                <div className="icon-wrap"><i className="fas fa-globe-asia"></i></div>
                                <h3>Value Education</h3>
                                <p>Rooted in the motto "Love & Serve," we instil compassion, integrity, and social
                                    responsibility.</p>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="section-padding">
                    <div className="container">
                        <div className="section-header">
                            <span className="overline">Beyond Classrooms</span>
                            <h2>Life at St. Joseph's</h2>
                            <div className="divider"></div>
                            <p>A vibrant campus life filled with discovery, friendship, and growth beyond textbooks.</p>
                        </div>
                        <div className="cards-grid">
                            <div className="card">
                                <div className="card-img"><img src="https://picsum.photos/seed/school-sports/600/400"
                                    alt="Sports" /><span className="card-tag">Sports</span></div>
                                <div className="card-body">
                                    <h3>Championship Athletics</h3>
                                    <p>Our students compete and excel at district, state, and national level championships
                                        across multiple disciplines.</p><a href="#" className="card-link"
                                            onClick={(e) => { e.preventDefault(); window.navigateTo('life-at-school'); }}>Explore <i
                                                className="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-img"><img src="https://picsum.photos/seed/school-arts/600/400"
                                    alt="Arts" /><span className="card-tag">Arts</span></div>
                                <div className="card-body">
                                    <h3>Creative Expression</h3>
                                    <p>From annual exhibitions to inter-school competitions, our art programmes nurture
                                        every form of creative talent.</p><a href="#" className="card-link"
                                            onClick={(e) => { e.preventDefault(); window.navigateTo('life-at-school'); }}>Explore <i
                                                className="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-img"><img src="https://picsum.photos/seed/school-clubs/600/400"
                                    alt="Clubs" /><span className="card-tag">Clubs</span></div>
                                <div className="card-body">
                                    <h3>Student Clubs</h3>
                                    <p>Over 15 active clubs including Debate, Science, Robotics, Eco Club, and more for
                                        holistic development.</p><a href="#" className="card-link"
                                            onClick={(e) => { e.preventDefault(); window.navigateTo('life-at-school'); }}>Explore <i
                                                className="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="section-padding" style={{ "background": "var(--cream-dark)" }}>
                    <div className="container">
                        <div className="section-header">
                            <span className="overline">Campus Gallery</span>
                            <h2>Glimpses of Our Campus</h2>
                            <div className="divider"></div>
                        </div>
                        <div className="gallery-grid" id="homeGalleryGrid">
                            <div className="g-item" onClick={(e) => { window.openLightbox(0) }}><img
                                src="https://picsum.photos/seed/gallery1/600/800" alt="Gallery image 1" loading="lazy" />
                                <div className="g-overlay"><i className="fas fa-search-plus"></i></div>
                            </div>
                            <div className="g-item" onClick={(e) => { window.openLightbox(1) }}><img
                                src="https://picsum.photos/seed/gallery2/600/400" alt="Gallery image 2" loading="lazy" />
                                <div className="g-overlay"><i className="fas fa-search-plus"></i></div>
                            </div>
                            <div className="g-item" onClick={(e) => { window.openLightbox(2) }}><img
                                src="https://picsum.photos/seed/gallery3/600/400" alt="Gallery image 3" loading="lazy" />
                                <div className="g-overlay"><i className="fas fa-search-plus"></i></div>
                            </div>
                            <div className="g-item" onClick={(e) => { window.openLightbox(3) }}><img
                                src="https://picsum.photos/seed/gallery4/600/400" alt="Gallery image 4" loading="lazy" />
                                <div className="g-overlay"><i className="fas fa-search-plus"></i></div>
                            </div>
                            <div className="g-item" onClick={(e) => { window.openLightbox(4) }}><img
                                src="https://picsum.photos/seed/gallery5/1200/400" alt="Gallery image 5" loading="lazy" />
                                <div className="g-overlay"><i className="fas fa-search-plus"></i></div>
                            </div>
                            <div className="g-item" onClick={(e) => { window.openLightbox(5) }}><img
                                src="https://picsum.photos/seed/gallery6/600/400" alt="Gallery image 6" loading="lazy" />
                                <div className="g-overlay"><i className="fas fa-search-plus"></i></div>
                            </div>
                        </div>
                        <div style={{ "textAlign": "center", "marginTop": "2rem" }}><button className="btn btn-outline"
                            onClick={(e) => { e.preventDefault(); window.navigateTo('gallery'); }}>View Full Gallery <i
                                className="fas fa-arrow-right"></i></button></div>
                    </div>
                </section>


                <section className="testimonials section-padding">
                    <div className="container">
                        <div className="section-header" style={{ "marginBottom": "2.5rem" }}>
                            <span className="overline" style={{ "color": "var(--gold-light)" }}>Testimonials</span>
                            <h2 style={{ "color": "var(--white)" }}>What People Say About Us</h2>
                            <div className="divider"></div>
                        </div>
                        <div className="testimonial-slider" id="testimonialSlider">
                            <div className="testimonial-item active">
                                <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
                                <blockquote>St. Joseph's didn't just educate me — it shaped who I am. The values of love and
                                    service stay with me in every aspect of my life and career.</blockquote>
                                <div className="author">Dr. Ananya Sharma<span>Alumni, Batch of 2010 — Cardiac Surgeon</span>
                                </div>
                            </div>
                            <div className="testimonial-item">
                                <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
                                <blockquote>As a parent, I couldn't have asked for a better environment for my children. The
                                    teachers truly care about every child's individual growth.</blockquote>
                                <div className="author">Rajesh Kumar<span>Parent — Children in Classes 5 and 9</span></div>
                            </div>
                            <div className="testimonial-item">
                                <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
                                <blockquote>The school's emphasis on both academics and extracurriculars gave me the
                                    confidence to pursue my dream of representing India in debate.</blockquote>
                                <div className="author">Priya Menon<span>Alumni, Batch of 2018 — National Debate Champion</span>
                                </div>
                            </div>
                        </div>
                        <div className="testi-dots" id="testiDots">
                            <button className="active" onClick={(e) => { window.goToTestimonial(0) }} aria-label="Testimonial 1"></button>
                            <button onClick={(e) => { window.goToTestimonial(1) }} aria-label="Testimonial 2"></button>
                            <button onClick={(e) => { window.goToTestimonial(2) }} aria-label="Testimonial 3"></button>
                        </div>
                    </div>
                </section>


                <section className="section-padding">
                    <div className="container">
                        <div className="section-header">
                            <span className="overline">Hall of Fame</span>
                            <h2>Our Star Achievers</h2>
                            <div className="divider"></div>
                        </div>
                        <div className="achievers-grid">
                            <div className="achiever-card">
                                <div className="avatar">AK</div>
                                <h4>Aarav Krishnan</h4>
                                <div className="score">98.6%</div>
                                <div className="detail">Class XII — State Rank 3</div>
                            </div>
                            <div className="achiever-card">
                                <div className="avatar">SM</div>
                                <h4>Sneha Mukherjee</h4>
                                <div className="score">97.8%</div>
                                <div className="detail">Class X — District Topper</div>
                            </div>
                            <div className="achiever-card">
                                <div className="avatar">RP</div>
                                <h4>Rohan Patel</h4>
                                <div className="score">Gold</div>
                                <div className="detail">National Science Olympiad</div>
                            </div>
                            <div className="achiever-card">
                                <div className="avatar">IT</div>
                                <h4>Isha Thakur</h4>
                                <div className="score">1st Place</div>
                                <div className="detail">State Level Debate</div>
                            </div>
                            <div className="achiever-card">
                                <div className="avatar">VJ</div>
                                <h4>Vikram Joshi</h4>
                                <div className="score">100m — 10.8s</div>
                                <div className="detail">State Athletics Champion</div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="section-padding" style={{ "background": "var(--cream-dark)" }}>
                    <div className="container">
                        <div className="section-header">
                            <span className="overline">Latest Updates</span>
                            <h2>News & Achievements</h2>
                            <div className="divider"></div>
                        </div>
                        <div className="cards-grid">
                            <div className="card">
                                <div className="card-img"><img src="https://picsum.photos/seed/news1/600/400" alt="News" /><span
                                    className="card-tag">News</span></div>
                                <div className="card-body"><span
                                    style={{ "fontSize": "0.78rem", "color": "var(--gold-dark)", "fontWeight": "600" }}><i
                                        className="far fa-calendar"></i> Feb 28, 2025</span>
                                    <h3>Annual Day Celebrations 2025</h3>
                                    <p>A spectacular showcase of talent, creativity, and school spirit marked this year's
                                        Annual Day celebrations.</p><a href="#" className="card-link"
                                            onClick={(e) => { e.preventDefault(); window.navigateTo('news-events'); }}>Read More <i
                                                className="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-img"><img src="https://picsum.photos/seed/news2/600/400"
                                    alt="Achievement" /><span className="card-tag"
                                        style={{ "background": "var(--gold)" }}>Achievement</span></div>
                                <div className="card-body"><span
                                    style={{ "fontSize": "0.78rem", "color": "var(--gold-dark)", "fontWeight": "600" }}><i
                                        className="far fa-calendar"></i> Feb 15, 2025</span>
                                    <h3>State Board Exam Toppers</h3>
                                    <p>Five students from St. Joseph's secured positions in the State Top 10 list this
                                        academic year.</p><a href="#" className="card-link"
                                            onClick={(e) => { e.preventDefault(); window.navigateTo('news-events'); }}>Read More <i
                                                className="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-img"><img src="https://picsum.photos/seed/news3/600/400" alt="Event" /><span
                                    className="card-tag" style={{ "background": "#27AE60" }}>Event</span></div>
                                <div className="card-body"><span
                                    style={{ "fontSize": "0.78rem", "color": "var(--gold-dark)", "fontWeight": "600" }}><i
                                        className="far fa-calendar"></i> Jan 20, 2025</span>
                                    <h3>Inter-School Science Fair</h3>
                                    <p>Our school hosted the regional Science Fair with over 30 participating schools and
                                        200+ projects.</p><a href="#" className="card-link"
                                            onClick={(e) => { e.preventDefault(); window.navigateTo('news-events'); }}>Read More <i
                                                className="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="contact-preview section-padding">
                    <div className="container contact-preview-grid">
                        <div>
                            <span className="overline"
                                style={{ "color": "var(--gold-light)", "fontSize": "0.8rem", "textTransform": "uppercase", "letterSpacing": "4px", "fontWeight": "600", "display": "block", "marginBottom": "0.5rem" }}>Get
                                in Touch</span>
                            <h2 style={{ "color": "var(--white)", "marginBottom": "2rem" }}>Contact Us</h2>
                            <div className="contact-info-list">
                                <div className="contact-info-item">
                                    <div className="ci-icon"><i className="fas fa-map-marker-alt"></i></div>
                                    <div>
                                        <h4>Address</h4>
                                        <p>123 Education Lane, Knowledge City, State — 560001</p>
                                    </div>
                                </div>
                                <div className="contact-info-item">
                                    <div className="ci-icon"><i className="fas fa-phone-alt"></i></div>
                                    <div>
                                        <h4>Phone</h4>
                                        <p>+91 80 1234 5678 / +91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="contact-info-item">
                                    <div className="ci-icon"><i className="fas fa-envelope"></i></div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>info@stjosephsschool.edu</p>
                                    </div>
                                </div>
                                <div className="contact-info-item">
                                    <div className="ci-icon"><i className="fas fa-clock"></i></div>
                                    <div>
                                        <h4>Office Hours</h4>
                                        <p>Mon – Sat: 8:00 AM – 4:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-cta">
                            <h3>Have Questions?</h3>
                            <p>We'd love to hear from you. Reach out to us for admissions, enquiries, or any other
                                information.</p>
                            <button className="btn btn-gold" style={{ "marginTop": "1.5rem" }} onClick={(e) => { e.preventDefault(); window.navigateTo('contact'); }}>Contact
                                Us <i className="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}
