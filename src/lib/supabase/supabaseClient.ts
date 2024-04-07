import { createClient } from '@supabase/supabase-js'
import {
	SUPABSE_PROJECT_URL,
	SUPABSE_KEY
} from '$env/static/private';

export const supabase = createClient(SUPABSE_PROJECT_URL, SUPABSE_KEY)