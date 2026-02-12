ALTER TABLE public.profiles
  ADD CONSTRAINT chk_weight_numeric
  CHECK (weight IS NULL OR weight ~ '^[0-9]+(\.[0-9]+)?$');