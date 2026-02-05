

-- ============================================================
-- RELATIONSHIP QUERIES
-- ============================================================

-- Insert sample contact messages linked to person
INSERT INTO contact_message_tab VALUES (
  contact_message_t(
    1,
    'John Doe',
    'john.doe@example.com',
    'Project Inquiry',
    'Hi, I am interested in discussing a potential project with you.',
    SYSDATE,
    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);

INSERT INTO contact_message_tab VALUES (
  contact_message_t(
    2,
    'Jane Smith',
    'jane.smith@company.com',
    'Collaboration Opportunity',
    'Would love to explore collaboration opportunities.',
    SYSDATE,
    (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
  )
);

COMMIT;




-- ============================================================
-- QUERIES TO VERIFY RELATIONSHIPS
-- ============================================================

-- Query 1: Get a person with all their projects
SELECT 
  p.id,
  p.full_name,
  p.title
FROM person_tab p
WHERE p.id = 1;

-- Get all projects for a specific person
SELECT 
  proj.id,
  proj.title,
  proj.description,
  proj.featured
FROM project_tab proj
WHERE proj.owner = (SELECT REF(p) FROM person_tab p WHERE p.id = 1);


-- Query 2: Get a person with all their experiences
SELECT 
  exp.id,
  exp.company,
  exp.role,
  exp.period
FROM experience_tab exp
WHERE exp.owner = (SELECT REF(p) FROM person_tab p WHERE p.id = 1);


-- Query 3: Get a person with all their contact messages
SELECT 
  msg.id,
  msg.sender_name,
  msg.sender_email,
  msg.subject,
  msg.sent_at
FROM contact_message_tab msg
WHERE msg.owner = (SELECT REF(p) FROM person_tab p WHERE p.id = 1);


-- Query 4: Get complete portfolio summary for a person
-- Person details
SELECT p.full_name, p.title, p.email
FROM person_tab p
WHERE p.id = 1;

-- Their projects count
SELECT COUNT(*) as total_projects
FROM project_tab proj
WHERE proj.owner = (SELECT REF(p) FROM person_tab p WHERE p.id = 1);

-- Their experiences count
SELECT COUNT(*) as total_experiences
FROM experience_tab exp
WHERE exp.owner = (SELECT REF(p) FROM person_tab p WHERE p.id = 1);

-- Their messages count
SELECT COUNT(*) as total_messages
FROM contact_message_tab msg
WHERE msg.owner = (SELECT REF(p) FROM person_tab p WHERE p.id = 1);


-- Query 5: Get project with owner details using DEREF
SELECT 
  proj.id,
  proj.title,
  DEREF(proj.owner).full_name as owner_name,
  DEREF(proj.owner).email as owner_email
FROM project_tab proj
WHERE proj.id = 1;


-- Query 6: Get experience with owner details using DEREF
SELECT 
  exp.id,
  exp.company,
  exp.role,
  DEREF(exp.owner).full_name as owner_name,
  DEREF(exp.owner).email as owner_email
FROM experience_tab exp
WHERE exp.id = 1;


-- Query 7: Get contact message with owner details using DEREF
SELECT 
  msg.id,
  msg.sender_name,
  msg.subject,
  DEREF(msg.owner).full_name as portfolio_owner,
  DEREF(msg.owner).email as owner_email
FROM contact_message_tab msg
WHERE msg.id = 1;


-- ============================================================
-- MIGRATION: ADD OWNER FIELD TO CONTACT_MESSAGE_TAB IF NOT EXISTS
-- ============================================================

-- First, check if we need to migrate contact_message_tab by trying to add owner attribute
-- If the table was created without owner, we need to recreate it

-- Step 1: Save existing data (if any)
CREATE TABLE contact_message_backup AS
SELECT id, sender_name, sender_email, subject, message, sent_at
FROM contact_message_tab;

-- Step 2: Drop the table
DROP TABLE contact_message_tab;

-- Step 3: Drop and recreate the type with owner field
DROP TYPE contact_message_t FORCE;

CREATE TYPE contact_message_t AS OBJECT (
  id NUMBER,
  sender_name VARCHAR2(100),
  sender_email VARCHAR2(100),
  subject VARCHAR2(200),
  message VARCHAR2(1000),
  sent_at DATE,
  owner REF person_t
);
/

-- Step 4: Recreate the table with owner field
CREATE TABLE contact_message_tab OF contact_message_t
(
  PRIMARY KEY (id),
  SCOPE FOR (owner) IS person_tab
);

-- Step 5: Restore data with owner reference
INSERT INTO contact_message_tab
SELECT contact_message_t(
  id,
  sender_name,
  sender_email,
  subject,
  message,
  sent_at,
  (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
)
FROM contact_message_backup;

-- Step 6: Drop the backup table
DROP TABLE contact_message_backup;

COMMIT;


-- ============================================================
-- UPDATE EXISTING DATA TO ENSURE ALL RELATIONSHIPS ARE SET
-- ============================================================

-- Update any projects without owner to belong to person id 1
UPDATE project_tab
SET owner = (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
WHERE owner IS NULL;

-- Update any experiences without owner to belong to person id 1
UPDATE experience_tab
SET owner = (SELECT REF(p) FROM person_tab p WHERE p.id = 1)
WHERE owner IS NULL;

COMMIT;


-- ============================================================
-- VERIFY ALL RELATIONSHIPS ARE PROPERLY SET
-- ============================================================

-- Verify all projects belong to Hamza Fallahi (person id 1)
SELECT 
  proj.id,
  proj.title,
  DEREF(proj.owner).full_name as owner_name
FROM project_tab proj;

-- Verify all experiences belong to Hamza Fallahi (person id 1)
SELECT 
  exp.id,
  exp.company,
  exp.role,
  DEREF(exp.owner).full_name as owner_name
FROM experience_tab exp;

-- Verify all contact messages belong to Hamza Fallahi (person id 1)
SELECT 
  msg.id,
  msg.sender_name,
  msg.subject,
  DEREF(msg.owner).full_name as portfolio_owner
FROM contact_message_tab msg;


-- ============================================================
-- COMPLETE PORTFOLIO SUMMARY FOR PERSON ID 1
-- ============================================================

-- Get complete portfolio data for Hamza Fallahi
SELECT 
  p.id,
  p.full_name,
  p.title,
  p.email,
  (SELECT COUNT(*) FROM project_tab proj WHERE proj.owner = REF(p)) as total_projects,
  (SELECT COUNT(*) FROM experience_tab exp WHERE exp.owner = REF(p)) as total_experiences,
  (SELECT COUNT(*) FROM contact_message_tab msg WHERE msg.owner = REF(p)) as total_messages
FROM person_tab p
WHERE p.id = 1;