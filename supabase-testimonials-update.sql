-- Ajouter une colonne pour stocker les conversations/messages des clients
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS conversation TEXT,
ADD COLUMN IF NOT EXISTS message TEXT,
ADD COLUMN IF NOT EXISTS platform TEXT DEFAULT 'WhatsApp';

-- Mettre à jour les types si nécessaire
COMMENT ON COLUMN testimonials.conversation IS 'Conversation complète du client (peut contenir plusieurs messages)';
COMMENT ON COLUMN testimonials.message IS 'Message principal du témoignage';
COMMENT ON COLUMN testimonials.platform IS 'Plateforme de la conversation (WhatsApp, Telegram, etc.)';

