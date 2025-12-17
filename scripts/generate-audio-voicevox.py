"""
VOICEVOX Audio Generator pour JaponaisApp
==========================================
Génère des fichiers audio de haute qualité avec VOICEVOX

Prérequis:
1. Télécharger VOICEVOX: https://voicevox.hiroshiba.jp/
2. Lancer VOICEVOX (le serveur démarre automatiquement sur localhost:50021)
3. Installer les dépendances: pip install requests pydub
4. Installer ffmpeg (pour la conversion MP3): https://ffmpeg.org/download.html

Usage:
    python generate-audio-voicevox.py
"""

import requests
import json
import os
import time
from pathlib import Path

# Configuration
VOICEVOX_URL = "http://localhost:50021"
OUTPUT_DIR = Path(__file__).parent.parent / "mobile-app" / "assets" / "audio"
BACKUP_DIR = Path(__file__).parent.parent / "mobile-app" / "assets" / "audio_backup_gtts"

# Speaker IDs VOICEVOX (voix disponibles)
# 0: 四国めたん (あまあま)
# 1: ずんだもん (あまあま)
# 2: 四国めたん (ノーマル)
# 3: ずんだもん (ノーマル)
# 8: 春日部つむぎ (ノーマル)
# 10: 雨晴はう (ノーマル)
# 14: 冥鳴ひまり (ノーマル)
SPEAKER_ID = 3  # ずんだもん (ノーマル) - voix claire et naturelle

# Mapping Romaji -> Hiragana (pour la prononciation correcte)
ROMAJI_TO_HIRAGANA = {
    # Voyelles
    'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',

    # K-row
    'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',

    # S-row
    'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',

    # T-row
    'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',

    # N-row
    'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',

    # H-row
    'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',

    # M-row
    'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',

    # Y-row
    'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',

    # R-row
    'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',

    # W-row
    'wa': 'わ', 'wo': 'を', 'n': 'ん',

    # Dakuten (voiced)
    'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
    'za': 'ざ', 'ji': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
    'da': 'だ', 'de': 'で', 'do': 'ど',
    'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',

    # Handakuten
    'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',

    # Combinaisons (yōon)
    'kya': 'きゃ', 'kyu': 'きゅ', 'kyo': 'きょ',
    'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ',
    'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ',
    'nya': 'にゃ', 'nyu': 'にゅ', 'nyo': 'にょ',
    'hya': 'ひゃ', 'hyu': 'ひゅ', 'hyo': 'ひょ',
    'mya': 'みゃ', 'myu': 'みゅ', 'myo': 'みょ',
    'rya': 'りゃ', 'ryu': 'りゅ', 'ryo': 'りょ',
    'gya': 'ぎゃ', 'gyu': 'ぎゅ', 'gyo': 'ぎょ',
    'ja': 'じゃ', 'ju': 'じゅ', 'jo': 'じょ',
    'bya': 'びゃ', 'byu': 'びゅ', 'byo': 'びょ',
    'pya': 'ぴゃ', 'pyu': 'ぴゅ', 'pyo': 'ぴょ',

    # Kanji readings (mots)
    'ichi': 'いち',
    'san': 'さん',
    'roku': 'ろく',
    'shichi': 'しち',
    'hachi': 'はち',
    'kyuu': 'きゅう',
    'juu': 'じゅう',
    'hyaku': 'ひゃく',
    'sen': 'せん',
    'man': 'まん',
    'en': 'えん',
    'nichi': 'にち',
    'getsu': 'げつ',
    'sui': 'すい',
    'moku': 'もく',
    'kin': 'きん',
    'kawa': 'かわ',
    'hito': 'ひと',
    'otoko': 'おとこ',
    'onna': 'おんな',
    'chikara': 'ちから',
    'dai': 'だい',
    'shou': 'しょう',
    'ue': 'うえ',
    'shita': 'した',
    'naka': 'なか',
    'hidari': 'ひだり',
    'migi': 'みぎ',
    'hairu': 'はいる',
    'deru': 'でる',
    'hon': 'ほん',
    'mae': 'まえ',
    'ato': 'あと',
    'toshi': 'とし',
    'gaku': 'がく',
    'sei': 'せい',
    'kou': 'こう',
    'fun': 'ふん',
    'han': 'はん',
    'ten': 'てん',
    'ki': 'き',
    'ame': 'あめ',
    'sora': 'そら',
    'hana': 'はな',
    'miru': 'みる',
    'kiku': 'きく',
    'hanasu': 'はなす',
    'yomu': 'よむ',
    'kaku': 'かく',
    'iu': 'いう',
    'iku': 'いく',
    'kuru': 'くる',
    'taberu': 'たべる',
    'nomu': 'のむ',
    'kau': 'かう',
    'yasumu': 'やすむ',
    'nani': 'なに',
    'ima': 'いま',
    'mai': 'まい',
    'shuu': 'しゅう',
    'atarashii': 'あたらしい',
    'furui': 'ふるい',
    'nagai': 'ながい',
    'takai': 'たかい',
    'yasui': 'やすい',
    'ooi': 'おおい',
    'sukunai': 'すくない',
    'shiroi': 'しろい',
    'kuroi': 'くろい',
    'akai': 'あかい',
    'kita': 'きた',
    'minami': 'みなみ',
    'higashi': 'ひがし',
    'nishi': 'にし',
    'kuni': 'くに',
    'soto': 'そと',
    'michi': 'みち',
    'aida': 'あいだ',
    'mise': 'みせ',
    'eki': 'えき',
    'den': 'でん',
    'kuruma': 'くるま',
    'mon': 'もん',
    'kuchi': 'くち',
    'ashi': 'あし',
    'chichi': 'ちち',
    'haha': 'はは',
    'tomo': 'とも',
}

