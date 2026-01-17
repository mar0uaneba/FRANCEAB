# 🔑 Comment Trouver la Service Role Key dans Supabase

## 📍 Étapes détaillées

### 1. Connectez-vous à Supabase
- Allez sur [https://supabase.com](https://supabase.com)
- Connectez-vous à votre compte

### 2. Sélectionnez votre projet
- Cliquez sur votre projet "marOUaneba's Project" (ou le nom de votre projet)

### 3. Accédez aux paramètres API
- Dans le menu de gauche, cliquez sur **"Settings"** (Paramètres) ⚙️
- Puis cliquez sur **"API"** dans le sous-menu

### 4. Trouvez la Service Role Key
- Vous verrez plusieurs clés :
  - **Project URL** : L'URL de votre projet
  - **anon public** key : La clé publique (déjà dans votre .env.local)
  - **service_role** key : ⚠️ **C'EST CELLE-CI QU'IL VOUS FAUT !**

### 5. Copiez la Service Role Key
- Cliquez sur l'icône de copie à côté de "service_role" key
- OU sélectionnez le texte et copiez-le (Ctrl+C)

### 6. Ajoutez-la dans .env.local
- Ouvrez le fichier `.env.local` à la racine de votre projet
- Ajoutez cette ligne :
  ```
  SUPABASE_SERVICE_ROLE_KEY=la_clé_que_vous_avez_copiée
  ```
- Sauvegardez le fichier

### 7. Redémarrez le serveur
- Arrêtez le serveur (Ctrl+C dans le terminal)
- Relancez-le avec `npm run dev`

## ⚠️ IMPORTANT - Sécurité

- ❌ **NE JAMAIS** partager cette clé publiquement
- ❌ **NE JAMAIS** la commiter dans Git
- ❌ **NE JAMAIS** l'utiliser côté client (dans le navigateur)
- ✅ Elle doit être **UNIQUEMENT** dans `.env.local` (qui est dans .gitignore)
- ✅ Elle est utilisée **UNIQUEMENT** dans les routes API serveur

## 📝 Exemple de .env.local

Votre fichier `.env.local` devrait ressembler à ça :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_ici
RESEND_API_KEY=votre_resend_key
TMDB_API_KEY=votre_tmdb_key
```

## 🎯 Emplacement exact dans Supabase

```
Supabase Dashboard
  └── Votre Projet
      └── Settings (⚙️)
          └── API
              └── service_role key ← ICI !
```

## ✅ Vérification

Après avoir ajouté la clé et redémarré le serveur :
1. Allez dans Admin → Comptes Admin
2. Vous devriez voir la liste des utilisateurs (ou un message si aucun)
3. Vous pouvez créer de nouveaux comptes admin
