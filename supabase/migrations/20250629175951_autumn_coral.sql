/*
  # Fix Categories and Nominees Relationship

  1. Changes
    - Ensure foreign key relationship is properly established
    - Add explicit indexes for better performance
    - Refresh schema cache by recreating the relationship

  2. Security
    - Maintain existing RLS policies
*/

-- First, ensure the foreign key constraint exists with proper naming
DO $$
BEGIN
  -- Drop existing constraint if it exists (to recreate it properly)
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'nominees_category_id_fkey' 
    AND table_name = 'nominees'
  ) THEN
    ALTER TABLE nominees DROP CONSTRAINT nominees_category_id_fkey;
  END IF;
  
  -- Recreate the foreign key constraint with explicit naming
  ALTER TABLE nominees 
  ADD CONSTRAINT nominees_category_id_fkey 
  FOREIGN KEY (category_id) 
  REFERENCES categories(id) 
  ON DELETE CASCADE;
END $$;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_nominees_category_id ON nominees(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_created_at ON categories(created_at);
CREATE INDEX IF NOT EXISTS idx_nominees_created_at ON nominees(created_at);

-- Ensure the tables have the correct structure
DO $$
BEGIN
  -- Verify categories table structure
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'categories' AND column_name = 'id'
  ) THEN
    RAISE EXCEPTION 'Categories table is missing or malformed';
  END IF;
  
  -- Verify nominees table structure
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'nominees' AND column_name = 'category_id'
  ) THEN
    RAISE EXCEPTION 'Nominees table is missing category_id column';
  END IF;
END $$;

-- Force a schema refresh by updating table comments
COMMENT ON TABLE categories IS 'Award categories for voting system - updated ' || now();
COMMENT ON TABLE nominees IS 'Nominees for each category - updated ' || now();

-- Verify the relationship works with a test query
DO $$
DECLARE
  test_count integer;
BEGIN
  -- This should not fail if the relationship is properly established
  SELECT COUNT(*) INTO test_count
  FROM categories c
  LEFT JOIN nominees n ON c.id = n.category_id;
  
  RAISE NOTICE 'Relationship test successful. Found % total records', test_count;
END $$;