def check_voicevox_running():
    """Vérifie si VOICEVOX est en cours d'exécution"""
    try:
        response = requests.get(f"{VOICEVOX_URL}/speakers")
        return response.status_code == 200
    except requests.exceptions.ConnectionError:
        return False

def get_available_speakers():
    """Récupère la liste des voix disponibles"""
    response = requests.get(f"{VOICEVOX_URL}/speakers")
    speakers = response.json()
    print("\n🎤 Voix disponibles dans VOICEVOX:")
    for speaker in speakers:
        print(f"  - {speaker['name']}")
        for style in speaker['styles']:
            print(f"      ID {style['id']}: {style['name']}")
    return speakers

def generate_audio(text, output_path, speaker_id=SPEAKER_ID):
    """Génère un fichier audio avec VOICEVOX"""
    try:
        # Étape 1: Créer la requête audio
        query_response = requests.post(
            f"{VOICEVOX_URL}/audio_query",
            params={"text": text, "speaker": speaker_id}
        )

        if query_response.status_code != 200:
            print(f"  ❌ Erreur audio_query: {query_response.status_code}")
            return False

        query_data = query_response.json()

        # Ajuster les paramètres pour une prononciation claire
        query_data["speedScale"] = 0.9  # Légèrement plus lent
        query_data["pitchScale"] = 0.0  # Pitch normal
        query_data["volumeScale"] = 1.0  # Volume normal

        # Étape 2: Synthétiser l'audio
        synthesis_response = requests.post(
            f"{VOICEVOX_URL}/synthesis",
            params={"speaker": speaker_id},
            json=query_data
        )

        if synthesis_response.status_code != 200:
            print(f"  ❌ Erreur synthesis: {synthesis_response.status_code}")
            return False

        # Sauvegarder en WAV d'abord
        wav_path = output_path.with_suffix('.wav')
        with open(wav_path, 'wb') as f:
            f.write(synthesis_response.content)

        # Convertir en MP3 avec ffmpeg
        mp3_path = output_path.with_suffix('.mp3')
        os.system(f'ffmpeg -y -i "{wav_path}" -acodec libmp3lame -q:a 2 "{mp3_path}" -loglevel quiet')

        # Supprimer le fichier WAV temporaire
        if mp3_path.exists():
            wav_path.unlink()
            return True
        else:
            # Si ffmpeg n'est pas disponible, garder le WAV
            print(f"  ⚠️ ffmpeg non trouvé, fichier WAV conservé")
            return True

    except Exception as e:
        print(f"  ❌ Erreur: {e}")
        return False

def backup_existing_audio():
    """Sauvegarde les fichiers audio existants"""
    if not OUTPUT_DIR.exists():
        print("⚠️ Dossier audio non trouvé")
        return

    if not BACKUP_DIR.exists():
        BACKUP_DIR.mkdir(parents=True)
        print(f"📁 Backup créé: {BACKUP_DIR}")

    import shutil
    for file in OUTPUT_DIR.glob("*.mp3"):
        dest = BACKUP_DIR / file.name
        if not dest.exists():
            shutil.copy2(file, dest)

    print(f"✅ Fichiers existants sauvegardés dans: {BACKUP_DIR}")

def main():
    print("=" * 60)
    print("🎙️ VOICEVOX Audio Generator pour JaponaisApp")
    print("=" * 60)

    # Vérifier que VOICEVOX est lancé
    if not check_voicevox_running():
        print("\n❌ VOICEVOX n'est pas en cours d'exécution!")
        print("\nÉtapes:")
        print("1. Téléchargez VOICEVOX: https://voicevox.hiroshiba.jp/")
        print("2. Lancez l'application VOICEVOX")
        print("3. Relancez ce script")
        return

    print("\n✅ VOICEVOX détecté!")

    # Afficher les voix disponibles
    get_available_speakers()

    print(f"\n🎤 Voix sélectionnée: Speaker ID {SPEAKER_ID}")

    # Backup des anciens fichiers
    print("\n📦 Sauvegarde des fichiers existants...")
    backup_existing_audio()

    # Créer le dossier de sortie
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Générer les fichiers audio
    print(f"\n🔄 Génération de {len(ROMAJI_TO_HIRAGANA)} fichiers audio...")
    print("-" * 40)

    success_count = 0
    error_count = 0

    for romaji, hiragana in ROMAJI_TO_HIRAGANA.items():
        output_path = OUTPUT_DIR / f"{romaji}.mp3"
        print(f"  {romaji} ({hiragana})...", end=" ")

        if generate_audio(hiragana, output_path):
            print("✅")
            success_count += 1
        else:
            print("❌")
            error_count += 1

        # Petite pause pour ne pas surcharger VOICEVOX
        time.sleep(0.1)

    # Résumé
    print("\n" + "=" * 60)
    print("📊 RÉSUMÉ")
    print("=" * 60)
    print(f"  ✅ Réussis: {success_count}")
    print(f"  ❌ Erreurs: {error_count}")
    print(f"  📁 Dossier: {OUTPUT_DIR}")

    if error_count == 0:
        print("\n🎉 Tous les fichiers audio ont été générés avec succès!")
    else:
        print(f"\n⚠️ {error_count} fichier(s) n'ont pas pu être générés.")

if __name__ == "__main__":
    main()
