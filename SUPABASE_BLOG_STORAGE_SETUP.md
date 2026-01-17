# Configuration Supabase Storage pour les Articles de Blog

## Créer le Bucket "blog" dans Supabase

1. **Allez dans votre dashboard Supabase**
2. **Cliquez sur "Storage" dans le menu de gauche**
3. **Cliquez sur "New bucket"**
4. **Configurez le bucket :**
   - **Name** : `blog`
   - **Public bucket** : ✅ **Activé** (pour que les images soient accessibles publiquement)
   - **File size limit** : 5 MB (ou plus selon vos besoins)
   - **Allowed MIME types** : `image/*` (ou laissez vide pour tous les types)

5. **Cliquez sur "Create bucket"**

## Configuration des Politiques (Policies)

Pour permettre l'upload d'images depuis votre application :

1. **Allez dans "Storage" > "Policies"**
2. **Sélectionnez le bucket "blog"**
3. **Créez une nouvelle policy :**

   **Policy Name** : `Allow authenticated uploads`
   
   **Allowed operation** : `INSERT`
   
   **Policy definition** :
   ```sql
   (bucket_id = 'blog'::text)
   ```

   **Policy target roles** : `authenticated` (ou `anon` si vous voulez permettre les uploads non authentifiés)

4. **Créez une autre policy pour la lecture :**

   **Policy Name** : `Allow public reads`
   
   **Allowed operation** : `SELECT`
   
   **Policy definition** :
   ```sql
   (bucket_id = 'blog'::text)
   ```

   **Policy target roles** : `public`

## Alternative : Utiliser une URL externe

Si vous préférez ne pas utiliser Supabase Storage, vous pouvez :
- Utiliser un service d'hébergement d'images externe (Imgur, Cloudinary, etc.)
- Entrer directement l'URL de l'image dans le champ "Image à la une (URL)"

## Test

Une fois configuré, testez l'upload d'une image depuis l'admin panel :
1. Allez sur `/admin`
2. Cliquez sur l'onglet "Blog"
3. Créez ou modifiez un article
4. Cliquez sur "Choisir une image" et sélectionnez une image
5. Cliquez sur "Uploader"

L'image devrait être uploadée et l'URL devrait s'afficher automatiquement dans le champ "Image à la une".

