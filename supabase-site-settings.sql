-- ============================================
-- Table pour stocker les paramètres du site
-- ============================================
-- Cette table permet de stocker des configurations dynamiques du site
-- ============================================

-- Créer la table site_settings si elle n'existe pas
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Créer un index sur la clé pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

-- Insérer le paramètre par défaut pour l'annonce d'urgence
INSERT INTO site_settings (key, value, description)
VALUES (
  'urgency_bar_text',
  'OFFRE LIMITÉE: -50% abonnement 12 mois - 7 places restantes',
  'Texte affiché dans la barre d''annonce en haut de la page'
)
ON CONFLICT (key) DO NOTHING;

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger pour updated_at
DROP TRIGGER IF EXISTS trigger_update_site_settings_updated_at ON site_settings;
CREATE TRIGGER trigger_update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_site_settings_updated_at();

-- Activer RLS (Row Level Security) - optionnel, selon vos besoins
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique
CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT USING (true);

-- Politique pour permettre l'écriture aux utilisateurs authentifiés (admin uniquement via Service Role)
-- Note: Les opérations d'écriture seront faites via l'API avec Service Role Key
