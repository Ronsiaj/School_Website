import React from 'react';

export default function WhychooseusPage() {
  return (
    <>
<section className="page-section" id="page-why-choose-us">
            <div className="page-banner">
                <h1>Why Choose Us</h1>
                <p>What sets St. Joseph's apart from the rest</p>
                <div className="breadcrumb"><a href="#"
                        onClick={(e) => { e.preventDefault(); window.navigateTo('home'); }}>Home</a><span>/</span><span>Why Choose Us</span></div>
            </div>
            <div className="section-padding">
                <div className="container">
                    <div className="wc-grid">
                        <div className="wc-item">
                            <div className="wc-num">01</div>
                            <div>
                                <h3>Proven Academic Track Record</h3>
                                <p>98% pass rate consistently, with students ranking in state and national level
                                    examinations year after year.</p>
                            </div>
                        </div>
                        <div className="wc-item">
                            <div className="wc-num">02</div>
                            <div>
                                <h3>Holistic Development Approach</h3>
                                <p>Equal emphasis on academics, sports, arts, and character education ensures
                                    well-rounded growth for every student.</p>
                            </div>
                        </div>
                        <div className="wc-item">
                            <div className="wc-num">03</div>
                            <div>
                                <h3>Modern Infrastructure</h3>
                                <p>Smart classrooms, digital library, advanced laboratories, sports complexes, and a
                                    safe, green campus.</p>
                            </div>
                        </div>
                        <div className="wc-item">
                            <div className="wc-num">04</div>
                            <div>
                                <h3>Individual Attention</h3>
                                <p>With a 20:1 student-teacher ratio, every child receives personalised guidance and
                                    mentorship.</p>
                            </div>
                        </div>
                        <div className="wc-item">
                            <div className="wc-num">05</div>
                            <div>
                                <h3>Safe & Nurturing Environment</h3>
                                <p>CCTV surveillance, trained security, counselling services, and anti-bullying policies
                                    ensure student safety.</p>
                            </div>
                        </div>
                        <div className="wc-item">
                            <div className="wc-num">06</div>
                            <div>
                                <h3>Strong Alumni Network</h3>
                                <p>Access to a thriving community of 15,000+ alumni across the globe for mentorship and
                                    opportunities.</p>
                            </div>
                        </div>
                        <div className="wc-item">
                            <div className="wc-num">07</div>
                            <div>
                                <h3>Technology-Integrated Learning</h3>
                                <p>Smart boards, coding curriculum from Class 3, robotics lab, and AI literacy
                                    programmes prepare students for the future.</p>
                            </div>
                        </div>
                        <div className="wc-item">
                            <div className="wc-num">08</div>
                            <div>
                                <h3>Value-Based Education</h3>
                                <p>Rooted in "Love & Serve," our programmes instil empathy, integrity, and social
                                    responsibility from an early age.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
