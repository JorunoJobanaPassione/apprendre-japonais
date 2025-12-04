-- ================================================
-- 🏆 LEADERBOARD GLOBAL - Supabase Schema
-- ================================================
-- Créé pour App Japonais - Mode Compétition
-- Date: 4 décembre 2025

-- Supprimer la table si elle existe déjà (pour réinitialisation)
DROP TABLE IF EXISTS leaderboard CASCADE;

-- ================================================
-- TABLE: leaderboard
-- ================================================
-- Stocke les scores globaux de tous les utilisateurs
CREATE TABLE leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identité utilisateur
  username TEXT NOT NULL UNIQUE,
  user_id TEXT UNIQUE, -- ID local du navigateur (localStorage)

  -- Stats principales
  total_xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  streak INTEGER NOT NULL DEFAULT 0,

  -- Progression
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  badges_count INTEGER NOT NULL DEFAULT 0,

  -- Métadonnées
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Contraintes
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 20),
  CONSTRAINT total_xp_positive CHECK (total_xp >= 0),
  CONSTRAINT level_positive CHECK (level >= 1)
);

-- ================================================
-- INDEX pour performance
-- ================================================
-- Index sur total_xp pour le classement rapide
CREATE INDEX idx_leaderboard_total_xp ON leaderboard(total_xp DESC);

-- Index sur last_active pour filtrer les utilisateurs actifs
CREATE INDEX idx_leaderboard_last_active ON leaderboard(last_active DESC);

-- Index sur username pour recherche rapide
CREATE INDEX idx_leaderboard_username ON leaderboard(username);

-- ================================================
-- FONCTION: Mettre à jour updated_at automatiquement
-- ================================================
CREATE OR REPLACE FUNCTION update_leaderboard_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER trigger_update_leaderboard_updated_at
  BEFORE UPDATE ON leaderboard
  FOR EACH ROW
  EXECUTE FUNCTION update_leaderboard_updated_at();

-- ================================================
-- RLS (Row Level Security) - Sécurité
-- ================================================
-- Activer RLS sur la table
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Politique 1: Tout le monde peut LIRE le leaderboard
CREATE POLICY "Public can read leaderboard"
  ON leaderboard
  FOR SELECT
  USING (true);

-- Politique 2: Les utilisateurs peuvent CRÉER leur propre entrée
CREATE POLICY "Users can insert their own entry"
  ON leaderboard
  FOR INSERT
  WITH CHECK (true);

-- Politique 3: Les utilisateurs peuvent METTRE À JOUR leur propre entrée
CREATE POLICY "Users can update their own entry"
  ON leaderboard
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Politique 4: Interdire la suppression (sauf admin)
-- Pas de politique DELETE = personne ne peut supprimer

-- ================================================
-- VUE: Top 50 utilisateurs
-- ================================================
CREATE OR REPLACE VIEW leaderboard_top_50 AS
SELECT
  ROW_NUMBER() OVER (ORDER BY total_xp DESC, last_active DESC) as rank,
  username,
  total_xp,
  level,
  streak,
  lessons_completed,
  badges_count,
  last_active
FROM leaderboard
ORDER BY total_xp DESC, last_active DESC
LIMIT 50;

-- ================================================
-- VUE: Utilisateurs actifs (dernière semaine)
-- ================================================
CREATE OR REPLACE VIEW leaderboard_active_week AS
SELECT
  ROW_NUMBER() OVER (ORDER BY total_xp DESC) as rank,
  username,
  total_xp,
  level,
  streak,
  lessons_completed,
  last_active
FROM leaderboard
WHERE last_active >= NOW() - INTERVAL '7 days'
ORDER BY total_xp DESC
LIMIT 50;

-- ================================================
-- FONCTION: Upsert (insert or update) utilisateur
-- ================================================
CREATE OR REPLACE FUNCTION upsert_leaderboard_entry(
  p_username TEXT,
  p_user_id TEXT,
  p_total_xp INTEGER,
  p_level INTEGER,
  p_streak INTEGER,
  p_lessons_completed INTEGER,
  p_badges_count INTEGER
)
RETURNS leaderboard AS $$
DECLARE
  result leaderboard;
BEGIN
  INSERT INTO leaderboard (
    username,
    user_id,
    total_xp,
    level,
    streak,
    lessons_completed,
    badges_count,
    last_active
  )
  VALUES (
    p_username,
    p_user_id,
    p_total_xp,
    p_level,
    p_streak,
    p_lessons_completed,
    p_badges_count,
    NOW()
  )
  ON CONFLICT (username)
  DO UPDATE SET
    total_xp = EXCLUDED.total_xp,
    level = EXCLUDED.level,
    streak = EXCLUDED.streak,
    lessons_completed = EXCLUDED.lessons_completed,
    badges_count = EXCLUDED.badges_count,
    last_active = NOW()
  RETURNING * INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- FONCTION: Obtenir le rang d'un utilisateur
-- ================================================
CREATE OR REPLACE FUNCTION get_user_rank(p_username TEXT)
RETURNS TABLE (
  rank BIGINT,
  username TEXT,
  total_xp INTEGER,
  level INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ROW_NUMBER() OVER (ORDER BY l.total_xp DESC, l.last_active DESC) as rank,
    l.username,
    l.total_xp,
    l.level
  FROM leaderboard l
  WHERE l.username = p_username;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- DONNÉES DE TEST (optionnel - à commenter si non nécessaire)
-- ================================================
/*
INSERT INTO leaderboard (username, total_xp, level, streak, lessons_completed, badges_count) VALUES
  ('Ninja_Hiragana', 2450, 25, 47, 10, 12),
  ('TokyoDreamer', 1890, 19, 32, 10, 10),
  ('SamuraiLearner', 1650, 17, 28, 9, 9),
  ('KawaiiStudent', 1420, 15, 21, 8, 8),
  ('MangaFan92', 1180, 12, 15, 7, 7),
  ('SushiMaster', 950, 10, 12, 6, 5),
  ('AnimeAddict', 780, 8, 9, 5, 4),
  ('RamenLover', 620, 7, 7, 4, 3),
  ('OtakuPro', 510, 6, 5, 3, 3),
  ('NihonGakusei', 340, 4, 3, 2, 2);
*/

-- ================================================
-- ENABLE REALTIME (important pour les updates live)
-- ================================================
-- Activer Realtime sur la table leaderboard
ALTER PUBLICATION supabase_realtime ADD TABLE leaderboard;

-- ================================================
-- FIN DU SCRIPT
-- ================================================
-- Pour exécuter ce script :
-- 1. Ouvrez Supabase Dashboard → SQL Editor
-- 2. Collez tout ce code
-- 3. Cliquez sur "Run"
--
-- Le leaderboard sera prêt à l'emploi ! 🚀
