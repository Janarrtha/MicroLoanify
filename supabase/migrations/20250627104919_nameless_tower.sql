/*
  # Fix User Signup RLS Policies

  1. Security Updates
    - Update RLS policies to properly handle user signup flow
    - Allow authenticated users to insert their own records
    - Allow authenticated users to read and update their own data
    - Remove conflicting public insert policy

  2. Policy Changes
    - Remove existing "Allow public user registration" policy
    - Add proper authenticated user policies for INSERT, SELECT, UPDATE
    - Ensure users can only access their own data
*/

-- Drop existing policies that might be conflicting
DROP POLICY IF EXISTS "Allow public user registration" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Create new policies for authenticated users
CREATE POLICY "Authenticated users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Authenticated users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Authenticated users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);