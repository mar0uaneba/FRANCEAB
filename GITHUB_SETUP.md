# 📦 Guide pour publier votre site sur GitHub

## ⚠️ IMPORTANT : Sécurité
**NE JAMAIS** commiter les fichiers `.env.local` sur GitHub ! Ils contiennent vos clés API secrètes.

Le fichier `.gitignore` protège déjà ces fichiers.

---

## 📋 Étapes à suivre

### 1. Installer Git (si pas déjà installé)
- Téléchargez Git : https://git-scm.com/download/win
- Installez-le avec les options par défaut
- Redémarrez votre terminal après l'installation

### 2. Vérifier l'installation
Ouvrez PowerShell ou CMD dans votre dossier `FRANCEAB` et tapez :
```bash
git --version
```

### 3. Initialiser Git (si pas déjà fait)
```bash
cd C:\Users\marou\Desktop\FRANCEAB
git init
```

### 4. Vérifier que .env.local est bien ignoré
Le fichier `.gitignore` doit contenir :
```
.env*.local
.env
```

### 5. Ajouter tous les fichiers
```bash
git add .
```

### 6. Faire le premier commit
```bash
git commit -m "Initial commit: France Abonnement IPTV site"
```

### 7. Créer un dépôt sur GitHub
1. Allez sur https://github.com
2. Connectez-vous ou créez un compte
3. Cliquez sur le **"+"** en haut à droite → **"New repository"**
4. Donnez un nom : `FRANCEAB` ou `france-abonnement-iptv`
5. **Ne cochez PAS** "Initialize with README"
6. Cliquez sur **"Create repository"**

### 8. Lier votre dépôt local à GitHub
Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub :

```bash
git remote add origin https://github.com/VOTRE_USERNAME/FRANCEAB.git
```

### 9. Pousser le code sur GitHub
```bash
git branch -M main
git push -u origin main
```

---

## ✅ Vérifications après le push

1. Allez sur votre dépôt GitHub
2. Vérifiez que vous **NE voyez PAS** :
   - ❌ `.env.local`
   - ❌ `node_modules/`
   - ❌ `.next/`

3. Vous **DEVEZ voir** :
   - ✅ `package.json`
   - ✅ `app/`
   - ✅ `components/`
   - ✅ `.gitignore`

---

## 🔐 Fichiers sensibles à NE JAMAIS commiter

- `.env.local` - Contient vos clés API secrètes
- `node_modules/` - Dépendances (trop lourdes)
- `.next/` - Fichiers de build Next.js

Ces fichiers sont déjà dans `.gitignore` ✅

---

## 📝 Variables d'environnement

Pour que votre site fonctionne sur un autre environnement (Vercel, Netlify, etc.), vous devrez ajouter ces variables dans les paramètres de votre plateforme :

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_TMDB_API_KEY
RESEND_API_KEY
```

**⚠️ IMPORTANT** : Ne partagez JAMAIS ces clés publiquement !

---

## 🆘 Problèmes courants

### "git: command not found"
→ Git n'est pas installé. Suivez l'étape 1.

### "fatal: not a git repository"
→ Vous n'êtes pas dans le bon dossier ou Git n'est pas initialisé. Faites `git init`.

### "Permission denied"
→ Vérifiez vos identifiants GitHub. Vous devrez peut-être utiliser un token d'accès personnel.

---

## 📚 Commandes Git utiles

```bash
# Voir l'état des fichiers
git status

# Voir les fichiers ignorés
git status --ignored

# Annuler des fichiers ajoutés (si besoin)
git reset

# Voir l'historique des commits
git log

# Mettre à jour après modifications
git add .
git commit -m "Description des changements"
git push
```

---

## ✨ Bonne chance ! 🚀
