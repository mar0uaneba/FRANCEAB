# 🔗 Connecter Cursor avec GitHub

## Méthode 1 : Via l'interface Cursor (Recommandé)

### Étape 1 : Ouvrir le panneau Source Control
1. Dans Cursor, cliquez sur l'icône **Source Control** (git) dans la barre latérale gauche (ou `Ctrl+Shift+G`)
2. Vous devriez voir vos fichiers modifiés et l'état Git

### Étape 2 : Publier sur GitHub
1. Cliquez sur le bouton **"..."** (trois points) en haut du panneau Source Control
2. Sélectionnez **"Publish to GitHub"** ou **"Publish Branch"**
3. Cursor vous demandera de vous connecter à GitHub (si pas déjà connecté)
4. Choisissez :
   - **Repository name** : `FRANCEAB`
   - **Visibilité** : Public ou Private
5. Cliquez sur **"Publish"**

**Cursor créera automatiquement le dépôt GitHub et poussera votre code !** ✅

---

## Méthode 2 : Se connecter à un compte GitHub existant

### Via l'interface Cursor :
1. Allez dans **File → Preferences → Settings** (ou `Ctrl+,`)
2. Cherchez **"Git: Authentication"** ou **"GitHub"**
3. Cliquez sur **"Sign in with GitHub"**
4. Autorisez Cursor à accéder à votre compte GitHub

### Via la palette de commandes :
1. Appuyez sur `Ctrl+Shift+P` (ou `F1`)
2. Tapez **"Git: Sign in"** ou **"GitHub: Sign in"**
3. Suivez les instructions pour vous connecter

---

## Méthode 3 : Via le terminal intégré (Ligne de commande)

### Si vous avez déjà créé le dépôt sur GitHub.com :

```powershell
# Dans le terminal de Cursor (Ctrl+`)
cd C:\Users\marou\Desktop\FRANCEAB
$env:Path += ";C:\Program Files\Git\bin"

# Lier au dépôt GitHub (remplacez VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/FRANCEAB.git

# Pousser le code
git push -u origin main
```

### Si le dépôt n'existe pas encore :
1. Créez-le d'abord sur GitHub.com (voir `GITHUB_PUSH_INSTRUCTIONS.md`)
2. Puis utilisez les commandes ci-dessus

---

## Méthode 4 : Utiliser l'extension GitHub dans Cursor

1. **Installez l'extension GitHub** :
   - Cliquez sur l'icône **Extensions** (ou `Ctrl+Shift+X`)
   - Cherchez **"GitHub"**
   - Installez **"GitHub Pull Requests and Issues"**

2. **Connectez-vous** :
   - Après l'installation, Cursor vous demandera de vous connecter
   - Autorisez l'accès à GitHub

3. **Publiez votre code** :
   - Le panneau Source Control affichera des options GitHub
   - Utilisez **"Publish Branch"** pour créer et pousser vers GitHub

---

## Vérifier la connexion

### Dans le terminal de Cursor :
```powershell
cd C:\Users\marou\Desktop\FRANCEAB
$env:Path += ";C:\Program Files\Git\bin"

# Vérifier les remotes configurés
git remote -v

# Vérifier le statut
git status
```

### Dans l'interface Cursor :
1. Panneau Source Control (`Ctrl+Shift+G`)
2. Vous devriez voir :
   - ✅ Vos fichiers
   - ✅ L'état des modifications
   - ✅ Des boutons pour commit/push

---

## Commandes Git utiles dans Cursor

### Via le panneau Source Control :
- **+** : Ajouter un fichier au staging
- **✓** : Faire un commit
- **...** : Plus d'options (push, pull, branch, etc.)

### Via la palette de commandes (`Ctrl+Shift+P`) :
- **Git: Push** : Pousser vers GitHub
- **Git: Pull** : Télécharger depuis GitHub
- **Git: Commit** : Faire un commit
- **Git: Clone** : Cloner un dépôt

---

## Authentification GitHub (Token)

Si GitHub demande un token au lieu d'un mot de passe :

1. **Créer un Personal Access Token** :
   - GitHub.com → Settings → Developer settings
   - Personal access tokens → Tokens (classic)
   - Generate new token (classic)
   - Nommez-le (ex: "Cursor Access")
   - Cochez `repo` (toutes les permissions de repository)
   - Copiez le token (ne sera affiché qu'une fois !)

2. **Utiliser le token** :
   - Quand Git demande le mot de passe, utilisez le **token** au lieu du mot de passe

---

## Résumé rapide

**La méthode la plus simple** :
1. Ouvrez Source Control (`Ctrl+Shift+G`)
2. Cliquez sur **"..."** → **"Publish to GitHub"**
3. Connectez-vous si nécessaire
4. Choisissez le nom du dépôt
5. Cliquez **"Publish"**

**C'est tout ! Cursor fera le reste automatiquement.** 🚀

---

## Aide supplémentaire

Si vous rencontrez des problèmes :
- Vérifiez que Git est bien installé : `git --version`
- Vérifiez votre connexion internet
- Vérifiez que vous êtes connecté à GitHub dans Cursor
- Consultez `GITHUB_PUSH_INSTRUCTIONS.md` pour les instructions détaillées
