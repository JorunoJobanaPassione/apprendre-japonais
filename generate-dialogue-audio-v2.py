#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generateur d'audio pour les mini-dialogues - V2 avec voix multiples
Utilise Microsoft Edge TTS (edge-tts) avec voix homme/femme
"""

import asyncio
import edge_tts
import os

# Creer le dossier audio s'il n'existe pas
output_dir = "html-version/audio/dialogues"
os.makedirs(output_dir, exist_ok=True)

# Voix japonaises Microsoft Edge TTS
VOICE_FEMALE = "ja-JP-NanamiNeural"  # Voix feminine naturelle
VOICE_MALE = "ja-JP-KeitaNeural"     # Voix masculine naturelle

# Toutes les lignes de dialogue avec speaker
dialogues = [
    # Lecon 1 : Premiere Rencontre
    {"id": "dialogue_l1_line1", "text": "おはよう", "speaker": "A"},
    {"id": "dialogue_l1_line2", "text": "おはよう", "speaker": "B"},
    {"id": "dialogue_l1_line3", "text": "あき です", "speaker": "A"},
    {"id": "dialogue_l1_line4", "text": "かおる です", "speaker": "B"},

    # Lecon 2 : Au Restaurant
    {"id": "dialogue_l2_line1", "text": "すし ください", "speaker": "Client"},
    {"id": "dialogue_l2_line2", "text": "はい、すし です", "speaker": "Serveur"},
    {"id": "dialogue_l2_line3", "text": "お茶 も ください", "speaker": "Client"},
    {"id": "dialogue_l2_line4", "text": "はい、どうぞ", "speaker": "Serveur"},

    # Lecon 3 : Les Animaux
    {"id": "dialogue_l3_line1", "text": "ねこ が います", "speaker": "A"},
    {"id": "dialogue_l3_line2", "text": "かわいい です ね", "speaker": "B"},
    {"id": "dialogue_l3_line3", "text": "なまえ は はな です", "speaker": "A"},
    {"id": "dialogue_l3_line4", "text": "いい なまえ です ね", "speaker": "B"},

    # Lecon 4 : A la Gare
    {"id": "dialogue_l4_line1", "text": "とうきょう まで ください", "speaker": "A"},
    {"id": "dialogue_l4_line2", "text": "はい、ろくせん えん です", "speaker": "B"},
    {"id": "dialogue_l4_line3", "text": "なんじ の でんしゃ です か", "speaker": "A"},
    {"id": "dialogue_l4_line4", "text": "よじ です", "speaker": "B"},

    # Lecon 5 : Shopping
    {"id": "dialogue_l5_line1", "text": "りんご を ください", "speaker": "Client"},
    {"id": "dialogue_l5_line2", "text": "はい、なんこ です か", "speaker": "Vendeur"},
    {"id": "dialogue_l5_line3", "text": "さんこ を おねがいします", "speaker": "Client"},
    {"id": "dialogue_l5_line4", "text": "わかりました", "speaker": "Vendeur"},

    # Lecon 6 : A l'Ecole
    {"id": "dialogue_l6_line1", "text": "がっこう は どう です か", "speaker": "A"},
    {"id": "dialogue_l6_line2", "text": "たのしい です", "speaker": "B"},
    {"id": "dialogue_l6_line3", "text": "えいご を べんきょう します か", "speaker": "A"},
    {"id": "dialogue_l6_line4", "text": "はい、まいにち べんきょう します", "speaker": "B"},

    # Lecon 7 : La Meteo
    {"id": "dialogue_l7_line1", "text": "きょう の てんき は どう です か", "speaker": "A"},
    {"id": "dialogue_l7_line2", "text": "あめ が ふって います", "speaker": "B"},
    {"id": "dialogue_l7_line3", "text": "ざんねん です ね", "speaker": "A"},
    {"id": "dialogue_l7_line4", "text": "でも、あした は はれ です", "speaker": "B"},

    # Lecon 8 : Au Parc
    {"id": "dialogue_l8_line1", "text": "こうえん に いきませんか", "speaker": "A"},
    {"id": "dialogue_l8_line2", "text": "いいです ね！ピクニック しましょう", "speaker": "B"},
    {"id": "dialogue_l8_line3", "text": "パン を かいましょう", "speaker": "A"},
    {"id": "dialogue_l8_line4", "text": "はい、たのしみ です", "speaker": "B"},

    # Lecon 9 : Restaurant Japonais
    {"id": "dialogue_l9_line1", "text": "ちゅうもん を おねがいします", "speaker": "Client"},
    {"id": "dialogue_l9_line2", "text": "はい、なに に しますか", "speaker": "Serveur"},
    {"id": "dialogue_l9_line3", "text": "ぎゅうにゅう と ちゃ を ください", "speaker": "Client"},
    {"id": "dialogue_l9_line4", "text": "りょうかい です", "speaker": "Serveur"},

    # Lecon 10 : Conversation Quotidienne
    {"id": "dialogue_l10_line1", "text": "おはよう ございます", "speaker": "Yuki"},
    {"id": "dialogue_l10_line2", "text": "おはよう。きょう は いい てんき です ね", "speaker": "Hiro"},
    {"id": "dialogue_l10_line3", "text": "そう です ね。どこ に いきます か", "speaker": "Yuki"},
    {"id": "dialogue_l10_line4", "text": "としょかん に いきます。あなた は", "speaker": "Hiro"},
    {"id": "dialogue_l10_line5", "text": "わたし も です。いっしょ に いきましょう", "speaker": "Yuki"},

    # Lecon 11 : Faire les courses
    {"id": "dialogue_l11_line1", "text": "りんご を ください", "speaker": "Client"},
    {"id": "dialogue_l11_line2", "text": "なんこ です か", "speaker": "Vendeur"},
    {"id": "dialogue_l11_line3", "text": "ごこ ください", "speaker": "Client"},
    {"id": "dialogue_l11_line4", "text": "ごひゃくえん です", "speaker": "Vendeur"},
]

# Mapping speaker -> voix (alternance homme/femme)
voice_mapping = {}
current_female_speakers = set()
current_male_speakers = set()

# Fonction pour assigner les voix intelligemment
def assign_voice(speaker, dialogue_id):
    # Si c'est un speaker deja assigne, garder la meme voix
    if speaker in voice_mapping:
        return voice_mapping[speaker]

    # Nouvelle assignation
    # Alterner : si le dernier speaker dans le dialogue precedent etait feminin, le prochain sera masculin
    lesson_num = dialogue_id.split('_')[1]  # Extraire 'l1', 'l2', etc.

    # Par defaut : A/Client/Voyageur = Feminin, B/Serveur/Employe/Vendeur = Masculin
    if speaker in ['A', 'Client', 'Voyageur']:
        voice_mapping[speaker] = VOICE_FEMALE
        return VOICE_FEMALE
    else:
        voice_mapping[speaker] = VOICE_MALE
        return VOICE_MALE

async def generate_audio(dialogue):
    """Generer un fichier audio avec edge-tts"""
    voice = assign_voice(dialogue["speaker"], dialogue["id"])
    output_path = os.path.join(output_dir, f"{dialogue['id']}.mp3")

    # Generer l'audio avec edge-tts
    communicate = edge_tts.Communicate(dialogue["text"], voice)
    await communicate.save(output_path)

    return output_path

async def main():
    print(f"Generation de {len(dialogues)} fichiers audio avec 2 voix differentes...")
    print(f"Voix feminine: {VOICE_FEMALE}")
    print(f"Voix masculine: {VOICE_MALE}")
    print(f"Dossier de sortie : {output_dir}\n")

    success_count = 0
    error_count = 0

    for dialogue in dialogues:
        try:
            output_path = await generate_audio(dialogue)

            # Calculer la taille du fichier
            file_size = os.path.getsize(output_path)
            voice_type = "F" if voice_mapping[dialogue["speaker"]] == VOICE_FEMALE else "M"

            print(f"OK [{voice_type}] {dialogue['id']}.mp3 ({file_size} bytes) - {dialogue['speaker']}")
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

    # Afficher la repartition des voix
    print(f"\nRepartition des voix :")
    female_count = sum(1 for s in voice_mapping.values() if s == VOICE_FEMALE)
    male_count = sum(1 for s in voice_mapping.values() if s == VOICE_MALE)
    print(f"  Feminine ({VOICE_FEMALE}): {female_count} speakers")
    print(f"  Masculine ({VOICE_MALE}): {male_count} speakers")

# Executer le script
if __name__ == "__main__":
    asyncio.run(main())
