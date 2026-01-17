# Configuration TMDB API

## Comment obtenir votre clé API TMDB (GRATUITE)

1. **Créer un compte** :
   - Allez sur [themoviedb.org](https://www.themoviedb.org)
   - Cliquez sur "Sign Up" pour créer un compte gratuit

2. **Demander une clé API** :
   - Une fois connecté, allez dans votre profil (icône en haut à droite)
   - Cliquez sur "Settings"
   - Allez dans l'onglet "API"
   - Cliquez sur "Request an API Key"
   - Choisissez "Developer" (pour usage personnel)
   - Remplissez le formulaire :
     - Type: Developer
     - Application name: France IPTV (ou autre)
     - Application URL: http://localhost:3000 (pour le dev)
     - Acceptez les conditions
   - Cliquez sur "Submit"

3. **Copier votre clé API** :
   - Une fois approuvée (généralement immédiat), vous verrez votre clé API
   - Copiez-la (elle ressemble à : `abc123def456ghi789jkl012mno345pq`)

4. **Ajouter la clé dans votre projet** :
   - Ouvrez le fichier `.env.local` à la racine du projet
   - Ajoutez cette ligne :
     ```
     NEXT_PUBLIC_TMDB_API_KEY=votre_cle_api_ici
     ```
   - Remplacez `votre_cle_api_ici` par votre vraie clé API

5. **Redémarrer le serveur** :
   ```bash
   # Arrêtez le serveur (Ctrl+C)
   npm run dev
   ```

## Vérification

Une fois configuré, le site chargera automatiquement les films et séries populaires depuis TMDB avec de vraies images et informations à jour.

## Note

- La clé API TMDB est **gratuite** pour un usage personnel
- Sans la clé API, le site utilisera des données de fallback avec de vraies images
- La clé API permet d'avoir des données toujours à jour


