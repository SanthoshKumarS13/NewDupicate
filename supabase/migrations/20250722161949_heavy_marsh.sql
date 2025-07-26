/*
  # Create user profiles table and authentication system

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique, optional)
      - `daily_image_count` (int, default 10)
      - `daily_video_count` (int, default 4)
      - `daily_music_count` (int, default 5)
      - `daily_app_count` (int, default 3)
      - `last_reset_date` (date, default current_date)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policies for users to read and update their own profiles
    - Create function to handle new user registration
    - Create trigger to automatically create profiles for new users
    - Create function to securely decrement prompt counts
    - Create function to reset daily counts (for cron job)
*/

-- Create the user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  username TEXT UNIQUE,
  -- Daily prompt limits for each category
  daily_image_count INT DEFAULT 10 NOT NULL,
  daily_video_count INT DEFAULT 4 NOT NULL,
  daily_music_count INT DEFAULT 5 NOT NULL,
  daily_app_count INT DEFAULT 3 NOT NULL,
  -- Timestamp to check when the counts were last reset
  last_reset_date DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Add comments for clarity
COMMENT ON TABLE public.user_profiles IS 'Stores public-facing user data and daily prompt generation limits.';
COMMENT ON COLUMN public.user_profiles.id IS 'Links to the auth.users table.';

-- Create a function to insert a new row into user_profiles upon user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add a comment for the function
COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates a user profile upon new user registration.';

-- Create a trigger that executes the function after each new user is inserted
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable Row Level Security on the table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to view their own profile
CREATE POLICY "Allow individual users to view their own profile."
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Create a policy that allows users to update their own profile
CREATE POLICY "Allow individual users to update their own profile."
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Add a comment explaining RLS
COMMENT ON POLICY "Allow individual users to view their own profile." ON public.user_profiles IS 'Ensures users can only read their own profile information.';

-- Create a function that securely decrements a user's prompt count for a specific category
CREATE OR REPLACE FUNCTION public.decrement_prompt_count(category TEXT)
RETURNS VOID AS $$
BEGIN
  -- Check if the category is valid and decrement the correct column
  IF category = 'image' THEN
    UPDATE public.user_profiles
    SET daily_image_count = daily_image_count - 1
    WHERE id = auth.uid() AND daily_image_count > 0;
  ELSIF category = 'video' THEN
    UPDATE public.user_profiles
    SET daily_video_count = daily_video_count - 1
    WHERE id = auth.uid() AND daily_video_count > 0;
  ELSIF category = 'music' THEN
    UPDATE public.user_profiles
    SET daily_music_count = daily_music_count - 1
    WHERE id = auth.uid() AND daily_music_count > 0;
  ELSIF category = 'app' THEN
    UPDATE public.user_profiles
    SET daily_app_count = daily_app_count - 1
    WHERE id = auth.uid() AND daily_app_count > 0;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Add a comment for the RPC function
COMMENT ON FUNCTION public.decrement_prompt_count(TEXT) IS 'A secure way to decrement user prompt counts. Can be called from the client via RPC.';

-- Create a function that resets all daily counts
CREATE OR REPLACE FUNCTION public.reset_all_daily_counts()
RETURNS VOID AS $$
BEGIN
  UPDATE public.user_profiles
  SET
    daily_image_count = 10,
    daily_video_count = 4,
    daily_music_count = 5,
    daily_app_count = 3,
    last_reset_date = CURRENT_DATE,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;