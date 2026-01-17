# 🚀 Déployer le site sur Vercel (GRATUIT)

## ⚡ Méthode ultra-rapide (5 minutes)

### Étape 1 : Créer un compte Vercel
1. Allez sur **https://vercel.com**
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"**
4. Autorisez Vercel à accéder à votre compte GitHub (`mar0uaneba`)

### Étape 2 : Importer le projet
1. Dans le dashboard Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Vous verrez votre dépôt **`FRANCEAB`** dans la liste
3. Cliquez sur **"Import"** à côté de `mar0uaneba/FRANCEAB`

### Étape 3 : Configurer les variables d'environnement
**Avant de déployer**, ajoutez vos variables d'environnement :

1. Dans la section **"Environment Variables"**, ajoutez :

```
NEXT_PUBLIC_SUPABASE_URL = votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY = votre_cle_anon
NEXT_PUBLIC_TMDB_API_KEY = votre_cle_tmdb (optionnel)
RESEND_API_KEY = votre_cle_resend (si vous utilisez Resend pour les emails)
SUPABASE_SERVICE_ROLE_KEY = votre_service_role_key (pour l'admin)
```

2. Cliquez sur **"Add"** pour chaque variable

### Étape 4 : Déployer !
1. Cliquez sur le bouton **"Deploy"** en bas de la page
2. Attendez 2-3 minutes que Vercel compile et déploie votre site
3. ✅ **Votre site sera en ligne avec une URL comme : `franceab.vercel.app`**

---

## 🔗 Voir votre site en ligne

Après le déploiement, vous recevrez un lien comme :
- **`https://franceab.vercel.app`** (par défaut)
- **OU** un domaine personnalisé si vous en configurez un

Vous pouvez aussi :
- Voir tous vos déploiements dans le dashboard Vercel
- Obtenir un domaine personnalisé gratuit (ex: `franceabonnementiptv.vercel.app`)

---

## 📋 Où trouver vos variables d'environnement

### Supabase :
1. Allez sur **https://supabase.com/dashboard**
2. Sélectionnez votre projet
3. **Settings** → **API**
4. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### TMDB (optionnel) :
1. Allez sur **https://www.themoviedb.org/settings/api**
2. Demandez une clé API (gratuite)
3. Copiez la clé → `NEXT_PUBLIC_TMDB_API_KEY`

### Resend (pour les emails) :
1. Allez sur **https://resend.com/api-keys**
2. Créez une clé API
3. Copiez la clé → `RESEND_API_KEY`

---

## ✅ Après le déploiement

### Vérifier que tout fonctionne :
1. ✅ Visitez votre URL Vercel
2. ✅ Testez la page d'accueil
3. ✅ Testez le formulaire de contact
4. ✅ Testez la page admin (`/admin`)
5. ✅ Vérifiez que les images se chargent

### Mises à jour automatiques :
**Chaque fois que vous poussez du code sur GitHub**, Vercel redéploiera automatiquement votre site ! 🎉

---

## 🆘 Problèmes courants

### Erreur : "Environment Variable Missing"
→ Vérifiez que toutes les variables sont bien ajoutées dans Vercel

### Erreur : "Build Failed"
→ Vérifiez les logs de build dans Vercel pour voir l'erreur exacte

### Les images ne se chargent pas
→ Vérifiez que les buckets Supabase Storage sont bien configurés

### L'admin ne fonctionne pas
→ Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est bien ajoutée

---

## 🔒 Domaine personnalisé (optionnel)

### Ajouter un domaine personnalisé :
1. Dans Vercel, allez dans **Settings** → **Domains**
2. Ajoutez votre domaine (ex: `franceabonnementiptv.com`)
3. Suivez les instructions pour configurer le DNS

---

## 📊 Monitoring

Vercel fournit gratuitement :
- ✅ Analytics de performance
- ✅ Logs en temps réel
- ✅ Détection des erreurs
- ✅ Statistiques de déploiement

---

## 🎯 Résumé ultra-rapide

1. **https://vercel.com** → Sign Up avec GitHub
2. **Import** le projet `FRANCEAB`
3. **Ajouter** les variables d'environnement
4. **Deploy** → ✅ Site en ligne !

**Votre site sera accessible publiquement en quelques minutes !** 🚀
