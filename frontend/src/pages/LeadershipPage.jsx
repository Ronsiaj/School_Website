import React from 'react';

export default function LeadershipPage() {
  return (
    <>
<section className="page-section" id="page-leadership">
            <div className="page-banner">
                <h1>Our Leadership</h1>
                <p>The visionaries guiding St. Joseph's School</p>
                <div className="breadcrumb"><a href="#"
                        onClick={(e) => { e.preventDefault(); window.navigateTo('home'); }}>Home</a><span>/</span><span>Leadership</span></div>
            </div>
            <div className="section-padding">
                <div className="container" style={{"maxWidth":"900px"}}>
                    <div className="leader-card">
                        <div className="leader-img"><i className="fas fa-user-tie"></i></div>
                        <div className="leader-info"><span className="role">Founder</span>
                            <h3>Rev. Fr. Thomas Joseph</h3>
                            <p>"When I founded this institution in 1965, my dream was simple — to create a space where
                                every child could discover their God-given potential. Education, to me, has never been
                                merely about academic achievement. It is about forming individuals who carry the light
                                of knowledge, the warmth of compassion, and the strength of character into the world.
                                Six decades later, seeing our alumni lead in every field fills my heart with profound
                                gratitude. The journey of St. Joseph's is a testament to what can be achieved when a
                                community comes together with a shared purpose — to love and to serve."</p>
                        </div>
                    </div>
                    <div className="leader-card">
                        <div className="leader-img" style={{"background":"linear-gradient(135deg,var(--gold-dark),var(--gold))"}}>
                            <i className="fas fa-user-shield" style={{"color":"var(--white)"}}></i>
                        </div>
                        <div className="leader-info"><span className="role">Superior</span>
                            <h3>Rev. Fr. Augustine D'Souza</h3>
                            <p>"As the Superior of this institution, I am entrusted with safeguarding the mission and
                                values upon which St. Joseph's was built. My role is to ensure that our school remains
                                true to its founding principles while adapting to the evolving needs of education in the
                                21st century. We are committed to maintaining an inclusive environment where diversity
                                is celebrated, faith is respected, and every individual is treated with dignity. Our
                                management team works tirelessly to provide the best possible resources for our students
                                and staff, ensuring that St. Joseph's continues to be a beacon of educational
                                excellence."</p>
                        </div>
                    </div>
                    <div className="leader-card">
                        <div className="leader-img" style={{"background":"linear-gradient(135deg,#2D2D2D,#444)"}}><i
                                className="fas fa-chalkboard-teacher" style={{"color":"var(--gold)"}}></i></div>
                        <div className="leader-info"><span className="role">Principal</span>
                            <h3>Sr. Dr. Margaret Noronha</h3>
                            <p>"It is both an honour and a profound responsibility to lead St. Joseph's School as its
                                Principal. Every day, I walk through these corridors knowing that we are shaping the
                                future — one student at a time. Our focus is on creating a learning ecosystem that is
                                rigorous yet joyful, challenging yet supportive. We have introduced several initiatives
                                in recent years — from project-based learning and STEM education to mindfulness
                                programmes and peer mentoring. My message to every student is this: believe in yourself,
                                embrace challenges as opportunities, and remember that at St. Joseph's, we are not just
                                preparing you for exams — we are preparing you for life."</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
