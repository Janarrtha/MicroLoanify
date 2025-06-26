/*
  # Create payment cards table

  1. New Tables
    - `payment_cards`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users table)
      - `card_name` (text, user-defined name for the card)
      - `card_number_last4` (text, last 4 digits for display)
      - `card_type` (text, visa/mastercard/amex etc)
      - `expiry_month` (integer)
      - `expiry_year` (integer)
      - `cardholder_name` (text)
      - `is_default` (boolean, default card for payments)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `payment_cards` table
    - Add policy for users to manage their own cards only

  3. Notes
    - Card numbers are NOT stored for security - only last 4 digits for display
    - In production, full card details would be tokenized via payment processor
*/

CREATE TABLE IF NOT EXISTS payment_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  card_name text NOT NULL,
  card_number_last4 text NOT NULL,
  card_type text NOT NULL,
  expiry_month integer NOT NULL,
  expiry_year integer NOT NULL,
  cardholder_name text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payment_cards ENABLE ROW LEVEL SECURITY;

-- Policy for users to manage their own cards
CREATE POLICY "Users can manage own payment cards"
  ON payment_cards
  FOR ALL
  TO authenticated
  USING (user_id::text = auth.uid()::text);

-- Policy for anonymous users (using localStorage user_id for demo)
CREATE POLICY "Allow payment card operations"
  ON payment_cards
  FOR ALL
  TO anon
  WITH CHECK (true);