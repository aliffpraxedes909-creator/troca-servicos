import { createClient } from '@supabase/supabase-js';

// Valores padrão para desenvolvimento (evita erro de URL inválida)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProfile {
  id: string;
  nome_completo: string;
  email: string;
  cpf: string;
  cep: string;
  data_nascimento: string;
  foto_url?: string;
  created_at: string;
}
