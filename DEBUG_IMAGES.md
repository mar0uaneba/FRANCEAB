# 🔍 Débogage des Images de Blog

## Problème : Les images n'apparaissent pas après l'upload

### Étapes de vérification :

1. **Vérifier dans la console du navigateur (F12)**
   - Ouvrez la console (F12)
   - Uploadez une image
   - Cherchez les logs :
     - `✅ Upload réussi:` - L'upload a fonctionné
     - `🔗 URL publique:` - L'URL de l'image
     - `✅ Image URL sauvegardée dans le state` - L'URL est dans le state
     - `✅ Article créé avec succès:` - L'article est créé
     - `📸 Image featured:` - L'URL de l'image dans l'article

2. **Vérifier dans Supabase**
   - Allez dans Supabase → Table Editor → `blog_articles`
   - Vérifiez que la colonne `featured_image` contient bien l'URL
   - L'URL devrait ressembler à : `https://[votre-projet].supabase.co/storage/v1/object/public/blog/[nom-fichier]`

3. **Vérifier que le bucket existe**
   - Allez dans Supabase → Storage
   - Vérifiez que le bucket `blog` existe
   - Vérifiez que le bucket est **public**
   - Si le bucket n'existe pas, créez-le :
     - Cliquez sur "Create bucket"
     - Nom : `blog`
     - Public : **OUI** (très important !)

4. **Vérifier les permissions du bucket**
   - Allez dans Storage → `blog` → Policies
   - Vérifiez qu'il y a une politique pour permettre la lecture publique :
   ```sql
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'blog');
   ```

5. **Vérifier la configuration Next.js**
   - Le fichier `next.config.js` doit contenir :
   ```js
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: '**.supabase.co',
       },
     ],
   }
   ```

### Si les images ne s'affichent toujours pas :

1. **Vérifier l'URL de l'image**
   - Copiez l'URL depuis Supabase
   - Collez-la dans un nouvel onglet du navigateur
   - Si l'image s'affiche → Le problème vient de Next.js Image
   - Si l'image ne s'affiche pas → Le problème vient de Supabase Storage

2. **Vérifier les logs dans la console**
   - Cherchez les erreurs `❌ Erreur chargement image:`
   - Vérifiez l'URL qui est affichée
   - Testez cette URL directement

3. **Solution temporaire : Utiliser une URL directe**
   - Si l'upload ne fonctionne pas, vous pouvez :
   - Uploadez l'image manuellement dans Supabase Storage
   - Copiez l'URL publique
   - Collez-la dans le champ "Ou entrer une URL d'image"

### Commandes utiles :

Pour vérifier les articles dans Supabase :
```sql
SELECT id, title, featured_image, created_at 
FROM blog_articles 
ORDER BY created_at DESC 
LIMIT 5;
```
