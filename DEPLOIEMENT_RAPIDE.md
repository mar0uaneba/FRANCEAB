# ⚡ Déployer le site en 3 étapes

## 🎯 Pour voir votre site en ligne

Le code est sur GitHub, mais **il faut le déployer** pour le voir en ligne.

---

## 🚀 Méthode la plus simple : Vercel (GRATUIT)

### Étape 1 : Aller sur Vercel
👉 **https://vercel.com**

### Étape 2 : Se connecter avec GitHub
- Cliquez sur **"Sign Up"**
- Choisissez **"Continue with GitHub"**
- Autorisez Vercel

### Étape 3 : Importer votre projet
- Cliquez sur **"Add New..."** → **"Project"**
- Trouvez **`FRANCEAB`** dans la liste
- Cliquez sur **"Import"**

### Étape 4 : Ajouter les variables d'environnement
Avant de déployer, ajoutez ces variables dans Vercel :

1. **`NEXT_PUBLIC_SUPABASE_URL`** = votre URL Supabase
2. **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** = votre clé Supabase
3. **`SUPABASE_SERVICE_ROLE_KEY`** = votre service role key
4. **`RESEND_API_KEY`** = votre clé Resend (si vous l'utilisez)

**Où les trouver :**
- Supabase : Dashboard → Settings → API
- Resend : https://resend.com/api-keys

### Étape 5 : Déployer !
- Cliquez sur **"Deploy"**
- Attendez 2-3 minutes
- ✅ **Votre site sera en ligne !**

---

## 🔗 Lien de votre site

Après le déploiement, vous recevrez un lien comme :
- **`https://franceab.vercel.app`**

Vous pourrez ensuite :
- Visiter votre site en ligne
- Partager le lien avec vos clients
- Configurer un domaine personnalisé

---

## 📝 Variables d'environnement nécessaires

Copiez ces variables depuis votre fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
RESEND_API_KEY=re_xxx... (optionnel)
NEXT_PUBLIC_TMDB_API_KEY=xxx... (optionnel)
```

---

## ✅ C'est tout !

**Après le déploiement**, votre site sera accessible publiquement sur Internet ! 🌐

Voir `DEPLOIEMENT_VERCEL.md` pour le guide complet avec troubleshooting.
