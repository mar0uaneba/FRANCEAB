# ⚡ Connexion Cursor → GitHub (Méthode rapide)

## 🎯 Méthode la plus simple (2 minutes)

### Étape 1 : Ouvrir Source Control dans Cursor
1. Dans Cursor, appuyez sur `Ctrl+Shift+G` 
   OU cliquez sur l'icône **Source Control** (🔀) dans la barre latérale gauche

### Étape 2 : Publier directement
1. En haut du panneau Source Control, vous verrez votre branche `main`
2. Cliquez sur le bouton **"..."** (trois points) à côté de `main`
3. Sélectionnez **"Publish Branch"** ou **"Publish to GitHub"**

### Étape 3 : Se connecter (si demandé)
- Si vous n'êtes pas connecté, Cursor ouvrira une fenêtre de connexion
- Cliquez sur **"Sign in with GitHub"**
- Autorisez Cursor à accéder à votre compte GitHub
- Autorisez les permissions demandées

### Étape 4 : Choisir le nom du dépôt
- Cursor vous demandera le nom du dépôt : `FRANCEAB`
- Choisissez Public ou Private
- Cliquez sur **"OK"** ou **"Publish"**

✅ **Cursor créera automatiquement le dépôt GitHub et poussera tout votre code !**

---

## 🔍 Vérifier que ça marche

Après publication, allez sur **https://github.com/VOTRE_USERNAME/FRANCEAB**

Vous devriez voir :
- ✅ Tous vos fichiers
- ✅ Le README.md
- ✅ Les dossiers `app/`, `components/`, `lib/`, etc.
- ❌ PAS de `.env.local` (c'est normal, il est ignoré)

---

## 🔄 Mettre à jour après modifications

### Méthode rapide (via interface) :
1. `Ctrl+Shift+G` → Panneau Source Control
2. Tapez un message de commit dans la zone de texte
3. Cliquez sur **✓** (checkmark) pour commiter
4. Cliquez sur **"Sync Changes"** ou **"Push"** pour envoyer sur GitHub

### Méthode terminal :
```powershell
git add .
git commit -m "Description des changements"
git push
```

---

## 🆘 Problème : "Remote already exists"

Si vous voyez cette erreur, c'est qu'un remote est déjà configuré avec un mauvais nom d'utilisateur.

**Solution** :
```powershell
cd C:\Users\marou\Desktop\FRANCEAB
$env:Path += ";C:\Program Files\Git\bin"

# Supprimer l'ancien remote
git remote remove origin

# Ajouter le bon remote (remplacez VOTRE_USERNAME par votre vrai nom d'utilisateur GitHub)
git remote add origin https://github.com/VOTRE_USERNAME/FRANCEAB.git

# Pousser
git push -u origin main
```

---

## 📝 Alternative : Palette de commandes

1. Appuyez sur `Ctrl+Shift+P`
2. Tapez : `Git: Push`
3. Si le remote n'existe pas, Cursor vous proposera de le créer
4. Suivez les instructions

---

## ✅ Résumé ultra-rapide

**Le plus simple** :
1. `Ctrl+Shift+G` → Source Control
2. **"..."** → **"Publish Branch"**
3. Connectez-vous à GitHub si demandé
4. Choisissez `FRANCEAB` comme nom
5. C'est fait ! 🎉

Votre code sera maintenant sur GitHub et synchronisé avec Cursor !
