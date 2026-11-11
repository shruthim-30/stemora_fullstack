-- ===================================================================
-- Stemora - Full Production MySQL Database Dump for GoDaddy cPanel
-- Import this via phpMyAdmin -> Import tab
-- ===================================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table: enquiries
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `school_name` varchar(255) NOT NULL,
  `contact_person` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `programme` varchar(100) DEFAULT 'General Enquiry',
  `message` text DEFAULT NULL,
  `status` enum('new','in_progress','contacted','closed') DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: site_stats
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `students_trained` varchar(50) DEFAULT '2,500+',
  `sessions_delivered` varchar(50) DEFAULT '450+',
  `projects_built` varchar(50) DEFAULT '1,800+',
  `partner_schools` varchar(50) DEFAULT '35+',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: innovators
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `innovators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `badge` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `project` text NOT NULL,
  `grade_school` varchar(255) NOT NULL,
  `photo_url` varchar(500) DEFAULT '',
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: testimonials
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quote` text NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `role_school` varchar(255) NOT NULL,
  `rating` int(11) DEFAULT 5,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: site_settings
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(100) DEFAULT '+91 98765 43210',
  `email` varchar(150) DEFAULT 'contact@stemora.in',
  `location` varchar(255) DEFAULT 'Indiranagar & HSR Layout, Bangalore',
  `summer_dates` varchar(150) DEFAULT 'April 10 – May 25, 2027',
  `summer_grades` varchar(100) DEFAULT 'Grades 3 to 10 (Ages 8-16)',
  `summer_venue` varchar(255) DEFAULT 'Stemora Innovation Labs, Bangalore',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Seed Initial Records
-- --------------------------------------------------------
INSERT INTO `site_stats` (`id`, `students_trained`, `sessions_delivered`, `projects_built`, `partner_schools`) 
VALUES (1, '2,500+', '450+', '1,800+', '35+')
ON DUPLICATE KEY UPDATE `students_trained` = VALUES(`students_trained`);

INSERT INTO `site_settings` (`id`, `phone`, `email`, `location`, `summer_dates`, `summer_grades`, `summer_venue`)
VALUES (1, '+91 98765 43210', 'contact@stemora.in', 'Indiranagar & HSR Layout, Bangalore', 'April 10 – May 25, 2027', 'Grades 3 to 10 (Ages 8-16)', 'Stemora Innovation Labs, Bangalore')
ON DUPLICATE KEY UPDATE `phone` = VALUES(`phone`);

INSERT INTO `innovators` (`id`, `badge`, `name`, `project`, `grade_school`, `photo_url`, `display_order`) VALUES
(1, 'Innovator of the Month', 'Aarav Sharma', 'Built an Obstacle-Avoiding Smart Rover using ultrasonic sensors and Arduino.', 'Grade 7 · National Public School, Bangalore', '', 1),
(2, 'Top Builder', 'Diya Rajesh', 'Designed a working robotic arm that sorts colored objects using micro-servos.', 'Grade 6 · Delhi Public School, Bangalore', '', 2),
(3, 'Creative Thinker', 'Rohan Verma', 'Invented an automated classroom plant-watering system with soil moisture sensors.', 'Grade 8 · Greenwood High, Bangalore', '', 3),
(4, 'Circuit Star', 'Ananya Kulkarni', 'Mastered integrated circuits and built a light-tracking solar panel prototype.', 'Grade 5 · Bethany High School, Bangalore', '', 4),
(5, 'Team Leader', 'Kavya & Kabir', 'Led the student team that won 1st Place in the Bangalore Inter-School Roborace.', 'Grade 8 · The Valley School, Bangalore', '', 5),
(6, 'Rising Coder', 'Siddharth Menon', 'Programmed an AI gesture-controlled LED matrix board in just 4 sessions.', 'Grade 4 · Inventure Academy, Bangalore', '', 6)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

INSERT INTO `testimonials` (`id`, `quote`, `author_name`, `role_school`, `rating`, `display_order`) VALUES
(1, 'Stemora completely transformed how our students engage with science. Watching 6th graders assemble and code their first functional robot was an incredible sight.', 'Mrs. Radhika Iyer', 'Principal, Greenfield International School', 5, 1),
(2, 'My son used to be glued to video games. After attending Stemora’s RoboCircuit workshop, he spent the entire weekend building breadboard circuits and explaining them to us!', 'Dr. Arvind Swaminathan', 'Parent, Indiranagar', 5, 2),
(3, 'The curriculum is exceptionally structured. Their instructors bring all materials, provide hands-on mentorship, and our teachers learned so much alongside the students.', 'Mr. Anthony Fernandez', 'STEM Department Head, St. Joseph’s Boys’ High School', 5, 3)
ON DUPLICATE KEY UPDATE `author_name` = VALUES(`author_name`);

COMMIT;
