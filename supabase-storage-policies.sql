-- ============================================
-- Politiques de sécurité pour le bucket 'blog'
-- ============================================
-- Ces politiques permettent aux utilisateurs authentifiés d'uploader des images
-- ============================================

-- 1. Politique pour permettre l'upload aux utilisateurs authentifiés
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog' AND
  auth.role() = 'authenticated'
);

-- 2. Politique pour permettre la lecture aux utilisateurs authentifiés
CREATE POLICY "Authenticated users can read images"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'blog' AND
  auth.role() = 'authenticated'
);

-- 3. Politique pour permettre la suppression aux utilisateurs authentifiés (optionnel)
CREATE POLICY "Authenticated users can delete their images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'blog' AND
  auth.role() = 'authenticated'
);

-- 4. Politique pour permettre la mise à jour aux utilisateurs authentifiés (optionnel)
CREATE POLICY "Authenticated users can update their images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'blog' AND
  auth.role() = 'authenticated'
);

-- ============================================
-- Vérification
-- ============================================
-- Pour vérifier que les politiques sont créées :
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%blog%';
