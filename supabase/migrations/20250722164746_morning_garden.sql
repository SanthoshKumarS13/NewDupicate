/*
  # Complete User Authentication and Profiles Setup

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique, optional)
      - `daily_image_count` (integer, default 10)
      - `daily_video_count` (integer, default 4)
      - `daily_music_count` (integer, default 5)
      - `daily_app_count` (integer, default 3)
      - `last_reset_date` (date, default current_date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policies for users to read and update their own profiles

  3. Functions
    - `handle_new_user()` - Automatically creates profile on user registration
    - `decrement_prompt_count()` - Securely decrements user prompt counts
    - `reset_all_daily_counts()` - Resets all user counts daily (for cron)

  4. Triggers
    - Auto-create user profile on auth.users insert
*/

-- Create the user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  daily_image_count integer DEFAULT 10 NOT NULL,
  daily_video_count integer DEFAULT 4 NOT NULL,
  daily_music_count integer DEFAULT 5 NOT NULL,
  daily_app_count integer DEFAULT 3 NOT NULL,
  last_reset_date date DEFAULT CURRENT_DATE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Add comments for clarity
COMMENT ON TABLE public.user_profiles IS 'Stores public-facing user data and daily prompt generation limits.';
COMMENT ON COLUMN public.user_profiles.id IS 'Links to the auth.users table.';

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Allow individual users to view their own profile."
  ON public.user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Allow individual users to update their own profile."
  ON public.user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, username)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'username', null)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates a user profile upon new user registration.';

-- Create trigger for new user creation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END $$;

-- Function to securely decrement prompt counts
CREATE OR REPLACE FUNCTION public.decrement_prompt_count(category text)
RETURNS void AS $$
BEGIN
  -- Check if the category is valid and decrement the correct column
  IF category = 'image' THEN
    UPDATE public.user_profiles
    SET 
      daily_image_count = GREATEST(daily_image_count - 1, 0),
      updated_at = now()
    WHERE id = auth.uid() AND daily_image_count > 0;
  ELSIF category = 'video' THEN
    UPDATE public.user_profiles
    SET 
      daily_video_count = GREATEST(daily_video_count - 1, 0),
      updated_at = now()
    WHERE id = auth.uid() AND daily_video_count > 0;
  ELSIF category = 'music' THEN
    UPDATE public.user_profiles
    SET 
      daily_music_count = GREATEST(daily_music_count - 1, 0),
      updated_at = now()
    WHERE id = auth.uid() AND daily_music_count > 0;
  ELSIF category = 'app' THEN
    UPDATE public.user_profiles
    SET 
      daily_app_count = GREATEST(daily_app_count - 1, 0),
      updated_at = now()
    WHERE id = auth.uid() AND daily_app_count > 0;
  ELSE
    RAISE EXCEPTION 'Invalid category: %', category;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.decrement_prompt_count(text) IS 'A secure way to decrement user prompt counts. Can be called from the client via RPC.';

-- Function to reset all daily counts (for cron job)
CREATE OR REPLACE FUNCTION public.reset_all_daily_counts()
RETURNS void AS $$
BEGIN
  UPDATE public.user_profiles
  SET
    daily_image_count = 10,
    daily_video_count = 4,
    daily_music_count = 5,
    daily_app_count = 3,
    last_reset_date = CURRENT_DATE,
    updated_at = now()
  WHERE last_reset_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.reset_all_daily_counts() IS 'Resets daily prompt counts for all users. Should be run via cron job daily.';