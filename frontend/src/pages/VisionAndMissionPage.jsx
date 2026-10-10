import React from 'react';

export default function VisionAndMissionPage() {
  return (
    <>
<section className="page-section" id="page-vision-mission">
            <div className="page-banner">
                <h1>Vision & Mission</h1>
                <p>Guiding principles that drive everything we do</p>
                <div className="breadcrumb"><a href="#"
                        onClick={(e) => { e.preventDefault(); window.navigateTo('home'); }}>Home</a><span>/</span><span>Vision & Mission</span>
                </div>
            </div>
            <div className="section-padding">
                <div className="container">
                    <div className="vm-grid">
                        <div className="vm-card">
                            <div className="vm-icon"><i className="fas fa-eye"></i></div>
                            <h3>Our Vision</h3>
                            <p
                                style={{"fontFamily":"var(--font-display)","fontStyle":"italic","fontSize":"1.05rem","color":"var(--charcoal)","lineHeight":"1.8"}}>
                                To be a centre of academic excellence that nurtures compassionate, confident, and
                                responsible global citizens who will contribute meaningfully to society and lead with
                                integrity.</p>
                            <p style={{"marginTop":"1rem"}}>We envision a world where every child, regardless of background,
                                has access to transformative education that unlocks their full potential and empowers
                                them to create positive change.</p>
                        </div>
                        <div className="vm-card maroon-border">
                            <div className="vm-icon"><i className="fas fa-bullseye"></i></div>
                            <h3>Our Mission</h3>
                            <p
                                style={{"fontFamily":"var(--font-display)","fontStyle":"italic","fontSize":"1.05rem","color":"var(--charcoal)","lineHeight":"1.8"}}>
                                To provide a holistic, value-based education that fosters intellectual curiosity, moral
                                integrity, physical fitness, and social awareness in every student.</p>
                            <ul style={{"textAlign":"left","marginTop":"1rem","display":"flex","flexDirection":"column","gap":"0.5rem"}}>
                                <li
                                    style={{"fontSize":"0.92rem","color":"var(--text-light)","paddingLeft":"1.25rem","position":"relative"}}>
                                    <span style={{"position":"absolute","left":"0","color":"var(--gold)"}}><i
                                            className="fas fa-check-circle"></i></span> Maintain highest academic standards
                                    through innovative teaching
                                </li>
                                <li
                                    style={{"fontSize":"0.92rem","color":"var(--text-light)","paddingLeft":"1.25rem","position":"relative"}}>
                                    <span style={{"position":"absolute","left":"0","color":"var(--gold)"}}><i
                                            className="fas fa-check-circle"></i></span> Cultivate values of love, service,
                                    and respect for all
                                </li>
                                <li
                                    style={{"fontSize":"0.92rem","color":"var(--text-light)","paddingLeft":"1.25rem","position":"relative"}}>
                                    <span style={{"position":"absolute","left":"0","color":"var(--gold)"}}><i
                                            className="fas fa-check-circle"></i></span> Develop leadership skills and social
                                    responsibility
                                </li>
                                <li
                                    style={{"fontSize":"0.92rem","color":"var(--text-light)","paddingLeft":"1.25rem","position":"relative"}}>
                                    <span style={{"position":"absolute","left":"0","color":"var(--gold)"}}><i
                                            className="fas fa-check-circle"></i></span> Encourage creativity, critical
                                    thinking, and lifelong learning
                                </li>
                                <li
                                    style={{"fontSize":"0.92rem","color":"var(--text-light)","paddingLeft":"1.25rem","position":"relative"}}>
                                    <span style={{"position":"absolute","left":"0","color":"var(--gold)"}}><i
                                            className="fas fa-check-circle"></i></span> Build partnerships with parents and
                                    community for student success
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
