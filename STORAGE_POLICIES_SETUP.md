# 🔐 Configuration des Politiques de Stockage Supabase

## 📋 Objectif

Configurer les politiques de sécurité pour que seuls les utilisateurs **authentifiés** puissent uploader des images dans le bucket `blog`.

## 🚀 Étapes de Configuration

### 1. Créer le bucket 'blog' (si pas déjà fait)

1. Allez sur **Supabase → Storage**
2. Cliquez sur **"Create bucket"**
3. Remplissez :
   - **Name** : `blog`
   - **Public bucket** : ✅ **OUI** (pour que les images soient accessibles publiquement)
4. Cliquez sur **"Create bucket"**

### 2. Configurer les politiques de sécurité

1. Allez sur **Supabase → Storage → Policies**
2. Cliquez sur le bucket **"blog"**
3. Cliquez sur **"New Policy"** ou utilisez le script SQL ci-dessous

**OU** exécutez le script SQL :

1. Allez sur **Supabase → SQL Editor**
2. Copiez-collez le contenu de `supabase-storage-policies.sql`
3. Cliquez sur **"Run"**

### 3. Vérifier les politiques

1. Allez sur **Storage → Policies**
2. Vérifiez que les politiques suivantes existent pour le bucket `blog` :
   - ✅ "Authenticated users can upload images" (INSERT)
   - ✅ "Authenticated users can read images" (SELECT)
   - ✅ "Authenticated users can delete their images" (DELETE) - optionnel
   - ✅ "Authenticated users can update their images" (UPDATE) - optionnel

## 🔒 Politiques Créées

### INSERT (Upload)
- **Qui** : Utilisateurs authentifiés uniquement
- **Action** : Peuvent uploader des fichiers dans `blog/`

### SELECT (Lecture)
- **Qui** : Utilisateurs authentifiés uniquement
- **Action** : Peuvent lire les fichiers du bucket `blog`

### DELETE (Suppression)
- **Qui** : Utilisateurs authentifiés uniquement
- **Action** : Peuvent supprimer leurs fichiers

### UPDATE (Mise à jour)
- **Qui** : Utilisateurs authentifiés uniquement
- **Action** : Peuvent mettre à jour leurs fichiers

## ✅ Vérification

Après configuration :

1. **Connectez-vous** à `/login`
2. Allez dans **Admin → Blog**
3. Essayez d'**uploader une image**
4. L'image devrait s'uploader avec succès
5. L'URL devrait apparaître automatiquement dans le champ
6. L'URL devrait être sauvegardée lors de la création/modification de l'article

## 🐛 Dépannage

### Erreur "new row violates row-level security policy"

- Vérifiez que les politiques sont bien créées
- Vérifiez que vous êtes bien connecté (session active)
- Vérifiez que le bucket `blog` existe

### Erreur "Bucket not found"

- Créez le bucket `blog` dans Supabase Storage
- Vérifiez que le nom est exactement `blog` (minuscules)

### Erreur "Permission denied"

- Vérifiez que vous êtes connecté
- Vérifiez que les politiques sont activées
- Vérifiez que le bucket est public (pour la lecture)

## 📝 Notes

- Les images uploadées sont accessibles publiquement (bucket public)
- Seuls les utilisateurs authentifiés peuvent uploader
- L'URL est automatiquement sauvegardée dans `featured_image`
