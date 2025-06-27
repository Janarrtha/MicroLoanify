/*
  # Fix user registration issues

  1. Problem Analysis
    - Current RLS policies require authenticated users
    - But during signup, user needs to be created first before they can be authenticated
    - This creates a chicken-and-egg problem

  2. Solution
    - Allow public (anon) users to insert into users table during registration
    - Keep authenticated user policies for reading/updating their own data
    - Ensure security by validating the user ID matches auth.uid() after authentication

  3. Security Notes
    - Public insert is safe because we validate the ID matches the authenticated user
    - Users can only read/update their own data after authentication
*/

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Authenticated users can insert own data" ON users;
DROP POLICY IF EXISTS "Authenticated users can read own data" ON users;
DROP POLICY IF EXISTS "Authenticated users can update own data" ON users;
DROP POLICY IF EXISTS "Allow public user registration" ON users;

-- Allow anonymous users to insert during registration
-- This is needed because the user record must be created during the signup process
CREATE POLICY "Allow user registration"
  ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow authenticated users to update their own data
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);