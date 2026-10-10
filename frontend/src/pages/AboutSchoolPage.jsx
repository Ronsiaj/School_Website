import React from 'react';
import about_image from "../assets/about_image.png";
export default function AboutSchoolPage() {
    return (
        <>
            <section className="page-section" id="page-about-school">
                <div className="page-banner">
                    <h1>About Our School</h1>
                    <p>Six decades of nurturing minds and shaping character</p>
                    <div className="breadcrumb"><a href="#"
                        onClick={(e) => { e.preventDefault(); window.navigateTo('home'); }}>Home</a><span>/</span><span>About School</span></div>
                </div>
                <div className="section-padding">
                    <div className="container about-content">
                        <div className="about-content-img"><img src={about_image}
                            alt="School campus" /></div>
                        <div className="about-content-text">
                            <h2>A Legacy of Learning Since 1965</h2>
                            <p>St. Joseph's School was established in 1965 by the Congregation of the Brothers of St. Joseph
                                with a singular vision — to provide world-class education rooted in strong moral values.
                                What began as a small institution with 45 students has grown into one of the most respected
                                educational establishments in the region.</p>
                            <p>Our school is affiliated to the Central Board of Secondary Education (CBSE) and offers
                                education from Kindergarten through Class XII. The campus spans 12 acres of lush greenery,
                                providing a serene and stimulating environment for learning.</p>
                            <div className="highlight-box">
                                <p>"Education is not just about filling a vessel; it is about lighting a fire that
                                    illuminates the path ahead."</p>
                            </div>
                            <p>Over the past six decades, St. Joseph's has produced thousands of distinguished alumni who
                                have excelled in fields ranging from medicine and engineering to civil services, arts, and
                                entrepreneurship. Our commitment to the holistic development of every child remains
                                unwavering.</p>
                            <p>The school is recognised by the state education department and holds accreditation from the
                                National Assessment and Accreditation Council (NAAC). We are also ISO 9001:2015 certified
                                for our quality management systems in education.</p>
                            <h2 style={{ "marginTop": "2rem" }}>Our Core Values</h2>
                            <p>At St. Joseph's, every aspect of school life is guided by five core values: Integrity,
                                Excellence, Compassion, Responsibility, and Innovation. These values are not just words on a
                                wall — they are lived every day through our programmes, policies, and relationships.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
