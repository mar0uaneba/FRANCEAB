-- ============================================
-- Ajouter le pack "TEST IPTV 48H" dans Supabase
-- ============================================
-- Ce pack permet aux utilisateurs de tester le service pendant 48 heures
-- ============================================

-- Supprimer le pack TEST IPTV 48H s'il existe déjà
DELETE FROM packs WHERE name = 'TEST IPTV 48H';

-- Insérer le pack TEST IPTV 48H
INSERT INTO packs (name, price, duration, paypal_link, features, is_promo, display_order)
VALUES (
  'TEST IPTV 48H',
  2.99,  -- Prix 2,99€
  2,  -- 2 JOURS (48 heures) - PAS 2 MOIS
  NULL,  -- Pas de lien PayPal par défaut (vous pouvez en ajouter un plus tard)
  ARRAY[
    'Accès complet à tous les chaînes',
    'Qualité 4K Ultra HD',
    'Support 24/7',
    'Test gratuit 48 heures'
  ],
  true,  -- Marqué comme promo
  0  -- Premier dans l'ordre d'affichage
);

-- Vérifier que le pack a été créé
SELECT id, name, price, duration FROM packs WHERE name = 'TEST IPTV 48H';
