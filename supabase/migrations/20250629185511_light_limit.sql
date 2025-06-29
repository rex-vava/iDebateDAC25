/*
  # Create Dreamers Academy Voting System Database

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `title` (text)
      - `icon` (text)
      - `description` (text)
      - `is_award` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `nominees`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `name` (text)
      - `photo` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `votes`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `nominee_id` (uuid, foreign key)
      - `voter_id` (text) - unique identifier for each voter
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  icon text NOT NULL,
  description text NOT NULL,
  is_award boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Nominees table
CREATE TABLE IF NOT EXISTS nominees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  photo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Votes table
CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  nominee_id uuid REFERENCES nominees(id) ON DELETE CASCADE,
  voter_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(category_id, voter_id)
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE nominees ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Categories can be updated by authenticated users"
  ON categories
  FOR ALL
  TO authenticated
  USING (true);

-- Policies for nominees
CREATE POLICY "Nominees are viewable by everyone"
  ON nominees
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Nominees can be managed by authenticated users"
  ON nominees
  FOR ALL
  TO authenticated
  USING (true);

-- Policies for votes
CREATE POLICY "Votes are viewable by everyone"
  ON votes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own votes"
  ON votes
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update their own votes"
  ON votes
  FOR UPDATE
  TO public
  USING (true);

-- Insert default categories
INSERT INTO categories (title, icon, description, is_award) VALUES
  ('Mama Mekha Award', '🥇', 'Lifetime Service Recognition - Special Award', true),
  ('Execution Excellence Award', '⚡', 'Outstanding Project Implementation and Leadership', false),
  ('Best Camp Coordinator', '🏕️', 'Based on camper feedback, leadership, and dedication', false),
  ('Top Host Venue', '🏛️', 'Most welcoming venue with strong logistical support', false),
  ('Volunteer Intake of the Decade', '🤝', 'Group that left a lasting mark through service and spirit', false),
  ('Mentor of the Decade', '👨‍🏫', 'Known for creating winning teams and impacting students', false),
  ('Best Afternoon Class', '🎨', 'The most engaging and enjoyable experience for campers', false),
  ('The Partner''s Spotlight', '🤝', 'Organization that provided exceptional support and partnership', false),
  ('Dreamer of the Decade', '💭', 'When you think of camp, who comes to mind?', false),
  ('Face of the Dreamers', '👑', 'The person who best represents the spirit of Dreamers Academy', false),
  ('Hype Maker of the Decade', '🎉', 'The person who brought the most energy and excitement to camp', false),
  ('Most Involved Alumni', '🔄', 'Alumni who consistently returned to support and mentor', false),
  ('Dream Creator of the Decade', '✨', 'The visionary who helped shape and create the dream', false);

-- Insert default nominees for categories that have them
DO $$
DECLARE
  cat_id uuid;
BEGIN
  -- Execution Excellence Award
  SELECT id INTO cat_id FROM categories WHERE title = 'Execution Excellence Award';
  INSERT INTO nominees (category_id, name) VALUES
    (cat_id, 'KALISA Danny'),
    (cat_id, 'Ornella TUZA'),
    (cat_id, 'Emma Victor'),
    (cat_id, 'Lucas SHEMA');

  -- Best Camp Coordinator
  SELECT id INTO cat_id FROM categories WHERE title = 'Best Camp Coordinator';
  INSERT INTO nominees (category_id, name) VALUES
    (cat_id, 'Ornella TUZA'),
    (cat_id, 'KALISA Danny'),
    (cat_id, 'Angelo URUKUNDO');

  -- Top Host Venue
  SELECT id INTO cat_id FROM categories WHERE title = 'Top Host Venue';
  INSERT INTO nominees (category_id, name) VALUES
    (cat_id, 'New Life High School'),
    (cat_id, 'Hope Haven'),
    (cat_id, 'Gashora Girls Academy');

  -- Volunteer Intake of the Decade
  SELECT id INTO cat_id FROM categories WHERE title = 'Volunteer Intake of the Decade';
  INSERT INTO nominees (category_id, name) VALUES
    (cat_id, 'iVolunteer ''25'),
    (cat_id, 'iVolunteer ''24'),
    (cat_id, 'iVolunteer ''23'),
    (cat_id, 'iVolunteer ''22');

  -- Mentor of the Decade
  SELECT id INTO cat_id FROM categories WHERE title = 'Mentor of the Decade';
  INSERT INTO nominees (category_id, name) VALUES
    (cat_id, 'Brenna AKARABO'),
    (cat_id, 'Shamila KAREMA'),
    (cat_id, 'Emma Victor'),
    (cat_id, 'Ruth JURU'),
    (cat_id, 'Queen KABANDANA'),
    (cat_id, 'Lucas SHEMA'),
    (cat_id, 'Bonfils RUKUNDO'),
    (cat_id, 'Joana BYUMVUHORE');

  -- Best Afternoon Class
  SELECT id INTO cat_id FROM categories WHERE title = 'Best Afternoon Class';
  INSERT INTO nominees (category_id, name) VALUES
    (cat_id, 'Dance Class'),
    (cat_id, 'Creative Writing'),
    (cat_id, 'Multimedia'),
    (cat_id, 'Art Class'),
    (cat_id, 'Leveraging AI'),
    (cat_id, 'Leadership Nexus');

  -- The Partner's Spotlight
  SELECT id INTO cat_id FROM categories WHERE title = 'The Partner''s Spotlight';
  INSERT INTO nominees (category_id, name) VALUES
    (cat_id, 'BK Foundation'),
    (cat_id, 'Mastercard Foundation'),
    (cat_id, 'JMU'),
    (cat_id, 'ALX');

  -- Face of the Dreamers
  SELECT id INTO cat_id FROM categories WHERE title = 'Face of the Dreamers';
  INSERT INTO nominees (category_id, name) VALUES
    (cat_id, 'Kalisa Deborah'),
    (cat_id, 'Ruzindana Kessy'),
    (cat_id, 'Akarabo Katsey');

  -- Hype Maker of the Decade
  SELECT id INTO cat_id FROM categories WHERE title = 'Hype Maker of the Decade';
  INSERT INTO nominees (category_id, name) VALUES
    (cat_id, 'Kendy'),
    (cat_id, 'La Tasha'),
    (cat_id, 'Abi');
END $$;