import React from 'react';

export default function Announcementbar() {
  return (
    <>
<div className="announcement-bar" id="announcementBar">
        <div className="marquee-wrap">
            <div className="marquee-content">
                <span><i className="fas fa-bullhorn"></i> Admissions Open for 2025-26 — Apply Now!</span>
                <span><i className="fas fa-trophy"></i> Our students secured Top 10 positions in State Board Exams</span>
                <span><i className="fas fa-calendar"></i> Annual Day Celebration — March 15, 2025</span>
                <span><i className="fas fa-star"></i> Rated as Best School in the District for 3 consecutive years</span>
                <span><i className="fas fa-bullhorn"></i> Admissions Open for 2025-26 — Apply Now!</span>
                <span><i className="fas fa-trophy"></i> Our students secured Top 10 positions in State Board Exams</span>
            </div>
        </div>
        <button className="close-ann" onClick={(e) => { document.getElementById('announcementBar').style.display='none' }}
            aria-label="Close announcement"><i className="fas fa-times"></i></button>
    </div>
    </>
  );
}
