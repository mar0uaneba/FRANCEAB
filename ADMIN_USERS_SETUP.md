# 👥 Configuration de la Gestion des Comptes Admin

## ✅ Modifications effectuées

1. **Page de login** : Bouton d'inscription supprimé (accès privé uniquement)
2. **Routes API créées** :
   - `/api/admin/users` - Lister les utilisateurs
   - `/api/admin/create-user` - Créer un compte admin
   - `/api/admin/delete-user` - Supprimer un compte admin

## 🔧 Configuration requise

### 1. Ajouter la variable d'environnement

Ajoutez dans votre fichier `.env.local` :

```env
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_ici
```

**Où trouver la Service Role Key :**
1. Allez sur Supabase → Settings → API
2. Copiez la **"service_role" key** (⚠️ Ne jamais l'exposer côté client !)
3. Collez-la dans `.env.local`

### 2. Vérifier que la section "Comptes Admin" est ajoutée

La section devrait apparaître dans l'onglet "Comptes Admin" du panel admin.

## 📋 Utilisation

### Créer un compte admin

1. Allez dans Admin → Comptes Admin
2. Cliquez sur "Ajouter un compte admin"
3. Entrez l'email et le mot de passe (minimum 6 caractères)
4. Cliquez sur "Créer le compte"
5. Le compte sera créé avec auto-confirmation (pas besoin de vérifier l'email)

### Supprimer un compte admin

1. Allez dans Admin → Comptes Admin
2. Cliquez sur "Supprimer" à côté du compte
3. Confirmez la suppression

## 🔒 Sécurité

- ⚠️ La Service Role Key donne un accès complet à Supabase
- ⚠️ Ne jamais l'exposer dans le code client
- ⚠️ Ne jamais la commiter dans Git
- ✅ Elle est utilisée uniquement dans les routes API serveur

## 🐛 Dépannage

### Erreur "Service role key non configurée"

- Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est dans `.env.local`
- Redémarrez le serveur de développement

### Erreur lors de la création d'un compte

- Vérifiez que l'email n'existe pas déjà
- Vérifiez que le mot de passe fait au moins 6 caractères
- Vérifiez les logs dans la console du navigateur
