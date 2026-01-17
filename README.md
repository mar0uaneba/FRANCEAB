# France Abonnement IPTV - Plateforme SaaS Ultra-Rapide

Plateforme IPTV SaaS moderne avec Next.js 14, TypeScript, Tailwind CSS et Supabase.

## 🚀 Fonctionnalités

- **Landing Page Premium** : Design Apple-style avec animations Framer Motion
- **Système de Paiement Hybride** : PayPal direct + Formulaire de contact
- **Dashboard Admin** : Gestion des packs, témoignages et prospects
- **SEO Optimisé** : Sitemap, robots.txt, meta tags optimisés
- **Social Proof** : Bento Grid avec screenshots clients
- **FAQ Interactive** : Accordéon animé
- **Performance** : Optimisé pour PageSpeed 95+

## 🛠 Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Base de données** : Supabase
- **Icons** : Lucide React
- **Forms** : React Hook Form + Zod

## 📦 Installation

1. Installer les dépendances :
```bash
npm install
```

2. Configurer les variables d'environnement :
Créer un fichier `.env.local` :
```
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
NEXT_PUBLIC_TMDB_API_KEY=votre_cle_tmdb (optionnel mais recommandé)
```

**Note pour TMDB** : Pour obtenir une clé API TMDB gratuite :
1. Créez un compte sur [themoviedb.org](https://www.themoviedb.org)
2. Allez dans Settings > API
3. Demandez une clé API (gratuite)
4. Ajoutez-la dans `.env.local`

3. Configurer Supabase :
Créer les tables suivantes dans Supabase :

**Table `packs`** :
- id (uuid, primary key)
- name (text)
- price (numeric)
- duration (integer)
- paypal_link (text, nullable)
- features (text[])
- is_promo (boolean)
- created_at (timestamp)
- updated_at (timestamp)

**Table `testimonials`** :
- id (uuid, primary key)
- image_url (text)
- client_name (text, nullable)
- created_at (timestamp)

**Table `prospects`** :
- id (uuid, primary key)
- name (text)
- email (text)
- phone (text)
- pack_id (uuid, nullable, foreign key to packs)
- created_at (timestamp)

4. Lancer le serveur de développement :
```bash
npm run dev
```

## 🎨 Design

- **Thème** : Dark mode premium (#050505)
- **Accents** : Or (#FFD700) et Bleu électrique (#00D4FF)
- **Animations** : Gradients animés, micro-interactions
- **Responsive** : Mobile-first

## 📈 SEO

- Sitemap.xml généré automatiquement
- Robots.txt configuré
- Meta tags optimisés pour chaque page
- Mots-clés intégrés : "Meilleur abonnement IPTV", "Top abonnement Smart", "Premier abonnement en Europe"

## 🔐 Admin

Accéder au dashboard admin : `/admin`

## 📧 Contact

- Email : admin@franceabonnementiptv.com
- Téléphone : +33 7 56 75 43 04

## 🚀 Déploiement

Le projet est prêt pour le déploiement sur Vercel :

```bash
npm run build
```

## 📝 Notes

- Assurez-vous de configurer correctement Supabase avant le déploiement
- Mettez à jour les URLs dans `sitemap.ts` et `robots.ts` avec votre domaine
- Configurez les liens PayPal dans la table `packs` via le dashboard admin

