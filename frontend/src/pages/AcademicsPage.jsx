import React from 'react';

export default function AcademicsPage() {
  return (
    <>
<section className="page-section" id="page-academics">
            <div className="page-banner">
                <h1>Academics</h1>
                <p>Rigorous curriculum designed for deep learning</p>
                <div className="breadcrumb"><a href="#"
                        onClick={(e) => { e.preventDefault(); window.navigateTo('home'); }}>Home</a><span>/</span><span>Academics</span></div>
            </div>
            <div className="section-padding">
                <div className="container">
                    <div className="section-header"><span className="overline">Academic Programme</span>
                        <h2>Curriculum & Pedagogy</h2>
                        <div className="divider"></div>
                        <p>We follow the CBSE curriculum enriched with innovative teaching methodologies that go beyond
                            textbooks.</p>
                    </div>
                    <div className="icon-cards" style={{"marginBottom":"3rem"}}>
                        <div className="icon-card">
                            <div className="icon-wrap"><i className="fas fa-child"></i></div>
                            <h3>Pre-Primary (KG)</h3>
                            <p>Play-based, activity-centred learning fostering early literacy, numeracy, and social
                                skills in a joyful environment.</p>
                        </div>
                        <div className="icon-card">
                            <div className="icon-wrap"><i className="fas fa-book-reader"></i></div>
                            <h3>Primary (I–V)</h3>
                            <p>Foundation building in languages, mathematics, environmental studies, and creative arts
                                with experiential learning.</p>
                        </div>
                        <div className="icon-card">
                            <div className="icon-wrap"><i className="fas fa-laptop-code"></i></div>
                            <h3>Middle School (VI–VIII)</h3>
                            <p>Expanded curriculum with science, social studies, computer science, and second language
                                options. Introduction to STEM activities.</p>
                        </div>
                        <div className="icon-card">
                            <div className="icon-wrap"><i className="fas fa-graduation-cap"></i></div>
                            <h3>Secondary (IX–X)</h3>
                            <p>Board exam preparation with comprehensive subject coaching, regular assessments, and
                                career guidance counselling.</p>
                        </div>
                        <div className="icon-card">
                            <div className="icon-wrap"><i className="fas fa-university"></i></div>
                            <h3>Senior Secondary (XI–XII)</h3>
                            <p>Science, Commerce, and Humanities streams with specialised electives, laboratory work,
                                and competitive exam coaching.</p>
                        </div>
                        <div className="icon-card">
                            <div className="icon-wrap"><i className="fas fa-brain"></i></div>
                            <h3>Special Programmes</h3>
                            <p>Olympiad coaching, remedial classes, gifted student programmes, and bridge courses for
                                smooth academic transitions.</p>
                        </div>
                    </div>
                    <div className="highlight-box" style={{"maxWidth":"800px","margin":"0 auto","textAlign":"center"}}>
                        <p>"Our pedagogy shifts from rote memorisation to understanding, application, and creation —
                            preparing students for a rapidly changing world."</p>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
