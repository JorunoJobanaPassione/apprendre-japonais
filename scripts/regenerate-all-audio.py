#!/usr/bin/env python3
"""
Script pour regenerer TOUS les fichiers audio avec gTTS
"""

import os
from gtts import gTTS

OUTPUT_DIR = "../mobile-app/assets/audio"

# Tous les sons a generer
ALL_AUDIO = {
    # Hiragana de base
    "a": "あ", "i": "い", "u": "う", "e": "え", "o": "お",
    "ka": "か", "ki": "き", "ku": "く", "ke": "け", "ko": "こ",
    "sa": "さ", "shi": "し", "su": "す", "se": "せ", "so": "そ",
    "ta": "た", "chi": "ち", "tsu": "つ", "te": "て", "to": "と",
    "na": "な", "ni": "に", "nu": "ぬ", "ne": "ね", "no": "の",
    "ha": "は", "hi": "ひ", "fu": "ふ", "he": "へ", "ho": "ほ",
    "ma": "ま", "mi": "み", "mu": "む", "me": "め", "mo": "も",
    "ya": "や", "yu": "ゆ", "yo": "よ",
    "ra": "ら", "ri": "り", "ru": "る", "re": "れ", "ro": "ろ",
    "wa": "わ", "wo": "を", "n": "ん",

    # Dakuten
    "ga": "が", "gi": "ぎ", "gu": "ぐ", "ge": "げ", "go": "ご",
    "za": "ざ", "ji": "じ", "zu": "ず", "ze": "ぜ", "zo": "ぞ",
    "da": "だ", "de": "で", "do": "ど",
    "ba": "ば", "bi": "び", "bu": "ぶ", "be": "べ", "bo": "ぼ",

    # Handakuten
    "pa": "ぱ", "pi": "ぴ", "pu": "ぷ", "pe": "ぺ", "po": "ぽ",

    # Combinaisons
    "kya": "きゃ", "kyu": "きゅ", "kyo": "きょ",
    "sha": "しゃ", "shu": "しゅ", "sho": "しょ",
    "cha": "ちゃ", "chu": "ちゅ", "cho": "ちょ",
    "nya": "にゃ", "nyu": "にゅ", "nyo": "にょ",
    "hya": "ひゃ", "hyu": "ひゅ", "hyo": "ひょ",
    "mya": "みゃ", "myu": "みゅ", "myo": "みょ",
    "rya": "りゃ", "ryu": "りゅ", "ryo": "りょ",
    "gya": "ぎゃ", "gyu": "ぎゅ", "gyo": "ぎょ",
    "ja": "じゃ", "ju": "じゅ", "jo": "じょ",
    "bya": "びゃ", "byu": "びゅ", "byo": "びょ",
    "pya": "ぴゃ", "pyu": "ぴゅ", "pyo": "ぴょ",

    # Kanji N5 - Leçons 1-10
    "ichi": "いち", "san": "さん", "roku": "ろく",
    "shichi": "しち", "hachi": "はち", "kyuu": "きゅう",
    "juu": "じゅう", "hyaku": "ひゃく", "sen": "せん",
    "man": "まん", "en": "えん",
    "nichi": "にち", "getsu": "げつ", "sui": "すい",
    "moku": "もく", "kin": "きん", "kawa": "かわ",
    "hito": "ひと", "otoko": "おとこ", "onna": "おんな",
    "chikara": "ちから",
    "dai": "だい", "shou": "しょう", "ue": "うえ",
    "shita": "した", "naka": "なか", "hidari": "ひだり",
    "migi": "みぎ", "hairu": "はいる", "deru": "でる",
    "hon": "ほん",
    "mae": "まえ", "ato": "あと", "toshi": "とし",
    "gaku": "がく", "sei": "せい", "kou": "こう",
    "fun": "ふん", "han": "はん",

    # Kanji N5 - Leçons 11-20 (Nouveaux)
    # Leçon 11: Météo & Nature
    "ten": "てん", "ki": "き", "ame": "あめ",
    "sora": "そら", "hana": "はな",

    # Leçon 12: Communication
    "miru": "みる", "kiku": "きく", "hanasu": "はなす",
    "yomu": "よむ", "kaku": "かく",

    # Leçon 13: Langues & Mouvement
    "iu": "いう", "iku": "いく", "kuru": "くる", "taberu": "たべる",

    # Leçon 14: Actions Quotidiennes
    "nomu": "のむ", "kau": "かう", "yasumu": "やすむ",
    "nani": "なに", "ima": "いま",

    # Leçon 15: Temps & Cycle
    "mai": "まい", "shuu": "しゅう", "atarashii": "あたらしい",
    "furui": "ふるい", "nagai": "ながい",

    # Leçon 16: Adjectifs
    "takai": "たかい", "yasui": "やすい", "ooi": "おおい",
    "sukunai": "すくない", "shiroi": "しろい",

    # Leçon 17: Couleurs & Directions
    "kuroi": "くろい", "akai": "あかい", "kita": "きた",
    "minami": "みなみ", "higashi": "ひがし",

    # Leçon 18: Pays & Chemins
    "nishi": "にし", "kuni": "くに", "soto": "そと",
    "michi": "みち", "aida": "あいだ",

    # Leçon 19: Lieux & Transport
    "mise": "みせ", "eki": "えき", "den": "でん",
    "kuruma": "くるま", "mon": "もん",

    # Leçon 20: Corps & Famille
    "kuchi": "くち", "ashi": "あし", "chichi": "ちち",
    "haha": "はは", "tomo": "とも",
}

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 50)
    print("REGENERATION AUDIO AVEC gTTS")
    print("=" * 50)

    success = 0
    errors = 0

    for romaji, japanese in ALL_AUDIO.items():
        output_path = os.path.join(OUTPUT_DIR, f"{romaji}.mp3")

        # Toujours regenerer (ecrase les fichiers corrompus)
        try:
            tts = gTTS(text=japanese, lang='ja', slow=False)
            tts.save(output_path)
            print(f"[OK] {romaji}.mp3")
            success += 1
        except Exception as e:
            print(f"[ERROR] {romaji}: {e}")
            errors += 1

    print("=" * 50)
    print(f"Termine! {success} generes, {errors} erreurs")
    print("=" * 50)

if __name__ == "__main__":
    main()
