-- Table: packs
CREATE TABLE IF NOT EXISTS packs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  duration INTEGER NOT NULL,
  paypal_link TEXT,
  features TEXT[] DEFAULT '{}',
  is_promo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  client_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: prospects
CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  pack_id UUID REFERENCES packs(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_packs_price ON packs(price);
CREATE INDEX IF NOT EXISTS idx_packs_is_promo ON packs(is_promo);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prospects_created_at ON prospects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prospects_pack_id ON prospects(pack_id);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Supprimer le trigger s'il existe déjà, puis le recréer
DROP TRIGGER IF EXISTS update_packs_updated_at ON packs;
CREATE TRIGGER update_packs_updated_at BEFORE UPDATE ON packs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Données d'exemple (optionnel)
INSERT INTO packs (name, price, duration, paypal_link, features, is_promo) VALUES
  ('Pack Mensuel', 15.99, 1, 'https://paypal.me/example/15.99', ARRAY['20 000+ chaînes', 'Qualité 4K', 'Support 24/7', 'VOD illimitée'], FALSE),
  ('Pack Trimestriel', 39.99, 3, 'https://paypal.me/example/39.99', ARRAY['20 000+ chaînes', 'Qualité 4K', 'Support 24/7', 'VOD illimitée', 'Économisez 17%'], FALSE),
  ('Pack Annuel', 99.99, 12, 'https://paypal.me/example/99.99', ARRAY['20 000+ chaînes', 'Qualité 4K', 'Support 24/7', 'VOD illimitée', 'Économisez 50%'], TRUE)
ON CONFLICT DO NOTHING;

