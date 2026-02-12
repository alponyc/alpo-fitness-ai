
-- Add CHECK constraints to profiles table for server-side validation
ALTER TABLE public.profiles
  ADD CONSTRAINT chk_name_length CHECK (LENGTH(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT chk_initials_length CHECK (LENGTH(initials) BETWEEN 1 AND 5),
  ADD CONSTRAINT chk_email_length CHECK (email IS NULL OR LENGTH(email) <= 255),
  ADD CONSTRAINT chk_phone_length CHECK (phone IS NULL OR LENGTH(phone) <= 30),
  ADD CONSTRAINT chk_weight_length CHECK (weight IS NULL OR LENGTH(weight) <= 10),
  ADD CONSTRAINT chk_age_range CHECK (age IS NULL OR (age >= 0 AND age <= 150)),
  ADD CONSTRAINT chk_goal_values CHECK (goal IS NULL OR goal IN ('lose', 'gain', 'maintain')),
  ADD CONSTRAINT chk_account_type_values CHECK (account_type IS NULL OR account_type IN ('user', 'client', 'family', 'trainer')),
  ADD CONSTRAINT chk_activity_level_values CHECK (activity_level IS NULL OR activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very_active')),
  ADD CONSTRAINT chk_gender_values CHECK (gender IS NULL OR gender IN ('Male', 'Female', 'Other'));
