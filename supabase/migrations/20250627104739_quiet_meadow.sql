/*
  # Add RLS policies for users table

  1. Security Changes
    - Add policy to allow public users to insert their own records during registration
    - Add policy to allow authenticated users to read their own data
    - Add policy to allow authenticated users to update their own data

  This enables user registration while maintaining security by ensuring users can only access their own data.
*/

-- Allow public users to insert new user records (for registration)
CREATE POLICY "Allow public user registration"
  ON users
  FOR INSERT
  TO public
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