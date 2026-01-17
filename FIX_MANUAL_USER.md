# 🔧 Problème après création manuelle du compte

## ✅ Vérifications à faire dans Supabase

### 1. Vérifier que le compte est bien créé

1. Allez sur **Supabase → Authentication → Users**
2. Cherchez votre email dans la liste
3. Cliquez sur l'utilisateur pour voir les détails

### 2. Vérifier les paramètres IMPORTANTS

Quand vous créez un utilisateur manuellement, vérifiez :

#### ✅ Email Confirmed
- La colonne **"Email Confirmed"** doit être remplie (date)
- Si elle est vide → C'est le problème !

**Solution :**
1. Cliquez sur l'utilisateur
2. Dans les détails, cherchez **"Email Confirmed At"**
3. Si c'est vide, vous devez :
   - Soit cocher **"Auto Confirm User"** lors de la création
   - Soit cliquer sur **"Send confirmation email"** puis confirmer

#### ✅ Password
- Le mot de passe doit être celui que vous avez défini
- Vérifiez qu'il n'y a pas d'espaces

### 3. Créer le compte correctement (méthode recommandée)

1. Allez sur **Supabase → Authentication → Users**
2. Cliquez sur **"Add user"** → **"Create new user"**
3. Remplissez :
   - **Email** : votre email (ex: `marouaneba.mb@gmail.com`)
   - **Password** : votre mot de passe (minimum 6 caractères)
   - ✅ **Auto Confirm User** : ⚠️ **COCHEZ CETTE CASE** (très important !)
4. Cliquez sur **"Create user"**

### 4. Si le compte existe déjà mais ne fonctionne pas

#### Option A : Réinitialiser le mot de passe
1. Cliquez sur l'utilisateur
2. Cliquez sur **"Send password reset email"**
3. Vérifiez votre boîte mail
4. Cliquez sur le lien et définissez un nouveau mot de passe

#### Option B : Supprimer et recréer
1. Cliquez sur l'utilisateur
2. Cliquez sur **"Delete user"**
3. Recréez-le avec **"Auto Confirm User"** coché

### 5. Vérifier la configuration Auth dans Supabase

1. Allez sur **Authentication → Providers → Email**
2. Vérifiez que :
   - ✅ **Enable Email provider** est activé
   - ⚠️ **Confirm email** : Vous pouvez le désactiver pour les tests (ou laisser activé et cocher "Auto Confirm" lors de la création)

## 🎯 Solution rapide

**Méthode la plus simple :**

1. Allez sur **Supabase → Authentication → Users**
2. **Supprimez** le compte que vous venez de créer
3. Cliquez sur **"Add user"** → **"Create new user"**
4. Entrez :
   - Email : `marouaneba.mb@gmail.com`
   - Password : `Dis010203040506/!`
   - ✅ **Auto Confirm User** : **COCHEZ** ⚠️
5. Cliquez sur **"Create user"**
6. Essayez de vous connecter

## 🔍 Vérification finale

Après avoir créé le compte avec "Auto Confirm" :

1. Dans la liste des utilisateurs, vérifiez que :
   - ✅ L'email apparaît
   - ✅ **"Email Confirmed"** a une date (pas vide)
   - ✅ **"Created"** a une date

2. Essayez de vous connecter avec :
   - Email exact (sans espaces)
   - Mot de passe exact (sans espaces)

## ⚠️ Erreurs courantes

- **"Invalid login credentials"** :
  - Email non confirmé → Cochez "Auto Confirm" lors de la création
  - Mot de passe incorrect → Vérifiez qu'il n'y a pas d'espaces
  - Email incorrect → Vérifiez la casse et les espaces

- **"Email not confirmed"** :
  - Le compte existe mais l'email n'est pas confirmé
  - Solution : Recréer avec "Auto Confirm" coché
