# Guide de Configuration - France Abonnement IPTV

## 📋 Prérequis

- Node.js 18+ installé
- Compte Supabase créé
- Compte Vercel (pour le déploiement)

## 🚀 Installation Rapide

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration Supabase

#### Étape 1 : Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre URL de projet et votre clé anonyme

#### Étape 2 : Créer les tables

Exécutez le script SQL fourni dans `supabase-schema.sql` dans l'éditeur SQL de Supabase :

1. Allez dans votre projet Supabase
2. Cliquez sur "SQL Editor"
3. Copiez-collez le contenu de `supabase-schema.sql`
4. Exécutez le script

#### Étape 3 : Configurer le stockage (pour les témoignages)

1. Allez dans "Storage" dans Supabase
2. Créez un bucket nommé `testimonials`
3. Configurez les politiques pour permettre les uploads publics (ou privés selon vos besoins)

### 3. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
```

### 4. Lancer le projet en développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🎨 Personnalisation

### Modifier les couleurs

Éditez `tailwind.config.ts` pour personnaliser les couleurs du thème.

### Modifier les textes SEO

Les textes SEO sont dans :
- `app/layout.tsx` - Meta tags globaux
- `app/page.tsx` - Meta tags de la page d'accueil
- `app/about/page.tsx` - Meta tags de la page À Propos
- `app/contact/page.tsx` - Meta tags de la page Contact

### Modifier les informations de contact

Les informations de contact sont dans :
- `components/Footer.tsx`
- `app/contact/page.tsx`

## 📦 Gestion des Packs

### Ajouter un pack via Supabase

1. Connectez-vous à Supabase
2. Allez dans "Table Editor" > `packs`
3. Cliquez sur "Insert" > "Insert row"
4. Remplissez les champs :
   - `name` : Nom du pack (ex: "Pack Mensuel")
   - `price` : Prix (ex: 15.99)
   - `duration` : Durée en mois (ex: 1)
   - `paypal_link` : Lien PayPal (ex: https://paypal.me/votrecompte/15.99)
   - `features` : Tableau de fonctionnalités (ex: ["20 000+ chaînes", "Qualité 4K"])
   - `is_promo` : true/false pour les packs promotionnels

### Modifier un pack via l'admin

1. Accédez à `/admin`
2. Cliquez sur "Modifier" sur le pack souhaité
3. Modifiez les informations
4. Sauvegardez

## 🖼️ Gestion des Témoignages

### Ajouter un témoignage via Supabase

1. Uploadez l'image dans le bucket `testimonials` de Supabase Storage
2. Copiez l'URL publique de l'image
3. Allez dans "Table Editor" > `testimonials`
4. Insérez une nouvelle ligne avec :
   - `image_url` : URL de l'image
   - `client_name` : Nom du client (optionnel)

### Ajouter un témoignage via l'admin

1. Accédez à `/admin` > Onglet "Témoignages"
2. Cliquez sur "Ajouter un témoignage"
3. Uploadez l'image et remplissez les informations

## 🔐 Sécurité Admin

Pour sécuriser la page admin, vous pouvez :

1. Ajouter une authentification Supabase
2. Utiliser des Row Level Security (RLS) dans Supabase
3. Créer une route API protégée

## 🚀 Déploiement sur Vercel

1. Poussez votre code sur GitHub
2. Connectez votre repo à Vercel
3. Ajoutez les variables d'environnement dans Vercel :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Déployez !

## 📈 Optimisations SEO

### Mettre à jour les URLs

1. Éditez `app/sitemap.ts` et remplacez l'URL de base
2. Éditez `app/robots.ts` et remplacez l'URL du sitemap
3. Éditez `app/metadata.ts` et remplacez `metadataBase`

### Vérifier le SEO

- Utilisez Google Search Console
- Testez avec Google PageSpeed Insights
- Vérifiez les meta tags avec un outil comme [metatags.io](https://metatags.io)

## 🐛 Dépannage

### Erreur de connexion Supabase

- Vérifiez que les variables d'environnement sont correctement définies
- Vérifiez que votre projet Supabase est actif
- Vérifiez les permissions RLS dans Supabase

### Images ne s'affichent pas

- Vérifiez que le bucket Supabase Storage est configuré correctement
- Vérifiez les politiques de sécurité du bucket
- Vérifiez que les URLs d'images sont accessibles publiquement

### Erreurs de build

- Vérifiez que toutes les dépendances sont installées : `npm install`
- Vérifiez que TypeScript n'a pas d'erreurs : `npm run lint`
- Vérifiez les logs de build pour plus de détails

## 📞 Support

Pour toute question :
- Email : admin@franceabonnementiptv.com
- Téléphone : +33 7 56 75 43 04


