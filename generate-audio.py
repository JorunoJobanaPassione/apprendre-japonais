# -*- coding: utf-8 -*-
"""
Script de generation automatique des fichiers audio hiragana
Utilise Google Text-to-Speech (gTTS) - GRATUIT et excellente qualite

Installation requise :
pip install gtts

Usage :
python generate-audio.py
"""

from gtts import gTTS
import os
import sys

# Force UTF-8 encoding for Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# Liste complète des 71 hiragana
hiragana_list = [
    # Voyelles (5)
    ('あ', 'a'), ('い', 'i'), ('う', 'u'), ('え', 'e'), ('お', 'o'),

    # K (5)
    ('か', 'ka'), ('き', 'ki'), ('く', 'ku'), ('け', 'ke'), ('こ', 'ko'),

    # S (5)
    ('さ', 'sa'), ('し', 'shi'), ('す', 'su'), ('せ', 'se'), ('そ', 'so'),

    # T (5)
    ('た', 'ta'), ('ち', 'chi'), ('つ', 'tsu'), ('て', 'te'), ('と', 'to'),

    # N (5)
    ('な', 'na'), ('に', 'ni'), ('ぬ', 'nu'), ('ね', 'ne'), ('の', 'no'),

    # H (5)
    ('は', 'ha'), ('ひ', 'hi'), ('ふ', 'fu'), ('へ', 'he'), ('ほ', 'ho'),

    # M (5)
    ('ま', 'ma'), ('み', 'mi'), ('む', 'mu'), ('め', 'me'), ('も', 'mo'),

    # Y (3)
    ('や', 'ya'), ('ゆ', 'yu'), ('よ', 'yo'),

    # R (5)
    ('ら', 'ra'), ('り', 'ri'), ('る', 'ru'), ('れ', 're'), ('ろ', 'ro'),

    # W + N (3)
    ('わ', 'wa'), ('を', 'wo'), ('ん', 'n'),

    # Dakuten G (5)
    ('が', 'ga'), ('ぎ', 'gi'), ('ぐ', 'gu'), ('げ', 'ge'), ('ご', 'go'),

    # Dakuten Z (5)
    ('ざ', 'za'), ('じ', 'ji'), ('ず', 'zu'), ('ぜ', 'ze'), ('ぞ', 'zo'),

    # Dakuten D (5)
    ('だ', 'da'), ('ぢ', 'ji2'), ('づ', 'zu2'), ('で', 'de'), ('ど', 'do'),

    # Dakuten B (5)
    ('ば', 'ba'), ('び', 'bi'), ('ぶ', 'bu'), ('べ', 'be'), ('ぼ', 'bo'),

    # Handakuten P (5)
    ('ぱ', 'pa'), ('ぴ', 'pi'), ('ぷ', 'pu'), ('ぺ', 'pe'), ('ぽ', 'po'),

    # Combinaisons (9)
    ('きゃ', 'kya'), ('きゅ', 'kyu'), ('きょ', 'kyo'),
    ('しゃ', 'sha'), ('しゅ', 'shu'), ('しょ', 'sho'),
    ('ちゃ', 'cha'), ('ちゅ', 'chu'), ('ちょ', 'cho'),
]

def generate_audio_files():
    """Genere tous les fichiers MP3 des hiragana"""

    # Creer le dossier audio s'il n'existe pas
    output_dir = "html-version/audio"
    os.makedirs(output_dir, exist_ok=True)

    print("Generation des fichiers audio hiragana...")
    print(f"Dossier de sortie : {output_dir}")
    print(f"Total : {len(hiragana_list)} fichiers a generer\n")

    success_count = 0
    error_count = 0

    for hiragana, romaji in hiragana_list:
        try:
            # Générer l'audio avec gTTS (langue japonaise)
            tts = gTTS(text=hiragana, lang='ja', slow=False)

            # Nom du fichier : utilise le romaji pour éviter problèmes d'encodage
            filename = f"{romaji}.mp3"
            filepath = os.path.join(output_dir, filename)

            # Sauvegarder le fichier
            tts.save(filepath)

            success_count += 1
            print(f"OK {hiragana} ({romaji}) -> {filename}")

        except Exception as e:
            error_count += 1
            print(f"ERREUR pour {hiragana} ({romaji}) : {e}")

    print(f"\nTermine !")
    print(f"Succes : {success_count}/{len(hiragana_list)}")

    if error_count > 0:
        print(f"Erreurs : {error_count}")

    # Calculer la taille totale
    total_size = sum(os.path.getsize(os.path.join(output_dir, f))
                     for f in os.listdir(output_dir) if f.endswith('.mp3'))
    print(f"Taille totale : {total_size / 1024:.1f} KB ({total_size / (1024*1024):.2f} MB)")

if __name__ == "__main__":
    generate_audio_files()
