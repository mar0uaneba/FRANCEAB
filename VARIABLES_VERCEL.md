# 🔑 Variables d'environnement pour Vercel

## 📋 Liste des variables à ajouter

Dans la section **"Environment Variables"** de Vercel, ajoutez ces variables :

### 1. Variables Supabase (OBLIGATOIRES)

```
NEXT_PUBLIC_SUPABASE_URL
```
**Valeur :** Votre URL Supabase (ex: `https://xxxxxxxxxxxxx.supabase.co`)

```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
**Valeur :** Votre clé anonyme Supabase (commence par `eyJ...`)

```
SUPABASE_SERVICE_ROLE_KEY
```
**Valeur :** Votre service role key Supabase (commence par `eyJ...`)

---

### 2. Variables Email (Si vous utilisez Resend)

```
RESEND_API_KEY
```
**Valeur :** Votre clé API Resend (commence par `re_...`)

---

### 3. Variables TMDB (OPTIONNEL - Pour le background Hero)

```
NEXT_PUBLIC_TMDB_API_KEY
```
**Valeur :** Votre clé API TMDB

---

## 🔍 Où trouver ces valeurs ?

### Supabase :
1. Allez sur **https://supabase.com/dashboard**
2. Sélectionnez votre projet
3. **Settings** → **API**
4. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### Resend :
1. Allez sur **https://resend.com/api-keys**
2. Copiez votre clé API → `RESEND_API_KEY`

### TMDB (si nécessaire) :
1. Allez sur **https://www.themoviedb.org/settings/api**
2. Créez une clé API (gratuite)
3. Copiez la clé → `NEXT_PUBLIC_TMDB_API_KEY`

---

## 📝 Comment les ajouter dans Vercel

1. Dans la section **"Environment Variables"** de Vercel
2. Cliquez sur **"+ Add More"** pour chaque variable
3. Entrez le **Key** (nom de la variable)
4. Entrez la **Value** (la valeur)
5. Répétez pour chaque variable

### Variables par ordre d'importance :

1. ✅ **NEXT_PUBLIC_SUPABASE_URL** (OBLIGATOIRE)
2. ✅ **NEXT_PUBLIC_SUPABASE_ANON_KEY** (OBLIGATOIRE)
3. ✅ **SUPABASE_SERVICE_ROLE_KEY** (OBLIGATOIRE pour l'admin)
4. ⚠️ **RESEND_API_KEY** (Si vous utilisez les emails)
5. ⚠️ **NEXT_PUBLIC_TMDB_API_KEY** (Optionnel - pour le Hero background)

---

## ✅ Après avoir ajouté les variables

1. Cliquez sur **"Deploy"** en bas de la page
2. Vercel redéploiera automatiquement avec les nouvelles variables
3. Votre site sera accessible en ligne ! 🚀

---

## 🆘 Si vous n'avez pas toutes les valeurs

Vous pouvez commencer avec les 3 variables Supabase minimum :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Les autres peuvent être ajoutées plus tard si nécessaire.
