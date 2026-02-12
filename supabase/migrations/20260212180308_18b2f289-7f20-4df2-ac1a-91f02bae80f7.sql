-- Allow multiple profiles (sub-profiles) per user
ALTER TABLE public.profiles DROP CONSTRAINT profiles_user_id_key;

-- Update the existing Alex profile with proper data
UPDATE public.profiles 
SET goal = 'lose', weight = '196.2', account_type = 'user', age = 43, gender = 'Male', activity_level = 'moderate'
WHERE user_id = '2c551290-e3aa-44ce-9c50-f18b2db60c17';

-- Add Penelope and Sophie sub-profiles
INSERT INTO profiles (user_id, name, initials, email, goal, weight, account_type, age, gender, activity_level)
VALUES 
  ('2c551290-e3aa-44ce-9c50-f18b2db60c17', 'Penelope', 'PS', 'alexishernandeznyc@gmail.com', 'lose', '212.5', 'client', 38, 'Male', 'active'),
  ('2c551290-e3aa-44ce-9c50-f18b2db60c17', 'Sophie', 'SS', 'alexishernandeznyc@gmail.com', 'maintain', '138.0', 'family', 34, 'Female', 'light');