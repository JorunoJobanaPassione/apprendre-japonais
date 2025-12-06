/**
 * Service Worker - App Japonais
 * Permet le fonctionnement hors ligne
 */

const CACHE_NAME = 'japonais-app-v4.9.2';

// Liste des fichiers MP3 audio hiragana
const audioFiles = [
  'a', 'i', 'u', 'e', 'o',
  'ka', 'ki', 'ku', 'ke', 'ko',
  'sa', 'shi', 'su', 'se', 'so',
  'ta', 'chi', 'tsu', 'te', 'to',
  'na', 'ni', 'nu', 'ne', 'no',
  'ha', 'hi', 'fu', 'he', 'ho',
  'ma', 'mi', 'mu', 'me', 'mo',
  'ya', 'yu', 'yo',
  'ra', 'ri', 'ru', 're', 'ro',
  'wa', 'wo', 'n',
  'ga', 'gi', 'gu', 'ge', 'go',
  'za', 'ji', 'zu', 'ze', 'zo',
  'da', 'ji2', 'zu2', 'de', 'do',
  'ba', 'bi', 'bu', 'be', 'bo',
  'pa', 'pi', 'pu', 'pe', 'po',
  'kya', 'kyu', 'kyo',
  'sha', 'shu', 'sho',
  'cha', 'chu', 'cho'
].map(file => `./audio/${file}.mp3`);

// Liste des fichiers MP3 audio chiffres (1-100)
const numberAudioFiles = [];
for (let i = 1; i <= 100; i++) {
  numberAudioFiles.push(`./audio/numbers/num_${i}.mp3`);
}

// Liste des fichiers MP3 audio dialogues (45 lignes)
const dialogueAudioFiles = [];
for (let i = 1; i <= 11; i++) {
  const lessonNum = `l${i}`;
  const linesCount = [4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4]; // Nombre de lignes par dialogue (leçon 10 = 5 lignes)
  for (let j = 1; j <= linesCount[i-1]; j++) {
    dialogueAudioFiles.push(`./audio/dialogues/dialogue_${lessonNum}_line${j}.mp3`);
  }
}

const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './lessons-data.js',
  './story-mode.js',
  './story-mode-ui.js',
  './cultural-phrases.js',
  './cultural-phrase-ui.js',
  './supabase-config.js',
  './leaderboard.js',
  './manifest.json',
  ...audioFiles, // Fichiers audio hiragana (71 fichiers)
  ...numberAudioFiles, // Fichiers audio chiffres (100 fichiers)
  ...dialogueAudioFiles // Fichiers audio dialogues (44 fichiers)
];

// Installation du service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes - Stratégie Network First
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Vérifier si la réponse est valide
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Cloner la réponse
        const responseToCache = response.clone();

        // Mettre à jour le cache avec la nouvelle version
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // En cas d'échec réseau, retourner du cache
        return caches.match(event.request);
      })
  );
});
