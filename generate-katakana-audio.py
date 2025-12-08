# -*- coding: utf-8 -*-
"""
Script de génération automatique des fichiers audio KATAKANA manquants
Utilise Google Text-to-Speech (gTTS) - GRATUIT et excellente qualité

Ce script génère UNIQUEMENT les 35 fichiers manquants :
- 24 combinaisons (NY, HY, MY, RY, GY, J, BY, PY)
- 11 dialogues katakana

Installation requise :
pip install gtts

Usage :
python generate-katakana-audio.py
"""

from gtts import gTTS
import os
import sys

# Force UTF-8 encoding for Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# ===== COMBINAISONS KATAKANA MANQUANTES (24 fichiers) =====
katakana_combinations = [
    # NY (3)
    ('ニャ', 'nya'), ('ニュ', 'nyu'), ('ニョ', 'nyo'),

    # HY (3)
    ('ヒャ', 'hya'), ('ヒュ', 'hyu'), ('ヒョ', 'hyo'),

    # MY (3)
    ('ミャ', 'mya'), ('ミュ', 'myu'), ('ミョ', 'myo'),

    # RY (3)
    ('リャ', 'rya'), ('リュ', 'ryu'), ('リョ', 'ryo'),

    # GY (3)
    ('ギャ', 'gya'), ('ギュ', 'gyu'), ('ギョ', 'gyo'),

    # J (3)
    ('ジャ', 'ja'), ('ジュ', 'ju'), ('ジョ', 'jo'),

    # BY (3)
    ('ビャ', 'bya'), ('ビュ', 'byu'), ('ビョ', 'byo'),

    # PY (3)
    ('ピャ', 'pya'), ('ピュ', 'pyu'), ('ピョ', 'pyo'),
]

# ===== DIALOGUES KATAKANA (11 fichiers) =====
katakana_dialogues = [
    # Leçon 12 - Au Café
    ('dialogue_katakana1', """
    スターバックスへようこそ。
    コーヒーをください。
    """),

    # Leçon 13 - Au Magasin de Vêtements
    ('dialogue_katakana2', """
    このスーツはいくらですか。
    シャツもありますか。
    """),

    # Leçon 14 - Au Restaurant
    ('dialogue_katakana3', """
    ハンバーガーとコーラをください。
    フォークとナイフをください。
    """),

    # Leçon 15 - Au Supermarché
    ('dialogue_katakana4', """
    セブンイレブンでミルクを買います。
    マヨネーズもください。
    """),

    # Leçon 16 - Restaurant Ramen
    ('dialogue_katakana5', """
    ラーメンをください。
    ワンタンスープもお願いします。
    """),

    # Leçon 17 - Magasin de Jeux Vidéo
    ('dialogue_katakana6', """
    ゲームセンターでゼルダをします。
    ギターヒーローもあります。
    """),

    # Leçon 18 - À l'Hôtel
    ('dialogue_katakana7', """
    ホテルグレイスリーへようこそ。
    ダブルルームをお願いします。
    ベッドは二つですか。
    """),

    # Leçon 19 - À la Pizzeria
    ('dialogue_katakana8', """
    ピザナポリでピザを食べます。
    ペペロニピザをください。
    """),

    # Leçon 20 - Au Camping
    ('dialogue_katakana9', """
    キャンプ場でテントを張ります。
    チョコレートを食べます。
    """),

    # Leçon 21 - Karaoké
    ('dialogue_katakana10', """
    カラオケでシャイダックスに行きます。
    マイクを使います。
    """),

    # Leçon 22 - Apple Store
    ('dialogue_katakana11', """
    アップルストアでアイフォンを買います。
    タブレットもあります。
    """),
]

