-- ===================================================================
-- Stemora Database Schema for MySQL / GoDaddy cPanel phpMyAdmin
-- ===================================================================

CREATE DATABASE IF NOT EXISTS `stemora_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `stemora_db`;

-- 1. Enquiries Table (Stores school demo & programme enquiries)
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_name` VARCHAR(255) NOT NULL,
  `contact_person` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `programme` VARCHAR(100) DEFAULT 'General Enquiry',
  `message` TEXT,
  `status` ENUM('new', 'in_progress', 'contacted', 'closed') DEFAULT 'new',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Site Stats Table (Editable via Admin for dynamic stats counters)
CREATE TABLE IF NOT EXISTS `site_stats` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `students_trained` VARCHAR(50) DEFAULT '2500+',
  `sessions_delivered` VARCHAR(50) DEFAULT '350+',
  `projects_built` VARCHAR(50) DEFAULT '1200+',
  `partner_schools` VARCHAR(50) DEFAULT '45+',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Innovators of the Month Table (Wall of Innovators)
CREATE TABLE IF NOT EXISTS `innovators` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `badge` VARCHAR(100) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `project` TEXT NOT NULL,
  `grade_school` VARCHAR(255) NOT NULL,
  `photo_url` VARCHAR(500) DEFAULT '',
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Testimonials Table
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `quote` TEXT NOT NULL,
  `author_name` VARCHAR(255) NOT NULL,
  `role_school` VARCHAR(255) NOT NULL,
  `rating` INT DEFAULT 5,
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Site Settings / Contact Information Table
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `phone` VARCHAR(100) DEFAULT '+91 98765 43210',
  `email` VARCHAR(150) DEFAULT 'hello@stemora.in',
  `location` VARCHAR(255) DEFAULT 'Bangalore, Karnataka, India',
  `summer_dates` VARCHAR(150) DEFAULT 'April 15 – May 20, 2027',
  `summer_grades` VARCHAR(100) DEFAULT 'Grades 3 – 10',
  `summer_venue` VARCHAR(255) DEFAULT 'Stemora Innovation Lab & Partner Schools',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================================================================
-- Initial Default Seed Data
-- ===================================================================

-- Insert Default Site Stats (matching original template)
INSERT INTO `site_stats` (`id`, `students_trained`, `sessions_delivered`, `projects_built`, `partner_schools`)
VALUES (1, '2,500+', '450+', '1,800+', '35+')
ON DUPLICATE KEY UPDATE `students_trained` = VALUES(`students_trained`);

-- Insert Default Site Settings
INSERT INTO `site_settings` (`id`, `phone`, `email`, `location`, `summer_dates`, `summer_grades`, `summer_venue`)
VALUES (1, '+91 98765 43210', 'contact@stemora.in', 'Indiranagar & HSR Layout, Bangalore', 'April 10 – May 25, 2027', 'Grades 3 to 10 (Ages 8-16)', 'Stemora Innovation Labs, Bangalore')
ON DUPLICATE KEY UPDATE `phone` = VALUES(`phone`);

-- Insert Initial Wall of Innovators
INSERT INTO `innovators` (`badge`, `name`, `project`, `grade_school`, `photo_url`, `display_order`) VALUES
('Innovator of the Month', 'Aarav Sharma', 'Built an Obstacle-Avoiding Smart Rover using ultrasonic sensors and Arduino.', 'Grade 7 · National Public School, Bangalore', '', 1),
('Top Builder', 'Diya Rajesh', 'Designed a working robotic arm that sorts colored objects using micro-servos.', 'Grade 6 · Delhi Public School, Bangalore', '', 2),
('Creative Thinker', 'Rohan Verma', 'Invented an automated classroom plant-watering system with soil moisture sensors.', 'Grade 8 · Greenwood High, Bangalore', '', 3),
('Circuit Star', 'Ananya Kulkarni', 'Mastered integrated circuits and built a light-tracking solar panel prototype.', 'Grade 5 · Bethany High School, Bangalore', '', 4),
('Team Leader', 'Kavya & Kabir', 'Led the student team that won 1st Place in the Bangalore Inter-School Roborace.', 'Grade 8 · The Valley School, Bangalore', '', 5),
('Rising Coder', 'Siddharth Menon', 'Programmed an AI gesture-controlled LED matrix board in just 4 sessions.', 'Grade 4 · Inventure Academy, Bangalore', '', 6);

-- Insert Initial Testimonials
INSERT INTO `testimonials` (`quote`, `author_name`, `role_school`, `rating`, `display_order`) VALUES
('Stemora completely transformed how our students engage with science. Watching 6th graders assemble and code their first functional robot was an incredible sight.', 'Mrs. Radhika Iyer', 'Principal, Greenfield International School', 5, 1),
('My son used to be glued to video games. After attending Stemora’s RoboCircuit workshop, he spent the entire weekend building breadboard circuits and explaining them to us!', 'Dr. Arvind Swaminathan', 'Parent, Indiranagar', 5, 2),
('The curriculum is exceptionally structured. Their instructors bring all materials, provide hands-on mentorship, and our teachers learned so much alongside the students.', 'Mr. Anthony Fernandez', 'STEM Department Head, St. Joseph’s Boys’ High School', 5, 3);
