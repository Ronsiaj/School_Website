import React from 'react';

export default function LifeatSchoolPage() {
  return (
    <>
<section className="page-section" id="page-life-at-school">
            <div className="page-banner">
                <h1>Life at School</h1>
                <p>Where learning meets joy, friendship, and discovery</p>
                <div className="breadcrumb"><a href="#"
                        onClick={(e) => { e.preventDefault(); window.navigateTo('home'); }}>Home</a><span>/</span><span>Life at School</span>
                </div>
            </div>
            <div className="section-padding">
                <div className="container">
                    <div className="section-header"><span className="overline">Vibrant Campus Life</span>
                        <h2>Beyond the Classroom</h2>
                        <div className="divider"></div>
                        <p>At St. Joseph's, education extends far beyond textbooks. Our vibrant campus life ensures
                            students discover their passions and develop life skills.</p>
                    </div>
                    <div className="cards-grid">
                        <div className="card">
                            <div className="card-img"><img src="https://picsum.photos/seed/life-sports/600/400" alt="Sports"
                                    loading="lazy" /><span className="card-tag">Sports</span></div>
                            <div className="card-body">
                                <h3>Athletics & Team Sports</h3>
                                <p>Cricket, football, basketball, volleyball, athletics, swimming, karate, and yoga with
                                    professional coaching and inter-school competitions.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-img"><img src="https://picsum.photos/seed/life-music/600/400" alt="Music"
                                    loading="lazy" /><span className="card-tag">Arts</span></div>
                            <div className="card-body">
                                <h3>Music & Performing Arts</h3>
                                <p>Western and classical music training, school band, choir, dance troupes, and annual
                                    theatre productions.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-img"><img src="https://picsum.photos/seed/life-clubs/600/400" alt="Clubs"
                                    loading="lazy" /><span className="card-tag">Clubs</span></div>
                            <div className="card-body">
                                <h3>Student Clubs & Societies</h3>
                                <p>Debate Club, Science Club, Robotics Club, Eco Club, Literary Society, Photography
                                    Club, and Entrepreneurship Cell.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-img"><img src="https://picsum.photos/seed/life-service/600/400"
                                    alt="Service" loading="lazy" /><span className="card-tag">Service</span></div>
                            <div className="card-body">
                                <h3>Community Service</h3>
                                <p>Outreach programmes, visits to orphanages and old-age homes, cleanliness drives, and
                                    environmental conservation projects.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-img"><img src="https://picsum.photos/seed/life-excursion/600/400"
                                    alt="Excursions" loading="lazy" /><span className="card-tag">Excursions</span></div>
                            <div className="card-body">
                                <h3>Field Trips & Excursions</h3>
                                <p>Educational tours, heritage walks, science centre visits, and adventure camps that
                                    bring learning to life.</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-img"><img src="https://picsum.photos/seed/life-celebration/600/400"
                                    alt="Celebrations" loading="lazy" /><span className="card-tag">Events</span></div>
                            <div className="card-body">
                                <h3>Celebrations & Festivals</h3>
                                <p>Annual Day, Sports Day, Cultural Fest, Teachers' Day, Children's Day, and all major
                                    festival celebrations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
