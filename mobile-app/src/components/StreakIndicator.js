/**
 * Streak Indicator Component - Affichage discret de la constance
 * Feature Anti-Duolingo : Jours de grâce GRATUITS
 * Design : Sobre et encourageant (pas de pression)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import streakSystem from '../services/streakSystem';

export default function StreakIndicator({ onPress, showDetailed = false }) {
  const [stats, setStats] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const streakStats = await streakSystem.getStreakStats();
    setStats(streakStats);
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setModalVisible(true);
    }
  };

  if (!stats) {
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>🔥</Text>
        <Text style={styles.streakText}>0</Text>
      </View>
    );
  }

  const { currentStreak, graceDays, vacation, milestones } = stats;
  const hasGraceProtection = graceDays.remaining > 0;
  const isVacation = vacation.isActive;
  const emoji = streakSystem.getStreakTierEmoji(currentStreak);

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        {/* Main Streak Display - Compact & Discret */}
        <View style={styles.mainContent}>
          <Text style={styles.emoji}>{emoji}</Text>
          <View style={styles.streakInfo}>
            <Text style={styles.streakText}>{`${currentStreak}`}</Text>
            <Text style={styles.streakLabel}>
              {currentStreak === 0 ? 'jours' : currentStreak === 1 ? 'jour' : 'jours'}
            </Text>
          </View>

          {/* Protection discrète - petit indicateur */}
          {(hasGraceProtection || isVacation) && (
            <View style={styles.protectionIndicator}>
              <Text style={styles.protectionEmoji}>
                {isVacation ? '🏖️' : '🛡️'}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Detailed Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>🔥 Votre Flamme</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Current Streak */}
              <View style={styles.statCard}>
                <Text style={styles.statEmoji}>{emoji}</Text>
                <Text style={styles.statValue}>{`${currentStreak}`}</Text>
                <Text style={styles.statLabel}>
                  {currentStreak === 0 ? 'Allumez votre flamme !' : `jour${currentStreak > 1 ? 's' : ''} de Volonté du Feu`}
                </Text>
                {stats.highestStreak > currentStreak && (
                  <Text style={styles.statSubtext}>
                    {`Record personnel : ${stats.highestStreak} jours`}
                  </Text>
                )}
              </View>

              {/* Grace Days Protection */}
              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Text style={styles.statEmoji}>🛡️</Text>
                  <Text style={styles.statTitle}>Bouclier Ninja</Text>
                  <View style={styles.freeBadge}>
                    <Text style={styles.freeBadgeText}>GRATUIT</Text>
                  </View>
                </View>

                <Text style={styles.statDescription}>
                  Si vous manquez un jour, votre flamme est protégée !
                </Text>

                <View style={styles.graceDaysBar}>
                  <View style={styles.graceDaysProgress}>
                    <View
                      style={[
                        styles.graceDaysFill,
                        {
                          width: `${(graceDays.remaining / graceDays.available) * 100}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.graceDaysText}>
                    {`${graceDays.remaining}/${graceDays.available} jours`}
                  </Text>
                </View>

                <Text style={styles.statHelp}>
                  💡 Plus votre streak est long, plus vous avez de protection !
                </Text>
              </View>

              {/* Vacation Mode */}
              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Text style={styles.statEmoji}>🏖️</Text>
                  <Text style={styles.statTitle}>Mode Vacances</Text>
                  <View style={styles.freeBadge}>
                    <Text style={styles.freeBadgeText}>GRATUIT</Text>
                  </View>
                </View>

                <Text style={styles.statDescription}>
                  Pausez votre streak sans le perdre (14 jours/an)
                </Text>

                <View style={styles.vacationBar}>
                  <View style={styles.vacationProgress}>
                    <View
                      style={[
                        styles.vacationFill,
                        {
                          width: `${((vacation.maxDaysPerYear - vacation.daysUsedThisYear) / vacation.maxDaysPerYear) * 100}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.vacationText}>
                    {`${vacation.remainingDays}/${vacation.maxDaysPerYear} jours restants`}
                  </Text>
                </View>

                {vacation.isActive && (
                  <View style={styles.vacationActive}>
                    <Text style={styles.vacationActiveText}>
                      🏖️ Mode actif jusqu'au {new Date(vacation.vacationInfo.endDate).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                )}
              </View>

              {/* Milestones */}
              <View style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Text style={styles.statEmoji}>⚡</Text>
                  <Text style={styles.statTitle}>Niveaux de Puissance</Text>
                </View>

                <View style={styles.milestonesList}>
                  {streakSystem.CONFIG.MILESTONES.map((milestone) => {
                    const unlocked = milestones.unlocked.includes(milestone.days);
                    const isCurrent = milestone.days === currentStreak;
                    const isNext = milestones.next && milestones.next.days === milestone.days;

                    return (
                      <View
                        key={milestone.days}
                        style={[
                          styles.milestoneItem,
                          unlocked && styles.milestoneUnlocked,
                          isCurrent && styles.milestoneCurrent,
                          isNext && styles.milestoneNext,
                        ]}
                      >
                        <Text style={styles.milestoneEmoji}>
                          {unlocked ? milestone.emoji : '🔒'}
                        </Text>
                        <View style={styles.milestoneInfo}>
                          <Text style={styles.milestoneDays}>{`${milestone.days} jours`}</Text>
                          <Text style={styles.milestoneName}>{milestone.name}</Text>
                        </View>
                        {unlocked && (
                          <Text style={styles.milestoneCheck}>✓</Text>
                        )}
                        {isNext && (
                          <Text style={styles.milestoneNext}>
                            {`${milestone.days - currentStreak}j`}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Notre Philosophie */}
              <View style={styles.antiDuolingoCard}>
                <Text style={styles.antiDuolingoTitle}>
                  🥷 La Voie du Ninja
                </Text>
                <Text style={styles.antiDuolingoText}>
                  ✅ Bouclier Ninja GRATUIT{'\n'}
                  ✅ Mode Vacances GRATUIT (14j/an){'\n'}
                  ✅ Pas de pression, apprends à ton rythme{'\n'}
                  ✅ La vraie force vient de la persévérance !
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // Compact View - Design discret
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SIZES.padding * 0.8,
    marginBottom: SIZES.marginSmall,
  },

  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  emoji: {
    fontSize: 20,
    marginRight: 8,
  },

  streakInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },

  streakText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },

  streakLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },

  protectionIndicator: {
    marginLeft: 8,
  },

  protectionEmoji: {
    fontSize: 14,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingBottom: 40,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  modalTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  modalClose: {
    fontSize: 24,
    color: COLORS.textSecondary,
    padding: 8,
  },

  statCard: {
    backgroundColor: COLORS.surface,
    margin: SIZES.padding,
    marginTop: SIZES.marginSmall,
    padding: SIZES.padding,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  statEmoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: SIZES.marginSmall,
  },

  statValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },

  statLabel: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },

  statSubtext: {
    fontSize: FONTS.small,
    color: COLORS.accent,
    textAlign: 'center',
    marginTop: 8,
  },

  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },

  statTitle: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    marginLeft: SIZES.marginSmall,
  },

  statDescription: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginBottom: SIZES.marginSmall,
  },

  statHelp: {
    fontSize: FONTS.tiny,
    color: COLORS.accent,
    marginTop: SIZES.marginSmall,
    fontStyle: 'italic',
  },

  freeBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  freeBadgeText: {
    fontSize: FONTS.tiny,
    color: '#fff',
    fontWeight: 'bold',
  },

  // Grace Days
  graceDaysBar: {
    marginTop: SIZES.marginSmall,
  },

  graceDaysProgress: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },

  graceDaysFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },

  graceDaysText: {
    fontSize: FONTS.small,
    color: COLORS.text,
    marginTop: 4,
    textAlign: 'right',
  },

  // Vacation
  vacationBar: {
    marginTop: SIZES.marginSmall,
  },

  vacationProgress: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },

  vacationFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },

  vacationText: {
    fontSize: FONTS.small,
    color: COLORS.text,
    marginTop: 4,
    textAlign: 'right',
  },

  vacationActive: {
    backgroundColor: COLORS.accent + '20',
    padding: SIZES.marginSmall,
    borderRadius: 8,
    marginTop: SIZES.marginSmall,
  },

  vacationActiveText: {
    fontSize: FONTS.small,
    color: COLORS.accent,
    textAlign: 'center',
  },

  // Milestones
  milestonesList: {
    marginTop: SIZES.marginSmall,
  },

  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.marginSmall,
    borderRadius: 12,
    marginBottom: SIZES.marginSmall,
    backgroundColor: COLORS.background,
    opacity: 0.5,
  },

  milestoneUnlocked: {
    opacity: 1,
    backgroundColor: COLORS.success + '20',
  },

  milestoneCurrent: {
    opacity: 1,
    backgroundColor: COLORS.primary + '20',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  milestoneNext: {
    opacity: 1,
    backgroundColor: COLORS.background,
  },

  milestoneEmoji: {
    fontSize: 24,
    marginRight: SIZES.marginSmall,
  },

  milestoneInfo: {
    flex: 1,
  },

  milestoneDays: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  milestoneName: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },

  milestoneCheck: {
    fontSize: 20,
    color: COLORS.success,
  },

  milestoneNextText: {
    fontSize: FONTS.small,
    color: COLORS.accent,
  },

  // Anti-Duolingo Message
  antiDuolingoCard: {
    backgroundColor: COLORS.primary + '10',
    margin: SIZES.padding,
    marginTop: SIZES.marginSmall,
    padding: SIZES.padding,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  antiDuolingoTitle: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.marginSmall,
    textAlign: 'center',
  },

  antiDuolingoText: {
    fontSize: FONTS.small,
    color: COLORS.text,
    lineHeight: 20,
  },
});
