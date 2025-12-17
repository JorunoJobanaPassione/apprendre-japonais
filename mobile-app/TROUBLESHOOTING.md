# 🔧 Guide de Dépannage - Japonais App

## ❌ Problème : "The request timed out" sur Expo Go

### Causes possibles
1. Firewall Windows bloque la connexion
2. Téléphone et PC pas sur le même réseau WiFi
3. Port 8081 déjà utilisé
4. Problème de compatibilité des packages

---

## ✅ Solutions

### Solution 1 : Vérifier le réseau (Le plus courant)

**Votre téléphone et votre PC DOIVENT être sur le même réseau WiFi.**

1. Sur votre PC, ouvrez l'invite de commande et tapez :
   ```
   ipconfig
   ```
   Notez l'adresse IPv4 (ex: 192.168.1.234)

2. Sur votre téléphone, vérifiez que vous êtes connecté au **même WiFi**
   - Pas de 4G/5G
   - Pas de WiFi invité
   - Le même réseau que votre PC

---

### Solution 2 : Mode Tunnel (Plus lent mais fonctionne toujours)

1. Dans le terminal où Metro tourne, appuyez sur **`s`**
2. Cela active le mode "tunnel" qui utilise Internet au lieu du réseau local
3. Scannez à nouveau le QR code

---

### Solution 3 : Autoriser dans le Firewall Windows

1. **Panneau de configuration** → **Pare-feu Windows Defender**
2. Cliquez sur **"Autoriser une application via le pare-feu"**
3. Cliquez sur **"Modifier les paramètres"** (bouton en haut)
4. Cliquez sur **"Autoriser une autre application"**
5. Cliquez sur **"Parcourir"** et naviguez vers :
   ```
   C:\Program Files\nodejs\node.exe
   ```
6. Cochez **Privé** et **Public**
7. Cliquez sur **OK**

---

### Solution 4 : Redémarrer Metro proprement

1. Dans le terminal, appuyez sur **Ctrl+C** pour arrêter Metro
2. Fermez le terminal
3. Ouvrez un nouveau terminal
4. Lancez :
   ```bash
   cd C:\Users\dosso\Desktop\Projets\Japonais\JaponaisApp\mobile-app
   npx expo start --clear
   ```

---

### Solution 5 : Utiliser l'émulateur Android (Pas besoin de réseau)

1. Téléchargez **Android Studio** : https://developer.android.com/studio
2. Installez-le et ouvrez **AVD Manager**
3. Créez un émulateur Android (Pixel 6, Android 13)
4. Démarrez l'émulateur
5. Dans Metro, appuyez sur **`a`**

---

### Solution 6 : Vérifier que le port 8081 est libre

```bash
netstat -ano | findstr :8081
```

Si le port est utilisé :
```bash
taskkill /PID <numero_du_PID> /F
```

Puis relancez Metro.

---

### Solution 7 : Mode Web (Pour tester sans téléphone)

Dans Metro, appuyez sur **`w`** pour lancer en mode web dans votre navigateur.

⚠️ **Limitations** :
- Pas d'accès à la caméra
- Certaines fonctionnalités natives ne marchent pas
- Mais permet de tester la majorité de l'app

---

## 🎯 Solution Rapide Recommandée

**Essayez dans cet ordre** :

1. **Mode Web** (appuyez sur `w`) → Testez si l'app fonctionne
2. **Mode Tunnel** (appuyez sur `s`) → Résout 90% des problèmes de réseau
3. **Firewall** → Si tunnel ne marche pas

---

## ✅ Comment savoir si ça marche ?

Vous devriez voir :
```
✅ Metro waiting on exp://192.168.1.234:8081
✅ Logs coming from Android/iOS device
✅ App loaded successfully
```

Sur votre téléphone :
- L'app s'ouvre en 5-10 secondes maximum
- Vous voyez l'écran "Bonjour ! 👋"

---

## 📱 Packages Corrigés

Les packages suivants ont été mis à jour :
- ✅ `expo@~54.0.29` (était 54.0.2)
- ✅ `react-native-screens@~4.16.0` (était 4.18.0)

---

## 🔊 Note sur l'Audio

Le système audio est **désactivé par défaut** pour éviter les crashes.

Les boutons 🔊 sont visibles mais ne jouent pas de son.

Pour l'activer plus tard :
1. Vérifier que tous les fichiers MP3 sont présents
2. Appeler `audioService.enable()` dans l'app

---

**Besoin d'aide ?** Essayez d'abord le **mode web** (`w`) pour voir si l'app fonctionne correctement.
