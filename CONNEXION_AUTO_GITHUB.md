# 🔐 Connexion automatique GitHub - mar0uaneba

## ✅ Configuration terminée !

Le remote Git est maintenant configuré avec votre compte : **mar0uaneba**

```
origin	https://github.com/mar0uaneba/FRANCEAB.git
```

---

## 🚀 Se connecter automatiquement via Cursor (2 minutes)

### Méthode la plus simple :

1. **Dans Cursor**, appuyez sur **`Ctrl+Shift+G`** 
   → Cela ouvre le panneau **Source Control**

2. **En haut du panneau**, vous verrez votre branche `main`

3. **Cliquez sur le bouton `"..."`** (trois points) à côté de `main`

4. **Sélectionnez `"Publish Branch"`** ou `"Sign in with GitHub to Publish"`

5. **Cursor ouvrira une fenêtre de connexion** :
   - Cliquez sur **"Sign in with GitHub"**
   - Une fenêtre du navigateur s'ouvrira
   - **Autorisez Cursor** à accéder à votre compte GitHub
   - Retournez dans Cursor

6. **Création du dépôt** :
   - Nom du dépôt : `FRANCEAB`
   - Visibilité : Public ou Private
   - Cliquez sur **"OK"** ou **"Publish"**

✅ **Cursor créera automatiquement le dépôt et poussera votre code !**

---

## 📋 Vérifier la connexion

### Dans le terminal de Cursor :
```powershell
cd C:\Users\marou\Desktop\FRANCEAB
$env:Path += ";C:\Program Files\Git\bin"

# Vérifier le remote
git remote -v

# Devrait afficher :
# origin  https://github.com/mar0uaneba/FRANCEAB.git
```

### Dans Cursor (Interface) :
- `Ctrl+Shift+G` → Source Control
- Vous devriez voir vos fichiers et l'état Git
- Le bouton **"Sync Changes"** sera disponible après la connexion

---

## 🔄 Pousser le code après connexion

### Via l'interface Cursor (Recommandé) :
1. `Ctrl+Shift+G` → Source Control
2. Tapez un message de commit en haut
3. Cliquez sur **✓** (checkmark) pour commiter
4. Cliquez sur **"Sync Changes"** ou **"Push"** pour envoyer sur GitHub

### Via le terminal (si déjà connecté) :
```powershell
cd C:\Users\marou\Desktop\FRANCEAB
$env:Path += ";C:\Program Files\Git\bin"

git add .
git commit -m "Description des changements"
git push
```

---

## 🔑 Authentification GitHub (Token)

Si Git demande un mot de passe, utilisez un **Personal Access Token** :

### Créer un token GitHub :

1. Allez sur **https://github.com/settings/tokens**
2. Cliquez sur **"Generate new token (classic)"**
3. Nommez-le (ex: "Cursor Access")
4. Cochez **`repo`** (toutes les permissions de repository)
5. Cliquez sur **"Generate token"**
6. **Copiez le token** (ne sera affiché qu'une fois !)

### Utiliser le token :

Quand Git demande le mot de passe :
- **Username** : `mar0uaneba`
- **Password** : Utilisez le **token** (pas votre mot de passe GitHub)

---

## ✅ Résumé ultra-rapide

**Pour se connecter automatiquement** :
1. `Ctrl+Shift+G` dans Cursor
2. `"..."` → `"Publish Branch"`
3. `"Sign in with GitHub"`
4. Autorisez Cursor
5. Choisissez `FRANCEAB` comme nom
6. **C'est fait !** 🎉

Votre compte **mar0uaneba** sera maintenant connecté automatiquement dans Cursor !

---

## 🆘 Problème : Le dépôt n'existe pas encore

Si vous voyez une erreur "Repository not found", vous devez d'abord créer le dépôt sur GitHub :

### Option 1 : Via Cursor (Automatique)
- Quand vous cliquez sur "Publish Branch", Cursor créera le dépôt automatiquement

### Option 2 : Via GitHub.com (Manuel)
1. Allez sur **https://github.com/new**
2. Nom du dépôt : `FRANCEAB`
3. Choisissez Public ou Private
4. **Ne cochez PAS** "Initialize with README" (il existe déjà)
5. Cliquez sur **"Create repository"**
6. Revenez dans Cursor et poussez le code

---

## 📞 Aide supplémentaire

Si vous rencontrez des problèmes :
- Vérifiez que vous êtes connecté à GitHub dans Cursor : `Ctrl+Shift+P` → `GitHub: Sign in`
- Consultez `CURSOR_GITHUB_CONNEXION.md` pour le guide détaillé
- Vérifiez le remote : `git remote -v`

**Votre compte est configuré ! Il suffit maintenant de vous connecter via l'interface Cursor.** 🚀
