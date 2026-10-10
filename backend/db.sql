-- =====================================================================
-- St. Joseph's School - Database Schema
-- Import via phpMyAdmin or: mysql -u root school_db < db.sql
-- Create the database first: CREATE DATABASE school_db;
-- =====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ===== ADMINS =====
CREATE TABLE IF NOT EXISTS admins (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL DEFAULT 'Administrator',
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Demo credentials -> admin / Admin@123 (matches the original static frontend)
INSERT INTO admins (name, email, password) VALUES
('Administrator', 'admin', '$2y$10$.9C/HAMsxet4zs1l6uqnT.RgTGnFQyo3dhHO2Roc0G/k18vOUwMyC');
-- Change this password after first login. To generate a new hash:
--   php -r "echo password_hash('your-new-password', PASSWORD_DEFAULT);"

-- ===== ADMIN TOKENS (token-based auth, matches existing frontend JS) =====
CREATE TABLE IF NOT EXISTS admin_tokens (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    admin_id   INT NOT NULL,
    token      VARCHAR(64) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===== GALLERY =====
CREATE TABLE IF NOT EXISTS gallery (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    image      VARCHAR(255) NOT NULL,
    title      VARCHAR(100) NOT NULL,
    category   ENUM('campus','events','sports','achievements') NOT NULL DEFAULT 'campus',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===== NEWS & EVENTS =====
CREATE TABLE IF NOT EXISTS news (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image       VARCHAR(255) DEFAULT NULL,
    type        ENUM('news','event','achievements') NOT NULL DEFAULT 'news',
    event_date  DATE NOT NULL,
    status      ENUM('published','draft') NOT NULL DEFAULT 'published',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO news (title, description, image, type, event_date, status) VALUES
('Annual Day Celebrations 2025', 'A spectacular showcase of talent, creativity, and school spirit marked this year''s Annual Day celebrations with over 1500 participants.', NULL, 'news', '2025-02-28', 'published'),
('State Board Exam Toppers', 'Five students from St. Joseph''s secured positions in the State Top 10 list in the CBSE Board Examinations.', NULL, 'achievements', '2025-02-15', 'published'),
('Inter-School Science Fair', 'Our school hosted the regional Science Fair with over 30 participating schools and 200+ innovative projects.', NULL, 'event', '2025-01-20', 'published'),
('National Science Olympiad Gold', 'Rohan Patel won the Gold Medal in the National Science Olympiad, competing against 50,000+ students nationwide.', NULL, 'achievements', '2025-01-28', 'published'),
('Republic Day Celebrations', 'The school observed Republic Day with a flag hoisting ceremony, cultural programme, and patriotic speeches by students.', NULL, 'event', '2025-01-26', 'published'),
('New Computer Lab Inaugurated', 'A state-of-the-art computer lab with 60 workstations, robotics kits, and AI learning tools was inaugurated by the Chief Guest.', NULL, 'news', '2025-01-10', 'published'),
('State Athletics Champions', 'Our athletics team dominated the State Level Schools Athletics Meet, winning 8 gold, 5 silver, and 3 bronze medals.', NULL, 'achievements', '2024-11-05', 'published'),
('Christmas Celebrations', 'The school community came together for a joyous Christmas celebration with carols, a nativity play, and gift exchange.', NULL, 'event', '2024-12-24', 'published'),
('Best School Award Received', 'St. Joseph''s was awarded the "Best School in the District" by the State Education Department for the third consecutive year.', NULL, 'news', '2024-10-18', 'published');

-- ===== ACHIEVEMENTS (Hall of Excellence timeline) =====
CREATE TABLE IF NOT EXISTS achievements (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    student_name  VARCHAR(100) NOT NULL,
    achievement   TEXT NOT NULL,
    image         VARCHAR(255) DEFAULT NULL,
    year          INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO achievements (student_name, achievement, image, year) VALUES
('State Board Top 10', 'Five students from Class XII secured positions in the State Top 10 in the CBSE Board Examinations, a record for the school.', NULL, 2025),
('National Science Olympiad', 'Rohan Patel won the Gold Medal in the National Science Olympiad, competing against 50,000+ students nationwide.', NULL, 2025),
('Inter-School Debate Championship', 'The school debate team won the prestigious District Inter-School Debate Championship for the third consecutive year.', NULL, 2024),
('State Athletics Meet', 'Our athletics team dominated the State Level Schools Athletics Meet, winning 8 gold, 5 silver, and 3 bronze medals.', NULL, 2024),
('Best School Award', 'St. Joseph''s was awarded the "Best School in the District" by the State Education Department for the third consecutive year.', NULL, 2024);

-- ===== CONTENT (singleton key/value text - leadership, vision/mission, school info) =====
CREATE TABLE IF NOT EXISTS content (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    content_key    VARCHAR(100) NOT NULL UNIQUE,
    content_value  TEXT,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO content (content_key, content_value) VALUES
('vision_statement', 'To be a centre of academic excellence that nurtures compassionate, confident, and responsible global citizens who will contribute meaningfully to society and lead with integrity.'),
('mission_statement', 'To provide a holistic, value-based education that fosters intellectual curiosity, moral integrity, physical fitness, and social awareness in every student.'),
('founder_name', 'Rev. Fr. Thomas Joseph'),
('founder_message', 'When I founded this institution in 1965, my dream was simple — to create a space where every child could discover their God-given potential. Education, to me, has never been merely about academic achievement.'),
('principal_name', 'Sr. Dr. Margaret Noronha'),
('principal_message', 'It is both an honour and a profound responsibility to lead St. Joseph''s School as its Principal. Every day, I walk through these corridors knowing that we are shaping the future — one student at a time.'),
('superior_name', 'Rev. Fr. Augustine D''Souza'),
('superior_message', 'As the Superior of this institution, I am entrusted with safeguarding the mission and values upon which St. Joseph''s was built.'),
('announcement_text', 'Admissions Open for 2025-26 — Apply Now!|Our students secured Top 10 positions in State Board Exams|Annual Day Celebration — March 15, 2025|Rated as Best School in the District for 3 consecutive years'),
('school_phone', '+91 80 1234 5678'),
('school_phone_alt', '+91 98765 43210'),
('school_email', 'info@stjosephsschool.edu'),
('school_address', '123 Education Lane, Knowledge City, State — 560001'),
('office_hours', 'Mon – Sat: 8:00 AM – 4:00 PM'),
('about_students_count', '2500'),
('about_faculty_count', '120'),
('about_pass_rate', '98');

-- ===== GENERIC ITEMS (hero slides, why-choose-us, departments, campus, life-at-school, achievers, testimonials, alumni, academics levels, icon cards) =====
CREATE TABLE IF NOT EXISTS items (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    section     VARCHAR(50) NOT NULL,
    title       VARCHAR(255) DEFAULT NULL,
    subtitle    VARCHAR(255) DEFAULT NULL,
    description TEXT,
    image       VARCHAR(255) DEFAULT NULL,
    sort_order  INT NOT NULL DEFAULT 0,
    status      ENUM('active','draft') NOT NULL DEFAULT 'active',
    extra       TEXT DEFAULT NULL COMMENT 'JSON blob for section-specific fields',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_section (section)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Why Choose Us
INSERT INTO items (section, title, description, sort_order, extra) VALUES
('why_choose_us', 'Proven Academic Track Record', '98% pass rate consistently, with students ranking in state and national level examinations year after year.', 1, '{"num":"01"}'),
('why_choose_us', 'Holistic Development Approach', 'Equal emphasis on academics, sports, arts, and character education ensures well-rounded growth for every student.', 2, '{"num":"02"}'),
('why_choose_us', 'Modern Infrastructure', 'Smart classrooms, digital library, advanced laboratories, sports complexes, and a safe, green campus.', 3, '{"num":"03"}'),
('why_choose_us', 'Individual Attention', 'With a 20:1 student-teacher ratio, every child receives personalised guidance and mentorship.', 4, '{"num":"04"}'),
('why_choose_us', 'Safe & Nurturing Environment', 'CCTV surveillance, trained security, counselling services, and anti-bullying policies ensure student safety.', 5, '{"num":"05"}'),
('why_choose_us', 'Strong Alumni Network', 'Access to a thriving community of 15,000+ alumni across the globe for mentorship and opportunities.', 6, '{"num":"06"}'),
('why_choose_us', 'Technology-Integrated Learning', 'Smart boards, coding curriculum from Class 3, robotics lab, and AI literacy programmes prepare students for the future.', 7, '{"num":"07"}'),
('why_choose_us', 'Value-Based Education', 'Rooted in "Love & Serve," our programmes instil empathy, integrity, and social responsibility from an early age.', 8, '{"num":"08"}');

-- Departments
INSERT INTO items (section, title, description, sort_order, extra) VALUES
('departments', 'Mathematics', 'Developing logical reasoning and problem-solving skills through innovative teaching methods and real-world applications.', 1, '{"icon":"fa-calculator"}'),
('departments', 'Science', 'Physics, Chemistry, and Biology departments with fully equipped labs and inquiry-based learning approaches.', 2, '{"icon":"fa-atom"}'),
('departments', 'Languages', 'English, Hindi, and Sanskrit departments focusing on communication skills, literature appreciation, and creative writing.', 3, '{"icon":"fa-language"}'),
('departments', 'Social Studies', 'History, Geography, Civics, and Economics taught through interactive projects, field trips, and debates.', 4, '{"icon":"fa-globe-americas"}'),
('departments', 'Computer Science', 'Coding, AI literacy, robotics, and web development programmes from Class 3 onwards in dedicated computer labs.', 5, '{"icon":"fa-desktop"}'),
('departments', 'Fine Arts', 'Visual arts, music, dance, and theatre departments nurturing creative expression and artistic excellence.', 6, '{"icon":"fa-paint-brush"}'),
('departments', 'Physical Education', 'Comprehensive sports programme with professional coaches, fitness training, and competitive athletics development.', 7, '{"icon":"fa-running"}'),
('departments', 'Value Education', 'Character formation, ethics, life skills, and community service programmes rooted in our motto "Love & Serve."', 8, '{"icon":"fa-heart"}');

-- Campus
INSERT INTO items (section, title, description, sort_order) VALUES
('campus', 'Smart Classrooms', '60+ digital classrooms with interactive smart boards, projectors, and high-speed internet connectivity.', 1),
('campus', 'Science Laboratories', 'Separate Physics, Chemistry, and Biology labs equipped with modern instruments and safety systems.', 2),
('campus', 'Central Library', '25,000+ books, digital resources, e-journals, and a dedicated reading lounge for students and staff.', 3),
('campus', 'Sports Complex', 'Football ground, basketball courts, swimming pool, indoor badminton, and a 400m athletic track.', 4),
('campus', 'Transport Fleet', '25 GPS-tracked school buses covering 40+ routes with trained drivers and attendants on every bus.', 5),
('campus', 'Auditorium', 'A spacious, well-equipped auditorium designed to host seminars, cultural events, workshops, and academic programs with modern audio-visual facilities.', 6);

-- Life at School
INSERT INTO items (section, title, description, sort_order, extra) VALUES
('life_at_school', 'Athletics & Team Sports', 'Cricket, football, basketball, volleyball, athletics, swimming, karate, and yoga with professional coaching and inter-school competitions.', 1, '{"tag":"Sports"}'),
('life_at_school', 'Music & Performing Arts', 'Western and classical music training, school band, choir, dance troupes, and annual theatre productions.', 2, '{"tag":"Arts"}'),
('life_at_school', 'Student Clubs & Societies', 'Debate Club, Science Club, Robotics Club, Eco Club, Literary Society, Photography Club, and Entrepreneurship Cell.', 3, '{"tag":"Clubs"}'),
('life_at_school', 'Community Service', 'Outreach programmes, visits to orphanages and old-age homes, cleanliness drives, and environmental conservation projects.', 4, '{"tag":"Service"}'),
('life_at_school', 'Field Trips & Excursions', 'Educational tours, heritage walks, science centre visits, and adventure camps that bring learning to life.', 5, '{"tag":"Excursions"}'),
('life_at_school', 'Celebrations & Festivals', 'Annual Day, Sports Day, Cultural Fest, Teachers'' Day, Children''s Day, and all major festival celebrations.', 6, '{"tag":"Events"}');

-- Achievers (Hall of Fame)
INSERT INTO items (section, title, subtitle, sort_order, extra) VALUES
('achievers', 'Aarav Krishnan', 'Class XII — State Rank 3', 1, '{"score":"98.6%","initials":"AK"}'),
('achievers', 'Sneha Mukherjee', 'Class X — District Topper', 2, '{"score":"97.8%","initials":"SM"}'),
('achievers', 'Rohan Patel', 'National Science Olympiad', 3, '{"score":"Gold","initials":"RP"}'),
('achievers', 'Isha Thakur', 'State Level Debate', 4, '{"score":"1st Place","initials":"IT"}'),
('achievers', 'Vikram Joshi', 'State Athletics Champion', 5, '{"score":"100m — 10.8s","initials":"VJ"}');

-- Testimonials
INSERT INTO items (section, title, description, sort_order, extra) VALUES
('testimonials', 'Dr. Ananya Sharma', 'St. Joseph''s didn''t just educate me — it shaped who I am. The values of love and service stay with me in every aspect of my life and career.', 1, '{"role":"Alumni, Batch of 2010 — Cardiac Surgeon"}'),
('testimonials', 'Rajesh Kumar', 'As a parent, I couldn''t have asked for a better environment for my children. The teachers truly care about every child''s individual growth.', 2, '{"role":"Parent — Children in Classes 5 and 9"}'),
('testimonials', 'Priya Menon', 'The school''s emphasis on both academics and extracurriculars gave me the confidence to pursue my dream of representing India in debate.', 3, '{"role":"Alumni, Batch of 2018 — National Debate Champion"}');

-- Alumni
INSERT INTO items (section, title, sort_order, extra) VALUES
('alumni', 'Dr. Ananya Sharma', 1, '{"batch":"Batch of 2010","role":"Cardiac Surgeon, AIIMS","initials":"AS"}'),
('alumni', 'Rahul Kapoor', 2, '{"batch":"Batch of 2005","role":"CEO, TechVentures India","initials":"RK"}'),
('alumni', 'Priya Menon', 3, '{"batch":"Batch of 2018","role":"National Debate Champion","initials":"PM"}'),
('alumni', 'Vikram Desai', 4, '{"batch":"Batch of 2008","role":"IAS Officer","initials":"VD"}'),
('alumni', 'Sunita Nair', 5, '{"batch":"Batch of 2012","role":"BBC Journalist","initials":"SN"}');

-- Academics levels
INSERT INTO items (section, title, description, sort_order, extra) VALUES
('academics_levels', 'Pre-Primary (KG)', 'Play-based, activity-centred learning fostering early literacy, numeracy, and social skills in a joyful environment.', 1, '{"icon":"fa-child"}'),
('academics_levels', 'Primary (I–V)', 'Foundation building in languages, mathematics, environmental studies, and creative arts with experiential learning.', 2, '{"icon":"fa-book-reader"}'),
('academics_levels', 'Middle School (VI–VIII)', 'Expanded curriculum with science, social studies, computer science, and second language options. Introduction to STEM activities.', 3, '{"icon":"fa-laptop-code"}'),
('academics_levels', 'Secondary (IX–X)', 'Board exam preparation with comprehensive subject coaching, regular assessments, and career guidance counselling.', 4, '{"icon":"fa-graduation-cap"}'),
('academics_levels', 'Senior Secondary (XI–XII)', 'Science, Commerce, and Humanities streams with specialised electives, laboratory work, and competitive exam coaching.', 5, '{"icon":"fa-university"}'),
('academics_levels', 'Special Programmes', 'Olympiad coaching, remedial classes, gifted student programmes, and bridge courses for smooth academic transitions.', 6, '{"icon":"fa-brain"}');

-- Icon cards ("What Makes Us Exceptional" home section)
INSERT INTO items (section, title, description, sort_order, extra) VALUES
('icon_cards', 'Academic Excellence', 'Consistently top-ranking results with a rigorous curriculum designed for deep understanding and critical thinking.', 1, '{"icon":"fa-book-open"}'),
('icon_cards', 'Modern Laboratories', 'Fully equipped science, computer, and language labs providing hands-on learning experiences for every student.', 2, '{"icon":"fa-flask"}'),
('icon_cards', 'Expert Faculty', '120+ highly qualified and experienced educators committed to bringing out the best in every learner.', 3, '{"icon":"fa-users"}'),
('icon_cards', 'Sports & Fitness', 'Comprehensive sports programme with professional coaching, indoor courts, and athletic tracks.', 4, '{"icon":"fa-futbol"}'),
('icon_cards', 'Arts & Culture', 'Rich programmes in music, dance, drama, and visual arts fostering creativity and self-expression.', 5, '{"icon":"fa-palette"}'),
('icon_cards', 'Value Education', 'Rooted in the motto "Love & Serve," we instil compassion, integrity, and social responsibility.', 6, '{"icon":"fa-globe-asia"}');

-- ===== CONTACT MESSAGES =====
CREATE TABLE IF NOT EXISTS contact_messages (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    phone      VARCHAR(20) NOT NULL,
    email      VARCHAR(100) NOT NULL,
    subject    VARCHAR(150) NOT NULL,
    message    TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
