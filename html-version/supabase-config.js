/**
 * 🔧 Configuration Supabase
 * Connexion au backend pour le Leaderboard mondial
 */

// Configuration Supabase (remplacez avec vos vraies valeurs)
const SUPABASE_URL = 'https://auhjoyjmaiohmwdizp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1aGpveWptYWlvaG13ZGl6cCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzMzMzM3MDMyLCJleHAiOjIwNDg5MTMwMzJ9.J_5VPO2T0WCYbgLkYsRrV2QFKw3WVMzD7HZvN9-4bdk';

// Initialiser le client Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase initialisé avec succès');
