/**
 * 🏆 Système de Leaderboard Global
 * Gère la synchronisation avec Supabase et l'affichage du classement
 */

const LeaderboardSystem = {
  // État local
  currentUsername: null,
  isInitialized: false,
  realtimeChannel: null,

  /**
   * Initialiser le système de leaderboard
   */
  async init() {
    if (this.isInitialized) return;

    // Récupérer ou demander le username
    this.currentUsername = this.getOrCreateUsername();
    this.isInitialized = true;

    console.log('🏆 Leaderboard initialisé pour:', this.currentUsername);

    // Sync initial
    await this.syncToLeaderboard();

    // Setup Realtime subscriptions
    this.setupRealtime();
  },

  /**
   * Récupérer ou créer un username
   */
  getOrCreateUsername() {
    let username = localStorage.getItem('japonais_username');

    if (!username) {
      // Générer un username par défaut
      const adjectives = ['Ninja', 'Samurai', 'Kawaii', 'Tokyo', 'Otaku', 'Manga', 'Anime', 'Sushi', 'Ramen', 'Sakura'];
      const nouns = ['Learner', 'Student', 'Master', 'Dreamer', 'Fan', 'Hero', 'Warrior', 'Sensei', 'Champion', 'Pro'];
      const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
      const randomNum = Math.floor(Math.random() * 999);

      username = `${randomAdj}${randomNoun}${randomNum}`;
      localStorage.setItem('japonais_username', username);
    }

    return username;
  },

  /**
   * Changer le username
   */
  async changeUsername(newUsername) {
    // Validation
    if (newUsername.length < 3 || newUsername.length > 20) {
      throw new Error('Le pseudo doit contenir entre 3 et 20 caractères');
    }

    // Vérifier si le username est déjà pris
    const { data: existing } = await supabase
      .from('leaderboard')
      .select('username')
      .eq('username', newUsername)
      .single();

    if (existing && existing.username !== this.currentUsername) {
      throw new Error('Ce pseudo est déjà pris');
    }

    // Mettre à jour dans Supabase
    const progress = Storage.getProgress();
    const userId = this.getUserId();

    const { error } = await supabase
      .rpc('upsert_leaderboard_entry', {
        p_username: newUsername,
        p_user_id: userId,
        p_total_xp: progress.totalPoints,
        p_level: progress.level,
        p_streak: progress.streak,
        p_lessons_completed: progress.stats.lessonsCompleted,
        p_badges_count: progress.badges.length
      });

    if (error) throw error;

    // Supprimer l'ancienne entrée si le username a changé
    if (this.currentUsername !== newUsername) {
      await supabase
        .from('leaderboard')
        .delete()
        .eq('username', this.currentUsername);
    }

    // Mettre à jour localement
    this.currentUsername = newUsername;
    localStorage.setItem('japonais_username', newUsername);

    console.log('✅ Username changé:', newUsername);
  },

  /**
   * Obtenir un ID utilisateur unique (basé sur le navigateur)
   */
  getUserId() {
    let userId = localStorage.getItem('japonais_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('japonais_user_id', userId);
    }
    return userId;
  },

  /**
   * Synchroniser les stats locales vers le leaderboard Supabase
   */
  async syncToLeaderboard() {
    if (!this.isInitialized) await this.init();

    try {
      const progress = Storage.getProgress();
      const userId = this.getUserId();

      // Upsert dans Supabase (insert or update)
      const { data, error } = await supabase
        .rpc('upsert_leaderboard_entry', {
          p_username: this.currentUsername,
          p_user_id: userId,
          p_total_xp: progress.totalPoints,
          p_level: progress.level,
          p_streak: progress.streak,
          p_lessons_completed: progress.stats.lessonsCompleted,
          p_badges_count: progress.badges.length
        });

      if (error) {
        console.error('❌ Erreur sync leaderboard:', error);
        return false;
      }

      console.log('✅ Sync leaderboard réussi');
      return true;
    } catch (error) {
      console.error('❌ Erreur sync leaderboard:', error);
      return false;
    }
  },

  /**
   * Récupérer le Top 50 mondial
   */
  async getTop50() {
    try {
      const { data, error } = await supabase
        .from('leaderboard_top_50')
        .select('*');

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('❌ Erreur récupération Top 50:', error);
      return [];
    }
  },

  /**
   * Récupérer le rang d'un utilisateur
   */
  async getUserRank(username = null) {
    try {
      const targetUsername = username || this.currentUsername;

      const { data, error } = await supabase
        .rpc('get_user_rank', { p_username: targetUsername });

      if (error) throw error;

      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error('❌ Erreur récupération rang:', error);
      return null;
    }
  },

  /**
   * Setup Realtime subscriptions pour updates live
   */
  setupRealtime() {
    // S'abonner aux changements de la table leaderboard
    this.realtimeChannel = supabase
      .channel('leaderboard_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'leaderboard'
        },
        (payload) => {
          console.log('🔄 Leaderboard mis à jour:', payload);

          // Rafraîchir l'affichage si l'écran leaderboard est visible
          if (appState.currentScreen === 'leaderboard-screen') {
            Navigation.renderLeaderboard();
          }
        }
      )
      .subscribe();

    console.log('🔴 Realtime activé pour le leaderboard');
  },

  /**
   * Nettoyer les subscriptions Realtime
   */
  cleanup() {
    if (this.realtimeChannel) {
      supabase.removeChannel(this.realtimeChannel);
      this.realtimeChannel = null;
    }
  }
};

// Auto-initialiser au chargement
document.addEventListener('DOMContentLoaded', async () => {
  // Attendre un peu que Storage soit initialisé
  setTimeout(async () => {
    await LeaderboardSystem.init();
  }, 1000);
});

// Sync automatique après chaque leçon
// (sera appelé depuis Storage.updateLessonProgress)
