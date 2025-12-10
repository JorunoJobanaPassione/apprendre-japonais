/**
 * 📈 SRS Charts V1
 * Gestion des graphiques avancés avec Chart.js
 * Version: 1.0.0
 */

const SRSCharts = {
  // ===== INSTANCES DES CHARTS =====
  retentionChart: null,
  forecastChart: null,
  typeDistributionChart: null,
  timeDistributionChart: null,

  /**
   * Initialiser tous les graphiques
   */
  initAll: function() {
    console.log('📈 Initialisation des graphiques SRS...');

    // Vérifier que Chart.js est chargé
    if (typeof Chart === 'undefined') {
      console.error('❌ Chart.js non chargé !');
      return false;
    }

    // Initialiser chaque graphique
    this.initRetentionChart();
    this.initForecastChart();
    this.initTypeDistributionChart();
    this.initTimeDistributionChart();

    console.log('✅ Graphiques initialisés');
    return true;
  },

  /**
   * Graphique : Taux de rétention au fil du temps
   */
  initRetentionChart: function() {
    const canvas = document.getElementById('retention-chart');
    if (!canvas) return;

    // Détruire l'ancien chart si existe
    if (this.retentionChart) {
      this.retentionChart.destroy();
    }

    const data = SRSStatsAdvanced.prepareRetentionChartData();

    this.retentionChart = new Chart(canvas, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '📊 Taux de rétention au fil du temps',
            font: { size: 16, weight: 'bold' },
            color: '#1f2937'
          },
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            },
            title: {
              display: true,
              text: 'Taux de rétention (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Semaine'
            }
          }
        }
      }
    });
  },

  /**
   * Graphique : Forecast (prédiction des reviews)
   */
  initForecastChart: function() {
    const canvas = document.getElementById('forecast-chart');
    if (!canvas) return;

    if (this.forecastChart) {
      this.forecastChart.destroy();
    }

    const data = SRSStatsAdvanced.prepareForecastChartData(7);

    this.forecastChart = new Chart(canvas, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '🔮 Prédiction des révisions (7 prochains jours)',
            font: { size: 16, weight: 'bold' },
            color: '#1f2937'
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            stacked: false,
            title: {
              display: true,
              text: 'Nombre de cartes'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    });
  },

  /**
   * Graphique : Distribution par type (pie chart)
   */
  initTypeDistributionChart: function() {
    const canvas = document.getElementById('type-distribution-chart');
    if (!canvas) return;

    if (this.typeDistributionChart) {
      this.typeDistributionChart.destroy();
    }

    const data = SRSStatsAdvanced.prepareTypeDistributionData();

    this.typeDistributionChart = new Chart(canvas, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '📚 Distribution par type de carte',
            font: { size: 16, weight: 'bold' },
            color: '#1f2937'
          },
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  },

  /**
   * Graphique : Distribution temporelle (heures de révision)
   */
  initTimeDistributionChart: function() {
    const canvas = document.getElementById('time-distribution-chart');
    if (!canvas) return;

    if (this.timeDistributionChart) {
      this.timeDistributionChart.destroy();
    }

    const timeData = SRSStatsAdvanced.getTimeDistribution();

    const data = {
      labels: timeData.distribution.map(d => `${d.hour}h`),
      datasets: [{
        label: 'Reviews par heure',
        data: timeData.distribution.map(d => d.count),
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1
      }]
    };

    this.timeDistributionChart = new Chart(canvas, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '⏰ Activité par heure de la journée',
            font: { size: 16, weight: 'bold' },
            color: '#1f2937'
          },
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = timeData.totalReviews;
                const percentage = total > 0 ? ((context.parsed.y / total) * 100).toFixed(1) : 0;
                return `${context.parsed.y} reviews (${percentage}%)`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre de reviews'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Heure'
            }
          }
        }
      }
    });
  },

  /**
   * Rafraîchir tous les graphiques
   */
  refreshAll: function() {
    console.log('🔄 Rafraîchissement des graphiques...');

    this.initRetentionChart();
    this.initForecastChart();
    this.initTypeDistributionChart();
    this.initTimeDistributionChart();
  },

  /**
   * Détruire tous les graphiques
   */
  destroyAll: function() {
    if (this.retentionChart) this.retentionChart.destroy();
    if (this.forecastChart) this.forecastChart.destroy();
    if (this.typeDistributionChart) this.typeDistributionChart.destroy();
    if (this.timeDistributionChart) this.timeDistributionChart.destroy();
  },

  /**
   * Rendre les conteneurs pour les graphiques
   */
  renderChartContainers: function() {
    return `
      <!-- Stats Avancées Section -->
      <div class="srs-advanced-stats">
        <h3>📊 Statistiques avancées</h3>

        <!-- Métriques clés -->
        ${this.renderKeyMetrics()}

        <!-- Graphiques -->
        <div class="charts-grid">
          <!-- Rétention -->
          <div class="chart-container">
            <canvas id="retention-chart"></canvas>
          </div>

          <!-- Forecast -->
          <div class="chart-container">
            <canvas id="forecast-chart"></canvas>
          </div>

          <!-- Distribution par type -->
          <div class="chart-container small">
            <canvas id="type-distribution-chart"></canvas>
          </div>

          <!-- Distribution temporelle -->
          <div class="chart-container small">
            <canvas id="time-distribution-chart"></canvas>
          </div>
        </div>

        <!-- Analyse par type -->
        ${this.renderTypeAnalysis()}

        <!-- Cartes problématiques -->
        ${this.renderProblematicCards()}

        <!-- Jalons -->
        ${this.renderMilestones()}
      </div>
    `;
  },

  /**
   * Rendre les métriques clés
   */
  renderKeyMetrics: function() {
    const retention = SRSStatsAdvanced.calculateRetentionRate();
    const velocity = SRSStatsAdvanced.calculateLearningVelocity();
    const streak = SRSStatsAdvanced.calculateStreakStats();

    return `
      <div class="key-metrics-grid">
        <div class="metric-card ${retention.overall >= 75 ? 'success' : 'warning'}">
          <div class="metric-icon">🎯</div>
          <div class="metric-content">
            <div class="metric-value">${retention.overall}%</div>
            <div class="metric-label">Taux de rétention global</div>
            <div class="metric-detail">
              Semaine: ${retention.lastWeek}% | Mois: ${retention.lastMonth}%
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">⚡</div>
          <div class="metric-content">
            <div class="metric-value">${velocity.perWeek}</div>
            <div class="metric-label">Cartes maîtrisées / semaine</div>
            <div class="metric-detail">
              ${velocity.totalMastered} total | Tendance: ${this.getTrendEmoji(velocity.trend)}
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">🔥</div>
          <div class="metric-content">
            <div class="metric-value">${streak.currentStreak}</div>
            <div class="metric-label">Jours consécutifs</div>
            <div class="metric-detail">
              Record: ${streak.longestStreak} jours | Régularité: ${streak.consistencyRate}%
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">📈</div>
          <div class="metric-content">
            <div class="metric-value">${velocity.projection30Days}</div>
            <div class="metric-label">Projection 30 jours</div>
            <div class="metric-detail">
              ${Math.round(velocity.projection30Days / 30)} cartes/jour en moyenne
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Rendre l'analyse par type
   */
  renderTypeAnalysis: function() {
    const analysis = SRSStatsAdvanced.analyzeDifficultyByType();

    return `
      <div class="type-analysis-section">
        <h4>🔍 Analyse par type de carte</h4>
        <div class="type-analysis-grid">
          ${Object.entries(analysis).map(([type, data]) => `
            <div class="type-analysis-card">
              <div class="type-header">
                <span class="type-icon">${this.getTypeIcon(type)}</span>
                <span class="type-name">${this.capitalize(type)}</span>
              </div>
              <div class="type-stats">
                <div class="type-stat">
                  <span class="stat-label">Total:</span>
                  <span class="stat-value">${data.total}</span>
                </div>
                <div class="type-stat">
                  <span class="stat-label">Précision:</span>
                  <span class="stat-value ${data.averageAccuracy >= 75 ? 'success' : 'warning'}">
                    ${data.averageAccuracy}%
                  </span>
                </div>
                <div class="type-stat">
                  <span class="stat-label">Matures:</span>
                  <span class="stat-value">${data.mature}</span>
                </div>
                <div class="type-stat">
                  <span class="stat-label">Difficultés:</span>
                  <span class="stat-value ${data.leeches > 0 ? 'warning' : ''}">${data.leeches}</span>
                </div>
              </div>
              <div class="type-difficulty ${data.difficulty}">
                Difficulté: ${this.capitalize(data.difficulty)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  /**
   * Rendre les cartes problématiques
   */
  renderProblematicCards: function() {
    const problematic = SRSStatsAdvanced.getProblematicCards();

    if (problematic.length === 0) {
      return `
        <div class="problematic-section success">
          <h4>✅ Aucune carte problématique</h4>
          <p>Excellent travail ! Toutes vos cartes progressent bien.</p>
        </div>
      `;
    }

    return `
      <div class="problematic-section">
        <h4>⚠️ Cartes nécessitant plus d'attention (${problematic.length})</h4>
        <div class="problematic-list">
          ${problematic.map(card => `
            <div class="problematic-card">
              <div class="card-char">${card.character}</div>
              <div class="card-info">
                <span class="card-type">${card.type}</span>
                <span class="card-error-rate ${card.errorRate > 50 ? 'danger' : 'warning'}">
                  ${card.errorRate}% erreurs
                </span>
                <span class="card-reviews">${card.totalReviews} reviews</span>
              </div>
              <button class="review-btn" onclick="SRSCharts.reviewCard('${card.character}', '${card.type}')">
                Réviser
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  /**
   * Rendre les jalons (milestones)
   */
  renderMilestones: function() {
    const milestones = SRSStatsAdvanced.calculateMilestones();

    return `
      <div class="milestones-section">
        <h4>🏆 Jalons d'apprentissage</h4>
        <div class="milestones-list">
          ${milestones.map(m => `
            <div class="milestone-item ${m.completed ? 'completed' : ''}">
              <div class="milestone-icon">${m.icon}</div>
              <div class="milestone-content">
                <div class="milestone-name">${m.name}</div>
                <div class="milestone-progress-bar">
                  <div class="milestone-progress-fill" style="width: ${m.progress}%;"></div>
                </div>
                <div class="milestone-text">
                  ${m.completed
                    ? `<span class="completed-text">✅ Complété !</span>`
                    : `<span class="remaining-text">${m.remaining} cartes restantes</span>`
                  }
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // ===== HELPERS =====

  getTrendEmoji: function(trend) {
    const emojis = {
      'increasing': '📈',
      'stable': '➡️',
      'decreasing': '📉'
    };
    return emojis[trend] || '➡️';
  },

  getTypeIcon: function(type) {
    const icons = {
      'hiragana': '🔤',
      'katakana': '🔡',
      'kanji': '㊗️'
    };
    return icons[type] || '📝';
  },

  capitalize: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Réviser une carte spécifique
   */
  reviewCard: function(character, type) {
    const card = SRSStorage.getCard(character, type);
    if (card) {
      SRSUI_V2.startReviewSession([card]);
    }
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.SRSCharts = SRSCharts;
}
