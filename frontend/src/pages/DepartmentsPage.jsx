import React from 'react';

export default function DepartmentsPage() {
  return (
    <>
<section className="page-section" id="page-departments">
            <div className="page-banner">
                <h1>Departments</h1>
                <p>Dedicated departments driving excellence in every discipline</p>
                <div className="breadcrumb"><a href="#"
                        onClick={(e) => { e.preventDefault(); window.navigateTo('home'); }}>Home</a><span>/</span><span>Departments</span></div>
            </div>
            <div className="section-padding">
                <div className="container">
                    <div className="dept-grid">
                        <div className="dept-card">
                            <h3><i className="fas fa-calculator"
                                    style={{"color":"var(--gold)","marginRight":"0.5rem"}}></i>Mathematics</h3>
                            <p>Developing logical reasoning and problem-solving skills through innovative teaching
                                methods and real-world applications.</p>
                        </div>
                        <div className="dept-card">
                            <h3><i className="fas fa-atom" style={{"color":"var(--maroon)","marginRight":"0.5rem"}}></i>Science</h3>
                            <p>Physics, Chemistry, and Biology departments with fully equipped labs and inquiry-based
                                learning approaches.</p>
                        </div>
                        <div className="dept-card">
                            <h3><i className="fas fa-language" style={{"color":"var(--gold)","marginRight":"0.5rem"}}></i>Languages
                            </h3>
                            <p>English, Hindi, and Sanskrit departments focusing on communication skills, literature
                                appreciation, and creative writing.</p>
                        </div>
                        <div className="dept-card">
                            <h3><i className="fas fa-globe-americas"
                                    style={{"color":"var(--maroon)","marginRight":"0.5rem"}}></i>Social Studies</h3>
                            <p>History, Geography, Civics, and Economics taught through interactive projects, field
                                trips, and debates.</p>
                        </div>
                        <div className="dept-card">
                            <h3><i className="fas fa-desktop" style={{"color":"var(--gold)","marginRight":"0.5rem"}}></i>Computer
                                Science</h3>
                            <p>Coding, AI literacy, robotics, and web development programmes from Class 3 onwards in
                                dedicated computer labs.</p>
                        </div>
                        <div className="dept-card">
                            <h3><i className="fas fa-paint-brush" style={{"color":"var(--maroon)","marginRight":"0.5rem"}}></i>Fine
                                Arts</h3>
                            <p>Visual arts, music, dance, and theatre departments nurturing creative expression and
                                artistic excellence.</p>
                        </div>
                        <div className="dept-card">
                            <h3><i className="fas fa-running" style={{"color":"var(--gold)","marginRight":"0.5rem"}}></i>Physical
                                Education</h3>
                            <p>Comprehensive sports programme with professional coaches, fitness training, and
                                competitive athletics development.</p>
                        </div>
                        <div className="dept-card">
                            <h3><i className="fas fa-heart" style={{"color":"var(--maroon)","marginRight":"0.5rem"}}></i>Value
                                Education</h3>
                            <p>Character formation, ethics, life skills, and community service programmes rooted in our
                                motto "Love & Serve."</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