def generate_combination_files():
    """Génère les 24 fichiers MP3 des combinaisons katakana"""

    output_dir = "html-version/audio"
    os.makedirs(output_dir, exist_ok=True)

    print("=" * 60)
    print("🔊 GÉNÉRATION DES COMBINAISONS KATAKANA")
    print("=" * 60)
    print(f"Dossier de sortie : {output_dir}")
    print(f"Total : {len(katakana_combinations)} fichiers à générer\n")

    success_count = 0
    error_count = 0

    for katakana, romaji in katakana_combinations:
        try:
            # Générer l'audio avec gTTS (langue japonaise)
            tts = gTTS(text=katakana, lang='ja', slow=False)

            # Nom du fichier
            filename = f"{romaji}.mp3"
            filepath = os.path.join(output_dir, filename)

            # Sauvegarder le fichier
            tts.save(filepath)

            success_count += 1
            print(f"✅ {katakana} ({romaji}) -> {filename}")

        except Exception as e:
            error_count += 1
            print(f"❌ ERREUR pour {katakana} ({romaji}) : {e}")

    print(f"\n{'=' * 60}")
    print(f"Combinaisons terminées : {success_count}/{len(katakana_combinations)}")
    if error_count > 0:
        print(f"⚠️  Erreurs : {error_count}")
    print(f"{'=' * 60}\n")

    return success_count, error_count

def generate_dialogue_files():
    """Génère les 11 fichiers MP3 des dialogues katakana"""

    output_dir = "html-version/audio"
    os.makedirs(output_dir, exist_ok=True)

    print("=" * 60)
    print("💬 GÉNÉRATION DES DIALOGUES KATAKANA")
    print("=" * 60)
    print(f"Dossier de sortie : {output_dir}")
    print(f"Total : {len(katakana_dialogues)} fichiers à générer\n")

    success_count = 0
    error_count = 0

    for filename_base, dialogue_text in katakana_dialogues:
        try:
            # Nettoyer le texte (enlever espaces inutiles)
            clean_text = dialogue_text.strip()

            # Générer l'audio avec gTTS (langue japonaise, vitesse normale)
            tts = gTTS(text=clean_text, lang='ja', slow=False)

            # Nom du fichier
            filename = f"{filename_base}.mp3"
            filepath = os.path.join(output_dir, filename)

            # Sauvegarder le fichier
            tts.save(filepath)

            success_count += 1
            preview = clean_text[:30].replace('\n', ' ')
            print(f"✅ {filename} -> \"{preview}...\"")

        except Exception as e:
            error_count += 1
            print(f"❌ ERREUR pour {filename_base} : {e}")

    print(f"\n{'=' * 60}")
    print(f"Dialogues terminés : {success_count}/{len(katakana_dialogues)}")
    if error_count > 0:
        print(f"⚠️  Erreurs : {error_count}")
    print(f"{'=' * 60}\n")

    return success_count, error_count

def main():
    """Fonction principale"""

    print("\n" + "=" * 60)
    print("🎌 GÉNÉRATION AUDIO KATAKANA - FICHIERS MANQUANTS")
    print("=" * 60)
    print("Ce script va générer 35 fichiers audio manquants :")
    print("  • 24 combinaisons (NY, HY, MY, RY, GY, J, BY, PY)")
    print("  • 11 dialogues katakana (leçons 12-22)")
    print("=" * 60 + "\n")

    # Générer les combinaisons
    comb_success, comb_errors = generate_combination_files()

    # Générer les dialogues
    dial_success, dial_errors = generate_dialogue_files()

    # Résumé final
    total_success = comb_success + dial_success
    total_errors = comb_errors + dial_errors
    total_expected = len(katakana_combinations) + len(katakana_dialogues)

    print("\n" + "=" * 60)
    print("🎉 GÉNÉRATION TERMINÉE")
    print("=" * 60)
    print(f"✅ Succès : {total_success}/{total_expected} fichiers")
    if total_errors > 0:
        print(f"❌ Erreurs : {total_errors}")
    else:
        print("🎊 Tous les fichiers ont été générés avec succès !")

    # Calculer la taille totale
    output_dir = "html-version/audio"
    try:
        total_size = sum(os.path.getsize(os.path.join(output_dir, f))
                         for f in os.listdir(output_dir) if f.endswith('.mp3'))
        print(f"📁 Taille totale dossier audio : {total_size / 1024:.1f} KB ({total_size / (1024*1024):.2f} MB)")
    except:
        pass

    print("=" * 60 + "\n")

if __name__ == "__main__":
    main()
