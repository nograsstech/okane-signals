import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

export const supabase = createClient(env.SUPABSE_PROJECT_URL, env.SUPABSE_KEY);
