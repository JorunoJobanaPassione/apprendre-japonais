#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generateur d'audio pour les chiffres 1-100 en japonais
Utilise Microsoft Edge TTS (edge-tts)
"""

import asyncio
import edge_tts
import os

# Creer le dossier audio s'il n'existe pas
output_dir = "html-version/audio/numbers"
os.makedirs(output_dir, exist_ok=True)

# Voix japonaise feminine (claire et naturelle)
VOICE = "ja-JP-NanamiNeural"

# Chiffres 1-100 en japonais (hiragana)
numbers = {
    # 1-10
    1: "いち",
    2: "に",
    3: "さん",
    4: "よん",  # Alternative : し (shi)
    5: "ご",
    6: "ろく",
    7: "なな",  # Alternative : しち (shichi)
    8: "はち",
    9: "きゅう",
    10: "じゅう",

    # 11-19
    11: "じゅういち",
    12: "じゅうに",
    13: "じゅうさん",
    14: "じゅうよん",
    15: "じゅうご",
    16: "じゅうろく",
    17: "じゅうなな",
    18: "じゅうはち",
    19: "じゅうきゅう",

    # 20-90 (dizaines)
    20: "にじゅう",
    30: "さんじゅう",
    40: "よんじゅう",
    50: "ごじゅう",
    60: "ろくじゅう",
    70: "ななじゅう",
    80: "はちじゅう",
    90: "きゅうじゅう",

    # 21-29
    21: "にじゅういち",
    22: "にじゅうに",
    23: "にじゅうさん",
    24: "にじゅうよん",
    25: "にじゅうご",
    26: "にじゅうろく",
    27: "にじゅうなな",
    28: "にじゅうはち",
    29: "にじゅうきゅう",

    # 31-39
    31: "さんじゅういち",
    32: "さんじゅうに",
    33: "さんじゅうさん",
    34: "さんじゅうよん",
    35: "さんじゅうご",
    36: "さんじゅうろく",
    37: "さんじゅうなな",
    38: "さんじゅうはち",
    39: "さんじゅうきゅう",

    # 41-49
    41: "よんじゅういち",
    42: "よんじゅうに",
    43: "よんじゅうさん",
    44: "よんじゅうよん",
    45: "よんじゅうご",
    46: "よんじゅうろく",
    47: "よんじゅうなな",
    48: "よんじゅうはち",
    49: "よんじゅうきゅう",

    # 51-59
    51: "ごじゅういち",
    52: "ごじゅうに",
    53: "ごじゅうさん",
    54: "ごじゅうよん",
    55: "ごじゅうご",
    56: "ごじゅうろく",
    57: "ごじゅうなな",
    58: "ごじゅうはち",
    59: "ごじゅうきゅう",

    # 61-69
    61: "ろくじゅういち",
    62: "ろくじゅうに",
    63: "ろくじゅうさん",
    64: "ろくじゅうよん",
    65: "ろくじゅうご",
    66: "ろくじゅうろく",
    67: "ろくじゅうなな",
    68: "ろくじゅうはち",
    69: "ろくじゅうきゅう",

    # 71-79
    71: "ななじゅういち",
    72: "ななじゅうに",
    73: "ななじゅうさん",
    74: "ななじゅうよん",
    75: "ななじゅうご",
    76: "ななじゅうろく",
    77: "ななじゅうなな",
    78: "ななじゅうはち",
    79: "ななじゅうきゅう",

    # 81-89
    81: "はちじゅういち",
    82: "はちじゅうに",
    83: "はちじゅうさん",
    84: "はちじゅうよん",
    85: "はちじゅうご",
    86: "はちじゅうろく",
    87: "はちじゅうなな",
    88: "はちじゅうはち",
    89: "はちじゅうきゅう",

    # 91-99
    91: "きゅうじゅういち",
    92: "きゅうじゅうに",
    93: "きゅうじゅうさん",
    94: "きゅうじゅうよん",
    95: "きゅうじゅうご",
    96: "きゅうじゅうろく",
    97: "きゅうじゅうなな",
    98: "きゅうじゅうはち",
    99: "きゅうじゅうきゅう",

    # 100
    100: "ひゃく",
}

async def generate_audio(number, text):
    """Generer un fichier audio avec edge-tts"""
    output_path = os.path.join(output_dir, f"num_{number}.mp3")

    # Generer l'audio avec edge-tts
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_path)

    return output_path

async def main():
    print(f"Generation de {len(numbers)} fichiers audio pour les chiffres 1-100...")
    print(f"Voix: {VOICE}")
    print(f"Dossier de sortie : {output_dir}\n")

    success_count = 0
    error_count = 0

    for number, text in sorted(numbers.items()):
        try:
            output_path = await generate_audio(number, text)

            # Calculer la taille du fichier
            file_size = os.path.getsize(output_path)

            print(f"OK num_{number}.mp3 ({file_size} bytes)")
            success_count += 1

        except Exception as e:
            print(f"ERREUR pour {number}: {str(e)}")
            error_count += 1

    print(f"\nGeneration terminee !")
    print(f"Succes : {success_count}/{len(numbers)}")
    if error_count > 0:
        print(f"Erreurs : {error_count}")

    # Calculer la taille totale
    total_size = sum(
        os.path.getsize(os.path.join(output_dir, f"num_{num}.mp3"))
        for num in numbers.keys()
        if os.path.exists(os.path.join(output_dir, f"num_{num}.mp3"))
    )
    print(f"Taille totale : {total_size / 1024:.2f} KB")

# Executer le script
if __name__ == "__main__":
    asyncio.run(main())
