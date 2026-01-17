-- ============================================
-- Script SQL pour ajouter l'ordre d'affichage des packs
-- ============================================
-- Copiez-collez TOUT ce contenu dans Supabase SQL Editor
-- ============================================

-- 1. Ajouter le champ display_order à la table packs
ALTER TABLE packs ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- 2. Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_packs_display_order ON packs(display_order);

-- 3. Initialiser les valeurs de display_order pour les packs existants
-- Basé sur le prix (ordre croissant)
UPDATE packs 
SET display_order = subquery.row_number
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY price ASC) as row_number
  FROM packs
) AS subquery
WHERE packs.id = subquery.id;

-- 4. Si display_order est NULL, le mettre à 0
UPDATE packs SET display_order = 0 WHERE display_order IS NULL;

-- ============================================
-- Vérification (optionnel - pour voir le résultat)
-- ============================================
-- SELECT id, name, price, display_order FROM packs ORDER BY display_order;
