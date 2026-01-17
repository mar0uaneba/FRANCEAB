# 📸 Configuration Complète - Upload d'Images avec Authentification

## ✅ Ce qui a été fait

1. **Vérification de session** : L'upload vérifie maintenant que vous êtes connecté
2. **Utilisation de la session authentifiée** : Le client Supabase utilise automatiquement votre session
3. **Sauvegarde automatique** : L'URL est automatiquement remplie dans `featured_image`
4. **Logs de débogage** : Logs détaillés pour tracer chaque étape

## 🔧 Configuration Requise

### 1. Créer le bucket 'blog' dans Supabase

1. Allez sur **Supabase → Storage**
2. Cliquez sur **"Create bucket"**
3. Remplissez :
   - **Name** : `blog`
   - **Public bucket** : ✅ **OUI** (pour que les images soient accessibles)
4. Cliquez sur **"Create bucket"**

### 2. Configurer les politiques de sécurité

**Option A : Via l'interface Supabase**

1. Allez sur **Storage → Policies**
2. Cliquez sur le bucket **"blog"**
3. Cliquez sur **"New Policy"**
4. Créez ces politiques :

**Politique 1 : Upload (INSERT)**
- **Policy name** : `Authenticated users can upload images`
- **Allowed operation** : `INSERT`
- **Target roles** : `authenticated`
- **USING expression** : `bucket_id = 'blog'`
- **WITH CHECK expression** : `bucket_id = 'blog'`

**Politique 2 : Lecture (SELECT)**
- **Policy name** : `Authenticated users can read images`
- **Allowed operation** : `SELECT`
- **Target roles** : `authenticated`
- **USING expression** : `bucket_id = 'blog'`

**Option B : Via SQL (Recommandé)**

1. Allez sur **Supabase → SQL Editor**
2. Copiez-collez le contenu de `supabase-storage-policies.sql`
3. Cliquez sur **"Run"**

### 3. Vérifier la configuration

1. **Connectez-vous** à `/login`
2. Allez dans **Admin → Blog**
3. Créez ou modifiez un article
4. Uploadez une image
5. Vérifiez dans la console (F12) :
   - `✅ Session authentifiée:` - Votre session est active
   - `✅ Upload réussi:` - L'upload fonctionne
   - `🔗 URL publique:` - L'URL est générée
   - `💾 Cette URL sera automatiquement sauvegardée` - Confirmation

## 🔄 Flux Complet

1. **Connexion** → `/login`
   - Vous vous connectez avec email/password
   - Une session Supabase est créée

2. **Accès Admin** → `/admin`
   - La session est vérifiée
   - Si non connecté → Redirection vers `/login`

3. **Upload d'Image** → Admin → Blog → Upload
   - La session est vérifiée avant l'upload
   - L'image est uploadée dans `blog/` avec votre session
   - L'URL publique est générée
   - L'URL est automatiquement remplie dans le champ `featured_image`

4. **Sauvegarde de l'Article**
   - Quand vous cliquez sur "Créer" ou "Enregistrer"
   - L'URL de `featured_image` est sauvegardée dans la base de données
   - L'article est créé/modifié avec l'image

## 🐛 Dépannage

### Erreur "new row violates row-level security policy"

**Solution :**
1. Vérifiez que les politiques sont créées (voir étape 2)
2. Vérifiez que vous êtes connecté (session active)
3. Vérifiez que le bucket `blog` existe

### Erreur "Bucket not found"

**Solution :**
1. Créez le bucket `blog` dans Supabase Storage
2. Vérifiez que le nom est exactement `blog` (minuscules)

### Erreur "Permission denied"

**Solution :**
1. Vérifiez que vous êtes connecté (allez sur `/login`)
2. Vérifiez que les politiques sont activées
3. Vérifiez que le bucket est public (pour la lecture)

### L'URL n'est pas sauvegardée

**Solution :**
1. Vérifiez dans la console que l'URL est bien générée
2. Vérifiez que le champ "Ou entrer une URL d'image" contient l'URL
3. Si l'URL n'est pas dans le champ, copiez-la manuellement
4. Cliquez sur "Créer" ou "Enregistrer"

## ✅ Checklist de Vérification

- [ ] Bucket `blog` créé dans Supabase Storage
- [ ] Bucket `blog` est public
- [ ] Politiques de sécurité créées (INSERT, SELECT)
- [ ] Vous êtes connecté à `/login`
- [ ] Session active vérifiée (console F12)
- [ ] Upload fonctionne
- [ ] URL générée et visible dans le champ
- [ ] URL sauvegardée lors de la création/modification de l'article

## 📝 Notes Importantes

- **Session** : Le client Supabase utilise automatiquement votre session authentifiée
- **Politiques** : Seuls les utilisateurs authentifiés peuvent uploader
- **URL** : L'URL est automatiquement remplie mais doit être sauvegardée lors de la création/modification
- **Sécurité** : Les images sont accessibles publiquement (bucket public) mais seul l'upload est restreint
