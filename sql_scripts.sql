CREATE USER portfolio IDENTIFIED BY portfolio123;

GRANT CONNECT, RESOURCE TO portfolio;
ALTER USER portfolio QUOTA UNLIMITED ON USERS;





CREATE TYPE technology_t AS OBJECT (
  name VARCHAR2(50)
);
/

CREATE TYPE technology_list_t AS TABLE OF technology_t;
/




CREATE TYPE achievement_t AS OBJECT (
  description VARCHAR2(500)
);
/

CREATE TYPE achievement_list_t AS TABLE OF achievement_t;
/




CREATE TYPE social_links_t AS OBJECT (
  github     VARCHAR2(200),
  linkedin   VARCHAR2(200),
  facebook   VARCHAR2(200),
  codeforces VARCHAR2(200)
);
/





CREATE TYPE person_t AS OBJECT (
  id NUMBER,
  full_name VARCHAR2(100),
  title VARCHAR2(100),
  bio VARCHAR2(500),
  email VARCHAR2(100),
  phone VARCHAR2(30),
  location VARCHAR2(100),
  image_url VARCHAR2(200),
  technology_tags technology_list_t,
  social_links social_links_t
);
/









CREATE TABLE person_tab OF person_t
(
  PRIMARY KEY (id)
)
NESTED TABLE technology_tags STORE AS person_tech_tags_nt;






CREATE TYPE project_t AS OBJECT (
  id NUMBER,
  title VARCHAR2(150),
  description VARCHAR2(1000),
  image_url VARCHAR2(200),
  github_url VARCHAR2(200),
  demo_url VARCHAR2(200),
  linkedin_post VARCHAR2(200),
  featured CHAR(1),
  tags technology_list_t,
  owner REF person_t
);
/





CREATE TABLE project_tab OF project_t
(
  PRIMARY KEY (id),
  SCOPE FOR (owner) IS person_tab
)
NESTED TABLE tags STORE AS project_tags_nt;






CREATE TYPE experience_t AS OBJECT (
  id NUMBER,
  company VARCHAR2(150),
  role VARCHAR2(100),
  period VARCHAR2(50),
  description VARCHAR2(500),
  link VARCHAR2(200),
  technologies technology_list_t,
  achievements achievement_list_t,
  owner REF person_t
);
/





CREATE TABLE experience_tab OF experience_t
(
  PRIMARY KEY (id),
  SCOPE FOR (owner) IS person_tab
)
NESTED TABLE technologies STORE AS exp_tech_nt
NESTED TABLE achievements STORE AS exp_achievements_nt;






CREATE TYPE contact_message_t AS OBJECT (
  id NUMBER,
  sender_name VARCHAR2(100),
  sender_email VARCHAR2(100),
  subject VARCHAR2(200),
  message VARCHAR2(1000),
  sent_at DATE
);
/






CREATE TABLE contact_message_tab OF contact_message_t
(
  PRIMARY KEY (id)
);


SELECT object_name, object_type
FROM user_objects
ORDER BY object_type;




CREATE TABLE admin_user (
  id NUMBER GENERATED ALWAYS AS IDENTITY,
  username VARCHAR2(50) UNIQUE,
  password_hash VARCHAR2(200),
  PRIMARY KEY (id)
);

SELECT * FROM admin_user;


INSERT INTO person_tab VALUES (
  person_t(
    1,
    'Hamza Fallahi',
    'Full Stack Engineer',
    'Passionate full-stack developer with 2+ years of experience building scalable web applications. I specialize in NextJs, MERN, Angular/SpringBoot.',
    'hamza.fallahi@esen.tn',
    '+216 50909086',
    'Bab Souika, Tunis.',
    'https://www.hamzafallahi.me/Hamza2.jpeg',

    -- technology_tags (nested table)
    technology_list_t(
      technology_t('NextJs'),
      technology_t('Spring Boot'),
      technology_t('Nodejs'),
      technology_t('React'),
      technology_t('Angular'),
      technology_t('Docker'),
      technology_t('MongoDB'),
      technology_t('PostgreSQL'),
      technology_t('MySQL'),
      technology_t('Tailwind Css'),
      technology_t('TypeScript'),
      technology_t('JavaScript'),
      technology_t('Java')
    ),

    -- social_links (object)
    social_links_t(
      'https://github.com/hamzafallahi',
      'https://www.linkedin.com/in/hamza-fallahi-b3b5b0246/',
      'https://www.facebook.com/hamza.fallahi.12/',
      'https://codeforces.com/profile/hamzafallahi'
    )
  )
);

COMMIT;





SELECT *
FROM person_tab ;


SET DEFINE OFF;


