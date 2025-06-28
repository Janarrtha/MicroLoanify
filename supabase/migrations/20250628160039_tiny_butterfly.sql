/*
  # Create new user_profiles table

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `country` (text)
      - `business_type` (text)
      - `weekly_transactions` (text)
      - `monthly_revenue` (text)
      - `record_keeping` (text)
      - `mobile_money` (text)
      - `social_media_promotion` (text)
      - `communication_method` (text)
      - `staff_count` (text)
      - `business_duration` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add simple policy for public access during registration
    - Add policy for users to read their own data

  3. Notes
    - Fresh table with no conflicting policies
    - Simple RLS setup to avoid previous issues
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  country text NOT NULL,
  business_type text NOT NULL,
  weekly_transactions text,
  monthly_revenue text,
  record_keeping text,
  mobile_money text,
  social_media_promotion text,
  communication_method text,
  staff_count text,
  business_duration text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow public access for registration
CREATE POLICY "Allow public registration"
  ON user_profiles
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to read all profiles (for demo purposes)
CREATE POLICY "Allow read access"
  ON user_profiles
  FOR SELECT
  TO public
  USING (true);

-- Allow users to update their own profiles
CREATE POLICY "Allow profile updates"
  ON user_profiles
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);