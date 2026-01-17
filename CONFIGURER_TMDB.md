# 🎬 Configuration de la Clé API TMDB

## 📝 Étape 1 : Obtenir votre clé API TMDB (GRATUITE)

1. **Créer un compte TMDB** :
   - Allez sur [themoviedb.org](https://www.themoviedb.org)
   - Cliquez sur "Sign Up" (Inscription) en haut à droite
   - Créez un compte gratuit (c'est instantané)

2. **Demander une clé API** :
   - Une fois connecté, cliquez sur votre profil (icône en haut à droite)
   - Allez dans "Settings" (Paramètres)
   - Cliquez sur l'onglet "API"
   - Cliquez sur "Request an API Key" (Demander une clé API)
   - Choisissez "Developer" (Développeur) - c'est gratuit
   - Remplissez le formulaire :
     - **Type**: Developer
     - **Application name**: France Abonnement IPTV (ou autre nom)
     - **Application URL**: http://localhost:3000
     - **Application summary**: IPTV subscription platform
     - Acceptez les conditions d'utilisation
   - Cliquez sur "Submit" (Soumettre)

3. **Copier votre clé API** :
   - Votre clé API sera affichée immédiatement (elle ressemble à : `abc123def456ghi789jkl012mno345pq`)
   - **⚠️ IMPORTANT** : Copiez-la tout de suite, vous ne pourrez plus la voir après !

## 📝 Étape 2 : Configurer la clé dans votre projet

### Option A : Configuration manuelle

1. Ouvrez le fichier `.env.local` à la racine du projet
2. Trouvez la ligne :
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```
3. Remplacez `your_tmdb_api_key_here` par votre vraie clé API :
   ```
   NEXT_PUBLIC_TMDB_API_KEY=votre_cle_api_ici
   ```
4. Sauvegardez le fichier

### Option B : Configuration automatique (PowerShell)

Exécutez cette commande dans PowerShell (remplacez `VOTRE_CLE_API` par votre vraie clé) :

```powershell
cd C:\Users\marou\Desktop\FRANCEAB
(Get-Content .env.local) -replace 'NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here', 'NEXT_PUBLIC_TMDB_API_KEY=VOTRE_CLE_API' | Set-Content .env.local
```

## 📝 Étape 3 : Redémarrer le serveur

1. Arrêtez le serveur actuel (Ctrl+C dans le terminal)
2. Redémarrez-le :
   ```bash
   npm run dev
   ```

## ✅ Vérification

Une fois configuré, rechargez votre page web. Les films suivants devraient maintenant afficher de vraies images :

- ✅ Deadpool & Wolverine
- ✅ Joker: Folie à Deux
- ✅ Venom: The Last Dance
- ✅ Gladiator 2
- ✅ Inside Out 2
- ✅ Avatar: The Way of Water
- ✅ House of the Dragon
- ✅ Wednesday
- ✅ Bridgerton

## 🔍 Si ça ne fonctionne pas

1. **Vérifiez que la clé est correcte** :
   - Ouvrez `.env.local` et vérifiez que `NEXT_PUBLIC_TMDB_API_KEY` contient bien votre clé (sans espaces)
   
2. **Vérifiez que le serveur a été redémarré** :
   - Les variables d'environnement ne sont chargées qu'au démarrage
   - Arrêtez complètement le serveur (Ctrl+C) et relancez `npm run dev`

3. **Vérifiez la console du navigateur** :
   - Ouvrez les outils de développement (F12)
   - Regardez l'onglet "Console" pour voir s'il y a des erreurs

## 📚 Informations supplémentaires

- La clé API TMDB est **100% gratuite** pour un usage personnel
- Sans la clé API, le site utilisera des données de fallback (mais certaines images peuvent être manquantes)
- La clé API permet d'avoir des données toujours à jour et des images de qualité

## 🆘 Besoin d'aide ?

Si vous avez des problèmes :
1. Vérifiez que votre compte TMDB est bien créé
2. Vérifiez que vous avez bien demandé une clé API Developer
3. Vérifiez que la clé est bien copiée dans `.env.local` (sans espaces avant/après)
4. Redémarrez le serveur après avoir modifié `.env.local`