ALTER TYPE experience_t MODIFY ATTRIBUTE link VARCHAR2(500) CASCADE;


INSERT INTO experience_tab VALUES (
  experience_t(
    1,
    'Cloud Commit Software Solution',
    'Web Developer (Full-time)',
    'JAN 2025 - Present',
    'Developed a microservice-based appointment booking web application.',
    'https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_webdevelopment-microservices-reactjs-activity-7334637544271212544-q9yO?utm_source=share&utm_medium=member_desktop&rcm=ACoAADz03V8BPyjjCN1On9TRD4mewVSCm5QMPTk',

    technology_list_t(
      technology_t('React'),
      technology_t('Node.js'),
      technology_t('Docker'),
      technology_t('Redis'),
      technology_t('RabbitMQ'),
      technology_t('Keycloak'),
      technology_t('NGINX')
    ),

    achievement_list_t(
      achievement_t('Designed and developed the front-end using React with Atomic Design, React Query, and i18n.'),
      achievement_t('Built the back-end using Node.js (Express.js), containerized with Docker, and structured with NGINX.'),
      achievement_t('Integrated caching with Redis and asynchronous communication using RabbitMQ.'),
      achievement_t('Implemented data serialization/deserialization mechanisms and integrated Keycloak for authentication.')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);



INSERT INTO experience_tab VALUES (
  experience_t(
    2,
    'Freelance: Tunisian Automotive Association (TAA)',
    'Full Stack Developer',
    'OCT 2024 - Present',
    'Built a web platform called Référentiel ESG using Next.js.',
    'https://taa-esg.tn',

    technology_list_t(
      technology_t('Next.js')
    ),

    achievement_list_t(
      achievement_t('Designed the site to inform businesses about ESG practices and provided a paid ESG maturity assessment questionnaire.')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);



INSERT INTO experience_tab VALUES (
  experience_t(
    3,
    'Freelance: EsenNET Job Fair 2024',
    'Full Stack Developer',
    'NOV 2024',
    'Created a responsive website for EsenNET Job Fair 2024.',
    'https://esenet-jobfair2024.vercel.app/',

    technology_list_t(
      technology_t('Next.js'),
      technology_t('PostgreSQL'),
      technology_t('Google Sheets')
    ),

    achievement_list_t(
      achievement_t('Implemented a registration form and email-sending functionality.'),
      achievement_t('Stored data securely in PostgreSQL and Google Sheets.'),
      achievement_t('Delivered a seamless user experience.')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);




INSERT INTO experience_tab VALUES (
  experience_t(
    4,
    'Addixo Smart Factory (Momsoft)',
    'Full Stack Developer',
    'AUG 2024 - SEPT 2024',
    'Built and maintained multiple client projects using modern web technologies.',
    'https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_internship-smartfactory-tech-activity-7238701535403151360-X-cX?utm_source=share&utm_medium=member_desktop',

    technology_list_t(
      technology_t('Spring Boot'),
      technology_t('Angular'),
      technology_t('MongoDB'),
      technology_t('MySQL'),
      technology_t('OPC UA')
    ),

    achievement_list_t(
      achievement_t('Developed a web application for OPC Client-Server with Spring Boot and Angular.'),
      achievement_t('Collected, processed, and stored OPC UA data in MySQL and MongoDB.'),
      achievement_t('Implemented features for generating CSV and Excel files.')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);



INSERT INTO experience_tab VALUES (
  experience_t(
    5,
    'National Center for Informatics (CNI)',
    'MERN Stack Developer',
    'JUL 2024 - AUG 2024',
    'Developed and implemented new features for the company''s main product.',
    'https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_internship-internship-cni-activity-7219345692123664386-J-rl?utm_source=share&utm_medium=member_desktop',

    technology_list_t(
      technology_t('React'),
      technology_t('Node.js'),
      technology_t('PostgreSQL')
    ),

    achievement_list_t(
      achievement_t('Designed and developed a web application for municipal asset management using Node.js, React, and PostgreSQL.'),
      achievement_t('Integrated JWT authentication to secure user access.')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);

COMMIT;






INSERT INTO project_tab VALUES (
  project_t(
    1,
    'AppointNet - Appointment Booking Platform',
    'Developed a microservice-based appointment booking web application at Cloud Commit.',
    '/appointnet.png',
    '',
    '',
    'https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_webdevelopment-microservices-reactjs-activity-7334637544271212544-q9yO',
    'Y',

    technology_list_t(
      technology_t('React'),
      technology_t('Node.js'),
      technology_t('Docker'),
      technology_t('Redis'),
      technology_t('RabbitMQ'),
      technology_t('Keycloak'),
      technology_t('NGINX')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);




INSERT INTO project_tab VALUES (
  project_t(
    2,
    'Référentiel ESG - Web Platform',
    'Built a web platform using Next.js to inform businesses about ESG practices.',
    '/TAA ESG REF new.png',
    '',
    'https://taa-esg.tn',
    'https://www.linkedin.com/posts/hamza-fallahi-b3b5b0246_nextjs-esg-sustainability-activity-7334634162630361088-5L6h',
    'Y',

    technology_list_t(
      technology_t('Next.js')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);





INSERT INTO project_tab VALUES (
  project_t(
    3,
    'EsenNET Job Fair 2024 Website',
    'Created a responsive website for EsenNET Job Fair 2024 using Next.js.',
    '/esen.webp',
    '',
    'https://esenet-jobfair2024.vercel.app/',
    NULL,
    'N',

    technology_list_t(
      technology_t('Next.js'),
      technology_t('PostgreSQL'),
      technology_t('Google Sheets')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);



INSERT INTO project_tab VALUES (
  project_t(
    4,
    '9arini.tn - E-Learning Platform',
    'Developed the platform using PHP, AJAX, and MySQL.',
    '/9arini.webp',
    'https://github.com/hamzafallahi/9arini.tn-MVC-CRUD',
    '',
    NULL,
    'N',

    technology_list_t(
      technology_t('PHP'),
      technology_t('AJAX'),
      technology_t('MySQL'),
      technology_t('.NET')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);



INSERT INTO project_tab VALUES (
  project_t(
    5,
    'Esen Hive Club Website',
    'Developed a web application using Node.js, React, and PostgreSQL.',
    '/HIVE.webp',
    '',
    'https://drive.google.com/file/d/1nVrumS_sSEqMskdmC3Byt_6hdb7m8GF0/view',
    NULL,
    'N',

    technology_list_t(
      technology_t('Node.js'),
      technology_t('React'),
      technology_t('PostgreSQL'),
      technology_t('JWT')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);



INSERT INTO project_tab VALUES (
  project_t(
    6,
    'Doiini - Task Management App',
    'Designed and developed a task management app with Angular and Spring Boot.',
    '/doiini.webp',
    'https://github.com/hamzafallahi/doiini',
    'https://doiini.vercel.app/',
    NULL,
    'N',

    technology_list_t(
      technology_t('Angular'),
      technology_t('Spring Boot'),
      technology_t('MySQL')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);


INSERT INTO project_tab VALUES (
  project_t(
    7,
    'OPC Client-Server Web App',
    'Developed a web application for OPC Client-Server using Spring Boot and Angular.',
    '/opc.webp',
    '',
    '',
    NULL,
    'N',

    technology_list_t(
      technology_t('Spring Boot'),
      technology_t('Angular'),
      technology_t('MongoDB'),
      technology_t('MySQL'),
      technology_t('OPC UA')
    ),

    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);

-- Insert admin user (password: admin123)
INSERT INTO admin_user (username, password_hash) VALUES (
  'admin',
  '$2b$10$cUMNra7b8hGhVS4.FDKSE.Skt3RGhYDL1ItsCJgDTI4bjENjxMIwq' -- bcrypt hash for 'admin123'
);

COMMIT;

SELECT id, title, featured FROM project_tab;
SELECT id, company, role FROM experience_tab;



UPDATE admin_user 
SET password_hash = '$2b$10$xEGE9nNBkjgnffoWZs195O4y/m91Tm.NQx9k5jWeYeS2.XLzc3yVm'
WHERE id = 1; -- Replace with actual user ID


UPDATE admin_user 
SET password_hash = '$2b$10$cUMNra7b8hGhVS4.FDKSE.Skt3RGhYDL1ItsCJgDTI4bjENjxMIwq'
WHERE username = 'admin';

SELECT * FROM admin_user;


UPDATE admin_user 
SET password_hash = '$2b$10$yX6vPb.5q7W7m3Bq3VYJLeC5d5hK8nL2pR9sV1cM3nB7vN8qW2sT4'
WHERE username = 'admin';
COMMIT;


UPDATE admin_user 
SET password_hash = '$2b$10$tS4OU0WqAxyU90lXrjUqyeafssTq8.eA6Z8Mkeg7VrOdKFyYGZsEa'
WHERE username = 'admin';

UPDATE admin_user SET password_hash = '$2b$10$3W.OX/F/kNTgr7jtBO53QuXcIUou6wKz6sNqnJPE9IPwcXF./aUxq' WHERE username = 'admin';



UPDATE admin_user
SET password_hash = '$2b$10$3zj9eroJMGueYOEAvSKG0.5I.opgG5qGqs2jt8Gtd8zK.QRuvMBoG'
WHERE username = 'admin';
COMMIT;