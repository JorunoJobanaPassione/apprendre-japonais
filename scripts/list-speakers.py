"""Liste tous les speakers VOICEVOX avec leurs IDs"""
import requests
import sys
sys.stdout.reconfigure(encoding='utf-8')

try:
    response = requests.get('http://localhost:50021/speakers')
    speakers = response.json()

    print("=" * 60)
    print("LISTE DES VOIX VOICEVOX")
    print("=" * 60)

    for speaker in speakers:
        print(f"\n{speaker['name']}:")
        for style in speaker['styles']:
            print(f"   ID {style['id']}: {style['name']}")

    print("\n" + "=" * 60)
except Exception as e:
    print(f"Erreur: {e}")
    print("Assurez-vous que VOICEVOX est lance!")
