# 🔐 Configuration de l'Authentification Supabase

## 📋 Étapes de Configuration

### 1. Activer l'Authentification dans Supabase

1. Allez sur votre projet Supabase
2. Cliquez sur **"Authentication"** dans le menu de gauche
3. Allez dans **"Providers"**
4. Activez **"Email"** comme provider
5. Configurez les paramètres :
   - ✅ **Enable Email provider** : Activé
   - ✅ **Confirm email** : Vous pouvez le désactiver pour les tests (ou l'activer pour la production)
   - ✅ **Secure email change** : Activé (recommandé)

### 2. Créer l'utilisateur Admin

#### Option A : Via l'interface Supabase (Recommandé)

1. Allez dans **Authentication** → **Users**
2. Cliquez sur **"Add user"** → **"Create new user"**
3. Remplissez :
   - **Email** : `marouaneba.mb@gmail.com`
   - **Password** : `Dis010203040506/!`
   - ✅ **Auto Confirm User** : Cochez cette case pour éviter la confirmation par email
4. Cliquez sur **"Create user"**

#### Option B : Via l'inscription dans l'interface

1. Allez sur `/login` dans votre site
2. Entrez :
   - **Email** : `marouaneba.mb@gmail.com`
   - **Password** : `Dis010203040506/!`
3. Cliquez sur **"S'inscrire"**
4. Si l'email de confirmation est activé, vérifiez votre boîte mail
5. Si l'auto-confirmation est activée, vous pouvez vous connecter directement

### 3. Désactiver la confirmation par email (pour les tests)

1. Allez dans **Authentication** → **Providers** → **Email**
2. Décochez **"Confirm email"** (optionnel, pour les tests)
3. Ou configurez **"Auto Confirm"** dans les paramètres

### 4. Tester la connexion

1. Allez sur `http://localhost:3000/login`
2. Entrez :
   - **Email** : `marouaneba.mb@gmail.com`
   - **Password** : `Dis010203040506/!`
3. Cliquez sur **"Se connecter"**
4. Vous devriez être redirigé vers `/admin`

## 🔒 Sécurité

### Protection de la route Admin

La route `/admin` est maintenant protégée :
- Si vous n'êtes pas connecté, vous serez redirigé vers `/login`
- La session est vérifiée à chaque chargement de la page admin
- Un bouton "Déconnexion" est disponible dans l'admin

### Permissions Supabase (RLS)

Pour une sécurité maximale, vous pouvez activer Row Level Security (RLS) dans Supabase :

1. Allez dans **Authentication** → **Policies**
2. Créez des politiques pour limiter l'accès aux tables :
   - Seuls les utilisateurs authentifiés peuvent lire/écrire
   - Seul l'admin peut modifier les données

## 🚨 Dépannage

### Erreur "Invalid login credentials"

- Vérifiez que l'utilisateur existe dans Supabase
- Vérifiez que l'email et le mot de passe sont corrects
- Vérifiez que l'email est confirmé (si la confirmation est activée)

### Redirection infinie

- Vérifiez que les variables d'environnement Supabase sont correctes
- Vérifiez la console du navigateur pour les erreurs

### L'utilisateur n'est pas créé

- Vérifiez que l'authentification Email est activée dans Supabase
- Vérifiez les logs dans Supabase → Logs → Auth

## 📝 Notes

- L'email par défaut est pré-rempli dans le placeholder
- Le mot de passe est masqué pour la sécurité
- La session est persistante (reste connecté après fermeture du navigateur)
- Pour se déconnecter, cliquez sur "Déconnexion" dans l'admin
