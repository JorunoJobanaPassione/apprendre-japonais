#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Générateur d'audio pour les mini-dialogues
Utilise Google TTS (gTTS) pour générer les fichiers MP3
"""

from gtts import gTTS
import os

# Créer le dossier audio s'il n'existe pas
output_dir = "html-version/audio/dialogues"
os.makedirs(output_dir, exist_ok=True)

# Toutes les lignes de dialogue extraites des 10 mini-dialogues
dialogues = [
    # Leçon 1 : Première Rencontre
    {"id": "dialogue_l1_line1", "text": "おはよう", "romaji": "ohayou"},
    {"id": "dialogue_l1_line2", "text": "おはよう", "romaji": "ohayou"},
    {"id": "dialogue_l1_line3", "text": "あき です", "romaji": "aki desu"},
    {"id": "dialogue_l1_line4", "text": "かおる です", "romaji": "kaoru desu"},

    # Leçon 2 : Au Restaurant
    {"id": "dialogue_l2_line1", "text": "すし ください", "romaji": "sushi kudasai"},
    {"id": "dialogue_l2_line2", "text": "はい、すし です", "romaji": "hai sushi desu"},
    {"id": "dialogue_l2_line3", "text": "お茶 も ください", "romaji": "ocha mo kudasai"},
    {"id": "dialogue_l2_line4", "text": "はい、どうぞ", "romaji": "hai douzo"},

    # Leçon 3 : Les Animaux
    {"id": "dialogue_l3_line1", "text": "ねこ が います", "romaji": "neko ga imasu"},
    {"id": "dialogue_l3_line2", "text": "かわいい ですね", "romaji": "kawaii desu ne"},
    {"id": "dialogue_l3_line3", "text": "なまえ は なに ですか", "romaji": "namae wa nani desu ka"},
    {"id": "dialogue_l3_line4", "text": "はな です", "romaji": "hana desu"},

    # Leçon 4 : À la Gare
    {"id": "dialogue_l4_line1", "text": "とうきょう まで ください", "romaji": "toukyou made kudasai"},
    {"id": "dialogue_l4_line2", "text": "はい、どうぞ", "romaji": "hai douzo"},
    {"id": "dialogue_l4_line3", "text": "なんじ に つきますか", "romaji": "nanji ni tsukimasu ka"},
    {"id": "dialogue_l4_line4", "text": "ごじ です", "romaji": "goji desu"},

    # Leçon 5 : Shopping
    {"id": "dialogue_l5_line1", "text": "りんご を ください", "romaji": "ringo wo kudasai"},
    {"id": "dialogue_l5_line2", "text": "はい、いくつ ですか", "romaji": "hai ikutsu desu ka"},
    {"id": "dialogue_l5_line3", "text": "みっつ ください", "romaji": "mittsu kudasai"},
    {"id": "dialogue_l5_line4", "text": "はい、どうぞ", "romaji": "hai douzo"},

    # Leçon 6 : À l'École
    {"id": "dialogue_l6_line1", "text": "きょう の じゅぎょう は むずかしい ですね", "romaji": "kyou no jugyou wa muzukashii desu ne"},
    {"id": "dialogue_l6_line2", "text": "そう ですね、でも おもしろい です", "romaji": "sou desu ne demo omoshiroi desu"},
    {"id": "dialogue_l6_line3", "text": "あとで べんきょう しませんか", "romaji": "ato de benkyou shimasen ka"},
    {"id": "dialogue_l6_line4", "text": "いいですね、としょかん で あいましょう", "romaji": "ii desu ne toshokan de aimashou"},

    # Leçon 7 : La Météo
    {"id": "dialogue_l7_line1", "text": "きょう は いい てんき ですね", "romaji": "kyou wa ii tenki desu ne"},
    {"id": "dialogue_l7_line2", "text": "ええ、でも あした は あめ です", "romaji": "ee demo ashita wa ame desu"},
    {"id": "dialogue_l7_line3", "text": "ざんねん ですね", "romaji": "zannen desu ne"},
    {"id": "dialogue_l7_line4", "text": "かさ を もって いきましょう", "romaji": "kasa wo motte ikimashou"},

    # Leçon 8 : Au Parc
    {"id": "dialogue_l8_line1", "text": "こうえん で あそびませんか", "romaji": "kouen de asobimasen ka"},
    {"id": "dialogue_l8_line2", "text": "いいですね、ピクニック を しましょう", "romaji": "ii desu ne pikunikku wo shimashou"},
    {"id": "dialogue_l8_line3", "text": "なに を もって いきますか", "romaji": "nani wo motte ikimasu ka"},
    {"id": "dialogue_l8_line4", "text": "おべんとう を つくります", "romaji": "obentou wo tsukurimasu"},

    # Leçon 9 : Restaurant Japonais
    {"id": "dialogue_l9_line1", "text": "いらっしゃいませ", "romaji": "irasshaimase"},
    {"id": "dialogue_l9_line2", "text": "ラーメン を ください", "romaji": "raamen wo kudasai"},
    {"id": "dialogue_l9_line3", "text": "しょうゆ と みそ、どちら が いい ですか", "romaji": "shouyu to miso dochira ga ii desu ka"},
    {"id": "dialogue_l9_line4", "text": "しょうゆ で おねがいします", "romaji": "shouyu de onegaishimasu"},

    # Leçon 10 : Conversation Quotidienne
    {"id": "dialogue_l10_line1", "text": "おげんき ですか", "romaji": "ogenki desu ka"},
    {"id": "dialogue_l10_line2", "text": "はい、げんき です。あなた は", "romaji": "hai genki desu anata wa"},
    {"id": "dialogue_l10_line3", "text": "わたし も げんき です", "romaji": "watashi mo genki desu"},
    {"id": "dialogue_l10_line4", "text": "それは よかった ですね", "romaji": "sore wa yokatta desu ne"},
]

print(f"Generation de {len(dialogues)} fichiers audio pour les dialogues...")
print(f"Dossier de sortie : {output_dir}\n")

success_count = 0
error_count = 0

for dialogue in dialogues:
    try:
        # Générer l'audio avec Google TTS (japonais)
        tts = gTTS(text=dialogue["text"], lang='ja', slow=False)

        # Sauvegarder le fichier
        output_path = os.path.join(output_dir, f"{dialogue['id']}.mp3")
        tts.save(output_path)

        # Calculer la taille du fichier
        file_size = os.path.getsize(output_path)

        print(f"OK {dialogue['id']}.mp3 ({file_size} bytes) - {dialogue['romaji']}")
        success_count += 1

    except Exception as e:
        print(f"ERREUR pour {dialogue['id']}: {str(e)}")
        error_count += 1

print(f"\nGeneration terminee !")
print(f"Succes : {success_count}/{len(dialogues)}")
if error_count > 0:
    print(f"Erreurs : {error_count}")

# Calculer la taille totale
total_size = sum(
    os.path.getsize(os.path.join(output_dir, f"{d['id']}.mp3"))
    for d in dialogues
    if os.path.exists(os.path.join(output_dir, f"{d['id']}.mp3"))
)
print(f"Taille totale : {total_size / 1024:.2f} KB")
