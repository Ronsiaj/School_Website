import React from 'react';
import classroom_img from "../assets/smart_classroom.jpg";
import science_lab_img from "../assets/science_lab.jpg";
import central_lib_img from "../assets/cental_lib.jpg";
import sports_complex_img from "../assets/sports_complex.jpg";
import school_transport_img from "../assets/school_transport.jpg";
import auditorium_img from "../assets/auditorium.jpg";


export default function CampusPage() {
    return (
        <>
            <section className="page-section" id="page-campus">
                <div className="page-banner">
                    <h1>Our Campus</h1>
                    <p>World-class infrastructure in a green, safe environment</p>
                    <div className="breadcrumb"><a href="#"
                        onClick={(e) => { e.preventDefault(); window.navigateTo('home'); }}>Home</a><span>/</span><span>Campus</span></div>
                </div>
                <div className="section-padding">
                    <div className="container">
                        <div className="campus-grid">
                            <div className="campus-card">
                                <div className="campus-img"><img src={classroom_img}
                                    alt="Smart Classrooms" loading="lazy" /></div>
                                <div className="campus-info">
                                    <h3>Smart Classrooms</h3>
                                    <p>60+ digital classrooms with interactive smart boards, projectors, and high-speed
                                        internet connectivity.</p>
                                </div>
                            </div>
                            <div className="campus-card">
                                <div className="campus-img"><img src={science_lab_img}
                                    alt="Science Labs" loading="lazy" /></div>
                                <div className="campus-info">
                                    <h3>Science Laboratories</h3>
                                    <p>Separate Physics, Chemistry, and Biology labs equipped with modern instruments and
                                        safety systems.</p>
                                </div>
                            </div>
                            <div className="campus-card">
                                <div className="campus-img"><img src={central_lib_img}
                                    alt="Library" loading="lazy" /></div>
                                <div className="campus-info">
                                    <h3>Central Library</h3>
                                    <p>25,000+ books, digital resources, e-journals, and a dedicated reading lounge for
                                        students and staff.</p>
                                </div>
                            </div>
                            <div className="campus-card">
                                <div className="campus-img"><img src={sports_complex_img}
                                    alt="Sports Complex" loading="lazy" /></div>
                                <div className="campus-info">
                                    <h3>Sports Complex</h3>
                                    <p>Football ground, basketball courts, swimming pool, indoor badminton, and a 400m
                                        athletic track.</p>
                                </div>
                            </div>
                            <div className="campus-card">
                                <div className="campus-img"><img src={school_transport_img}
                                    alt="Transport" loading="lazy" /></div>
                                <div className="campus-info">
                                    <h3>Transport Fleet</h3>
                                    <p>25 GPS-tracked school buses covering 40+ routes with trained drivers and attendants
                                        on every bus.</p>
                                </div>
                            </div>
                            <div className="campus-card">
                                <div className="campus-img"><img src={auditorium_img}
                                    alt="Auditorium" loading="lazy" /></div>
                                <div className="campus-info">
                                    <h3>Auditorium</h3>
                                    <p>A spacious, well-equipped auditorium designed to host seminars, cultural events,
                                        workshops, and academic programs with modern audio-visual facilities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
