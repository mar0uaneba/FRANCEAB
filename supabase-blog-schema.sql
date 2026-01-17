-- Table: blog_articles
CREATE TABLE IF NOT EXISTS blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  author TEXT DEFAULT 'France Abonnement IPTV',
  published BOOLEAN DEFAULT TRUE,
  seo_keywords TEXT[] DEFAULT '{}',
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published ON blog_articles(published);
CREATE INDEX IF NOT EXISTS idx_blog_articles_created_at ON blog_articles(created_at DESC);

-- Trigger pour mettre à jour updated_at automatiquement
DROP TRIGGER IF EXISTS update_blog_articles_updated_at ON blog_articles;
CREATE TRIGGER update_blog_articles_updated_at BEFORE UPDATE ON blog_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Articles initiaux SEO optimisés
INSERT INTO blog_articles (title, slug, excerpt, content, seo_keywords, seo_description, published) VALUES
(
  'Comment Utiliser IPTV : Guide Complet France Abonnement IPTV 2025',
  'comment-utiliser-iptv-guide-complet-france',
  'Découvrez comment utiliser IPTV en France avec notre guide complet. Apprenez à configurer votre abonnement IPTV, installer les applications et profiter de milliers de chaînes en qualité 4K.',
  '<h2>Introduction : Qu''est-ce que l''IPTV ?</h2>
<p>L''<strong>IPTV (Internet Protocol Television)</strong> révolutionne la façon dont nous regardons la télévision en France. Avec <strong>France Abonnement IPTV</strong>, accédez à plus de 20 000 chaînes en qualité 4K depuis votre Smart TV, smartphone, tablette ou ordinateur.</p>

<h2>Pourquoi Choisir France Abonnement IPTV ?</h2>
<p><strong>France Abonnement IPTV</strong> est le <strong>meilleur abonnement IPTV en France</strong> et le <strong>premier abonnement en Europe</strong>. Notre service offre :</p>
<ul>
<li>✅ Plus de 20 000 chaînes internationales</li>
<li>✅ Qualité 4K Ultra HD sans coupure</li>
<li>✅ Support 24/7 en français</li>
<li>✅ VOD illimitée (films et séries)</li>
<li>✅ Compatible avec tous les appareils</li>
</ul>

<h2>Comment Installer IPTV sur Votre Appareil</h2>

<h3>1. Sur Smart TV (Android TV, Samsung, LG)</h3>
<p>Pour utiliser <strong>France Abonnement IPTV</strong> sur votre Smart TV :</p>
<ol>
<li>Téléchargez l''application IPTV depuis le store de votre TV</li>
<li>Ouvrez l''application et entrez vos identifiants</li>
<li>Profitez de vos chaînes préférées en 4K</li>
</ol>

<h3>2. Sur Smartphone et Tablette</h3>
<p>L''<strong>abonnement IPTV France</strong> fonctionne parfaitement sur mobile :</p>
<ol>
<li>Installez une application IPTV (IPTV Smarters, TiviMate, etc.)</li>
<li>Configurez avec vos identifiants <strong>France Abonnement IPTV</strong></li>
<li>Regardez vos chaînes partout, même en déplacement</li>
</ol>

<h3>3. Sur Ordinateur (Windows, Mac, Linux)</h3>
<p>Pour utiliser l''<strong>abonnement annuel IPTV</strong> sur PC :</p>
<ol>
<li>Téléchargez VLC Media Player ou une application IPTV dédiée</li>
<li>Ajoutez votre playlist M3U</li>
<li>Profitez de la meilleure qualité sur grand écran</li>
</ol>

<h2>Configuration de Votre Abonnement IPTV</h2>
<p>Une fois votre <strong>abonnement IPTV</strong> activé :</p>
<ol>
<li>Vous recevez vos identifiants par email</li>
<li>Configurez votre application avec l''URL du serveur</li>
<li>Accédez instantanément à toutes vos chaînes</li>
</ol>

<h2>Astuces pour Optimiser Votre Expérience IPTV</h2>
<ul>
<li>💡 Utilisez une connexion internet stable (minimum 10 Mbps pour la 4K)</li>
<li>💡 Privilégiez une connexion filaire (Ethernet) pour la meilleure qualité</li>
<li>💡 Mettez à jour régulièrement votre application IPTV</li>
<li>💡 Utilisez un VPN si nécessaire pour certaines chaînes</li>
</ul>

<h2>Conclusion : Le Meilleur Abonnement IPTV en France</h2>
<p><strong>France Abonnement IPTV</strong> est le <strong>top abonnement Smart</strong> du marché français. Avec notre <strong>abonnement annuel IPTV</strong>, économisez jusqu''à 50% et profitez d''un service premium toute l''année.</p>

<p><strong>Prêt à commencer ?</strong> <a href="/#pricing">Choisissez votre abonnement IPTV maintenant</a> et rejoignez des milliers de clients satisfaits en France et en Europe.</p>',
  ARRAY['France Abonnement IPTV', 'comment utiliser IPTV', 'abonnement IPTV France', 'meilleur abonnement IPTV', 'premier abonnement Europe', 'abonnement annuel IPTV', 'top abonnement Smart', 'guide IPTV France'],
  'Guide complet pour utiliser IPTV en France. Découvrez comment installer et configurer votre abonnement IPTV avec France Abonnement IPTV, le meilleur service IPTV en Europe.',
  TRUE
),
(
  'Les Avantages de l''IPTV : Pourquoi Choisir France Abonnement IPTV ?',
  'avantages-iptv-pourquoi-choisir-france-abonnement',
  'Découvrez tous les avantages de l''IPTV avec France Abonnement IPTV. Qualité 4K, milliers de chaînes, économies et flexibilité. Le meilleur abonnement IPTV en France.',
  '<h2>Introduction : Pourquoi l''IPTV est l''Avenir de la Télévision</h2>
<p>L''<strong>IPTV</strong> transforme votre façon de regarder la télévision. Avec <strong>France Abonnement IPTV</strong>, découvrez pourquoi nous sommes le <strong>meilleur abonnement IPTV en France</strong> et le <strong>premier abonnement en Europe</strong>.</p>

<h2>Les 10 Avantages Majeurs de l''IPTV</h2>

<h3>1. Qualité 4K Ultra HD Sans Compromis</h3>
<p><strong>France Abonnement IPTV</strong> offre une qualité d''image exceptionnelle en 4K. Contrairement aux services traditionnels, notre <strong>abonnement IPTV</strong> garantit une stabilité parfaite sans coupure, même pendant les événements en direct.</p>

<h3>2. Plus de 20 000 Chaînes Internationales</h3>
<p>Accédez à un catalogue impressionnant :</p>
<ul>
<li>📺 Chaînes françaises (TF1, France 2, M6, Canal+, etc.)</li>
<li>📺 Chaînes internationales (BBC, CNN, ESPN, etc.)</li>
<li>📺 Chaînes sportives (beIN Sports, RMC Sport, etc.)</li>
<li>📺 Chaînes cinéma et séries premium</li>
</ul>

<h3>3. Économies Substantielles</h3>
<p>Avec notre <strong>abonnement annuel IPTV</strong>, économisez jusqu''à 50% par rapport aux abonnements traditionnels. Le <strong>top abonnement Smart</strong> à prix compétitif.</p>

<h3>4. VOD Illimitée (Films et Séries)</h3>
<p>Profitez d''une bibliothèque de films et séries en illimité. Regardez vos contenus préférés quand vous voulez, sans publicité.</p>

<h3>5. Compatibilité Totale</h3>
<p>Votre <strong>abonnement IPTV France</strong> fonctionne sur :</p>
<ul>
<li>📱 Smartphones et tablettes (iOS, Android)</li>
<li>📺 Smart TV (Samsung, LG, Android TV)</li>
<li>💻 Ordinateurs (Windows, Mac, Linux)</li>
<li>🎮 Box Android (NVIDIA Shield, Fire TV, etc.)</li>
</ul>

<h3>6. Support 24/7 en Français</h3>
<p>Notre équipe est disponible 24h/24 et 7j/7 pour vous aider. Un support réactif et professionnel pour votre <strong>abonnement IPTV</strong>.</p>

<h3>7. Installation Simple et Rapide</h3>
<p>Contrairement aux installations complexes, <strong>France Abonnement IPTV</strong> se configure en quelques minutes. Pas besoin d''être un expert technique !</p>

<h3>8. Pas d''Engagement Long Terme</h3>
<p>Avec notre <strong>abonnement IPTV</strong>, choisissez la durée qui vous convient : mensuel, trimestriel ou <strong>abonnement annuel IPTV</strong> avec réduction.</p>

<h3>9. Mises à Jour Automatiques</h3>
<p>Votre <strong>abonnement IPTV France</strong> se met à jour automatiquement. Nouveaux contenus, nouvelles chaînes, toujours à jour.</p>

<h3>10. Flexibilité Totale</h3>
<p>Regardez vos chaînes où vous voulez, quand vous voulez. L''<strong>abonnement IPTV</strong> s''adapte à votre mode de vie.</p>

<h2>France Abonnement IPTV vs Services Traditionnels</h2>
<table>
<tr>
<th>Caractéristique</th>
<th>France Abonnement IPTV</th>
<th>Services Traditionnels</th>
</tr>
<tr>
<td>Nombre de chaînes</td>
<td>20 000+</td>
<td>100-200</td>
</tr>
<tr>
<td>Qualité</td>
<td>4K Ultra HD</td>
<td>HD/Full HD</td>
</tr>
<tr>
<td>Prix mensuel</td>
<td>À partir de 15,99€</td>
<td>30-50€</td>
</tr>
<tr>
<td>VOD</td>
<td>Illimitée</td>
<td>Limitée</td>
</tr>
<tr>
<td>Installation</td>
<td>Simple (5 min)</td>
<td>Complexe</td>
</tr>
</table>

<h2>Pourquoi France Abonnement IPTV est le Meilleur Choix ?</h2>
<p><strong>France Abonnement IPTV</strong> est reconnu comme le <strong>meilleur abonnement IPTV en France</strong> et le <strong>premier abonnement en Europe</strong> grâce à :</p>
<ul>
<li>🏆 Stabilité exceptionnelle (99,9% de disponibilité)</li>
<li>🏆 Qualité 4K sans interruption</li>
<li>🏆 Support client réactif</li>
<li>🏆 Prix compétitifs</li>
<li>🏆 Satisfaction client élevée</li>
</ul>

<h2>Conclusion : Rejoignez France Abonnement IPTV</h2>
<p>Les avantages de l''IPTV sont nombreux, et <strong>France Abonnement IPTV</strong> vous offre le <strong>top abonnement Smart</strong> du marché. Que vous choisissiez un <strong>abonnement mensuel</strong> ou un <strong>abonnement annuel IPTV</strong>, vous bénéficiez toujours du meilleur service.</p>

<p><strong>Prêt à profiter de tous ces avantages ?</strong> <a href="/#pricing">Découvrez nos offres d''abonnement IPTV</a> et rejoignez la communauté France Abonnement IPTV dès aujourd''hui !</p>',
  ARRAY['avantages IPTV', 'France Abonnement IPTV', 'meilleur abonnement IPTV', 'abonnement IPTV France', 'premier abonnement Europe', 'abonnement annuel IPTV', 'top abonnement Smart', 'pourquoi choisir IPTV'],
  'Découvrez tous les avantages de l''IPTV avec France Abonnement IPTV. Qualité 4K, économies, flexibilité. Le meilleur abonnement IPTV en France et en Europe.',
  TRUE
),
(
  'Meilleur Abonnement IPTV France 2025 : Comparatif et Guide d''Achat',
  'meilleur-abonnement-iptv-france-2025-comparatif',
  'Trouvez le meilleur abonnement IPTV en France en 2025. Comparatif complet des services IPTV, prix, qualité et fonctionnalités. France Abonnement IPTV : premier choix en Europe.',
  '<h2>Introduction : Comment Choisir le Meilleur Abonnement IPTV en France ?</h2>
<p>En 2025, choisir le <strong>meilleur abonnement IPTV en France</strong> peut être complexe. Avec <strong>France Abonnement IPTV</strong>, découvrez pourquoi nous sommes le <strong>premier abonnement en Europe</strong> et le <strong>top abonnement Smart</strong> du marché.</p>

<h2>Critères pour Choisir le Meilleur Abonnement IPTV</h2>

<h3>1. Qualité et Stabilité</h3>
<p>Le <strong>meilleur abonnement IPTV</strong> doit offrir :</p>
<ul>
<li>✅ Qualité 4K Ultra HD constante</li>
<li>✅ Stabilité sans coupure (99,9% de disponibilité)</li>
<li>✅ Pas de buffering ni de lag</li>
</ul>
<p><strong>France Abonnement IPTV</strong> excelle dans tous ces domaines, ce qui en fait le <strong>premier abonnement en Europe</strong>.</p>

<h3>2. Nombre de Chaînes</h3>
<p>Un <strong>abonnement IPTV France</strong> de qualité doit proposer :</p>
<ul>
<li>📺 Plus de 20 000 chaînes internationales</li>
<li>📺 Toutes les chaînes françaises premium</li>
<li>📺 Chaînes sportives en direct</li>
<li>📺 Chaînes cinéma et séries</li>
</ul>

<h3>3. Prix et Rapport Qualité/Prix</h3>
<p>Comparatif des prix <strong>abonnement IPTV</strong> :</p>
<ul>
<li>💰 <strong>Abonnement mensuel</strong> : À partir de 15,99€</li>
<li>💰 <strong>Abonnement trimestriel</strong> : Économisez 17%</li>
<li>💰 <strong>Abonnement annuel IPTV</strong> : Économisez jusqu''à 50%</li>
</ul>
<p>Le <strong>top abonnement Smart</strong> à prix compétitif !</p>

<h3>4. Support Client</h3>
<p><strong>France Abonnement IPTV</strong> offre un support 24/7 en français, disponible par email et téléphone. Un service client réactif pour votre <strong>abonnement IPTV</strong>.</p>

<h3>5. Compatibilité Multi-Appareils</h3>
<p>Le <strong>meilleur abonnement IPTV</strong> fonctionne sur tous vos appareils : Smart TV, smartphone, tablette, ordinateur. <strong>France Abonnement IPTV</strong> est compatible avec plus de 1000 applications.</p>

<h2>Pourquoi France Abonnement IPTV est le Meilleur Choix ?</h2>

<h3>🏆 Classé Premier Abonnement en Europe</h3>
<p>Grâce à notre stabilité exceptionnelle et notre qualité 4K, <strong>France Abonnement IPTV</strong> est reconnu comme le <strong>premier abonnement en Europe</strong> par des milliers d''utilisateurs satisfaits.</p>

<h3>🏆 Top Abonnement Smart du Marché</h3>
<p>Notre <strong>abonnement IPTV France</strong> est optimisé pour les Smart TV et appareils intelligents. Une expérience utilisateur fluide et intuitive.</p>

<h3>🏆 Meilleur Rapport Qualité/Prix</h3>
<p>Avec notre <strong>abonnement annuel IPTV</strong>, profitez du meilleur service au meilleur prix. Économisez jusqu''à 50% tout en bénéficiant d''un service premium.</p>

<h2>Comparatif : France Abonnement IPTV vs Concurrents</h2>
<table>
<tr>
<th>Critère</th>
<th>France Abonnement IPTV</th>
<th>Concurrents</th>
</tr>
<tr>
<td>Qualité</td>
<td>4K Ultra HD</td>
<td>HD/Full HD</td>
</tr>
<tr>
<td>Stabilité</td>
<td>99,9%</td>
<td>90-95%</td>
</tr>
<tr>
<td>Chaînes</td>
<td>20 000+</td>
<td>5 000-10 000</td>
</tr>
<tr>
<td>Support</td>
<td>24/7 Français</td>
<td>Limite</td>
</tr>
<tr>
<td>Prix mensuel</td>
<td>À partir de 15,99€</td>
<td>20-30€</td>
</tr>
</table>

<h2>Comment Souscrire au Meilleur Abonnement IPTV ?</h2>
<ol>
<li>Visitez notre <a href="/#pricing">section tarifs</a></li>
<li>Choisissez votre <strong>abonnement IPTV</strong> (mensuel, trimestriel ou <strong>abonnement annuel IPTV</strong>)</li>
<li>Effectuez le paiement sécurisé</li>
<li>Recevez vos identifiants par email</li>
<li>Configurez en 5 minutes et profitez !</li>
</ol>

<h2>Conclusion : Le Meilleur Abonnement IPTV en 2025</h2>
<p><strong>France Abonnement IPTV</strong> est sans conteste le <strong>meilleur abonnement IPTV en France</strong> et le <strong>premier abonnement en Europe</strong>. Avec notre <strong>top abonnement Smart</strong>, bénéficiez de :</p>
<ul>
<li>✅ Qualité 4K exceptionnelle</li>
<li>✅ Plus de 20 000 chaînes</li>
<li>✅ Support 24/7</li>
<li>✅ Prix compétitifs</li>
<li>✅ Satisfaction garantie</li>
</ul>

<p><strong>Ne cherchez plus !</strong> <a href="/#pricing">Choisissez votre abonnement IPTV maintenant</a> et rejoignez la meilleure communauté IPTV de France et d''Europe.</p>',
  ARRAY['meilleur abonnement IPTV', 'France Abonnement IPTV', 'premier abonnement Europe', 'abonnement IPTV France', 'top abonnement Smart', 'abonnement annuel IPTV', 'comparatif IPTV France', 'guide achat IPTV'],
  'Comparatif complet des meilleurs abonnements IPTV en France 2025. Découvrez pourquoi France Abonnement IPTV est le premier choix en Europe.',
  TRUE
),
(
  'IPTV vs Télévision Traditionnelle : Pourquoi Passer à l''IPTV en 2025 ?',
  'iptv-vs-television-traditionnelle-pourquoi-passer-iptv-2025',
  'Découvrez pourquoi l''IPTV remplace la télévision traditionnelle. Comparaison détaillée : prix, qualité, flexibilité. France Abonnement IPTV, le meilleur choix.',
  '<h2>Introduction : La Révolution IPTV en 2025</h2>
<p>En 2025, l''<strong>IPTV</strong> révolutionne la télévision. <strong>France Abonnement IPTV</strong>, le <strong>meilleur abonnement IPTV en France</strong> et le <strong>premier abonnement en Europe</strong>, vous explique pourquoi faire le switch.</p>

<h2>IPTV vs Télévision Traditionnelle : Comparaison Complète</h2>

<h3>1. Prix et Économies</h3>
<p><strong>Télévision Traditionnelle :</strong></p>
<ul>
<li>❌ Abonnement mensuel : 30-50€</li>
<li>❌ Frais d''installation : 50-100€</li>
<li>❌ Engagement 12-24 mois</li>
<li>❌ Frais cachés (location décodeur, etc.)</li>
</ul>

<p><strong>France Abonnement IPTV :</strong></p>
<ul>
<li>✅ <strong>Abonnement mensuel</strong> : À partir de 15,99€</li>
<li>✅ Pas de frais d''installation</li>
<li>✅ Pas d''engagement</li>
<li>✅ <strong>Abonnement annuel IPTV</strong> : Économisez jusqu''à 50%</li>
</ul>

<p><strong>Économie moyenne : 300-600€ par an avec notre <strong>abonnement IPTV</strong> !</p>

<h3>2. Qualité d''Image</h3>
<p><strong>Télévision Traditionnelle :</strong></p>
<ul>
<li>❌ Qualité HD/Full HD limitée</li>
<li>❌ Dépend de la qualité du signal</li>
<li>❌ Coupures fréquentes</li>
</ul>

<p><strong>France Abonnement IPTV :</strong></p>
<ul>
<li>✅ Qualité 4K Ultra HD constante</li>
<li>✅ Stabilité parfaite (99,9% de disponibilité)</li>
<li>✅ Pas de coupure, même en direct</li>
</ul>

<h3>3. Nombre de Chaînes</h3>
<p><strong>Télévision Traditionnelle :</strong></p>
<ul>
<li>❌ 100-200 chaînes maximum</li>
<li>❌ Chaînes supplémentaires payantes</li>
<li>❌ Pas de chaînes internationales</li>
</ul>

<p><strong>France Abonnement IPTV :</strong></p>
<ul>
<li>✅ Plus de 20 000 chaînes internationales</li>
<li>✅ Toutes les chaînes incluses</li>
<li>✅ Chaînes premium sans supplément</li>
</ul>

<h3>4. Flexibilité et Mobilité</h3>
<p><strong>Télévision Traditionnelle :</strong></p>
<ul>
<li>❌ Fixe à la maison</li>
<li>❌ Un seul téléviseur</li>
<li>❌ Pas de mobilité</li>
</ul>

<p><strong>France Abonnement IPTV :</strong></p>
<ul>
<li>✅ Regardez partout (maison, mobile, vacances)</li>
<li>✅ Multi-appareils simultanés</li>
<li>✅ Votre <strong>abonnement IPTV France</strong> vous suit partout</li>
</ul>

<h3>5. VOD et Replay</h3>
<p><strong>Télévision Traditionnelle :</strong></p>
<ul>
<li>❌ Replay limité (7-30 jours)</li>
<li>❌ Pas de VOD illimitée</li>
<li>❌ Contenus payants supplémentaires</li>
</ul>

<p><strong>France Abonnement IPTV :</strong></p>
<ul>
<li>✅ VOD illimitée (films et séries)</li>
<li>✅ Replay étendu</li>
<li>✅ Tous les contenus inclus dans votre <strong>abonnement IPTV</strong></li>
</ul>

<h2>Pourquoi Passer à France Abonnement IPTV en 2025 ?</h2>

<h3>🏆 Le Meilleur Abonnement IPTV en France</h3>
<p><strong>France Abonnement IPTV</strong> est reconnu comme le <strong>meilleur abonnement IPTV en France</strong> grâce à sa stabilité et sa qualité exceptionnelles.</p>

<h3>🏆 Premier Abonnement en Europe</h3>
<p>Notre service est classé <strong>premier abonnement en Europe</strong> par des milliers d''utilisateurs satisfaits. Une réputation méritée !</p>

<h3>🏆 Top Abonnement Smart</h3>
<p>Optimisé pour les Smart TV et appareils intelligents, notre <strong>abonnement IPTV France</strong> offre une expérience utilisateur incomparable.</p>

<h2>Comment Faire la Transition ?</h2>
<ol>
<li><strong>Choisissez votre abonnement</strong> : <a href="/#pricing">Visitez notre section tarifs</a></li>
<li><strong>Optez pour un abonnement annuel IPTV</strong> : Économisez jusqu''à 50%</li>
<li><strong>Configurez en 5 minutes</strong> : Installation simple et rapide</li>
<li><strong>Profitez immédiatement</strong> : Accès instantané à 20 000+ chaînes</li>
</ol>

<h2>Témoignages Clients</h2>
<p>"J''ai économisé plus de 400€ par an en passant à <strong>France Abonnement IPTV</strong>. La qualité est meilleure et j''ai accès à bien plus de chaînes !" - Marie, Paris</p>

<p>"Le <strong>meilleur abonnement IPTV</strong> que j''ai testé. Stable, rapide, et le support est excellent." - Jean, Lyon</p>

<h2>Conclusion : L''Avenir est à l''IPTV</h2>
<p>En 2025, l''<strong>IPTV</strong> est clairement l''avenir de la télévision. <strong>France Abonnement IPTV</strong> vous offre le <strong>top abonnement Smart</strong> avec :</p>
<ul>
<li>✅ Économies substantielles</li>
<li>✅ Qualité 4K supérieure</li>
<li>✅ Flexibilité totale</li>
<li>✅ Plus de 20 000 chaînes</li>
<li>✅ Support 24/7</li>
</ul>

<p><strong>Prêt à faire le switch ?</strong> <a href="/#pricing">Rejoignez France Abonnement IPTV</a> et découvrez pourquoi nous sommes le <strong>premier abonnement en Europe</strong> !</p>',
  ARRAY['IPTV vs télévision', 'France Abonnement IPTV', 'meilleur abonnement IPTV', 'premier abonnement Europe', 'abonnement IPTV France', 'top abonnement Smart', 'passer à IPTV', 'avantages IPTV'],
  'Comparaison IPTV vs télévision traditionnelle. Découvrez pourquoi passer à France Abonnement IPTV, le meilleur abonnement IPTV en France et en Europe.',
  TRUE
)
ON CONFLICT (slug) DO NOTHING;

