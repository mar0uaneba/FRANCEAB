# 🔍 Débogage - Invalid login credentials

## ✅ Vérifications à faire

### 1. Vérifier que le compte a été créé

1. Allez sur Supabase → **Authentication** → **Users**
2. Vérifiez que l'email que vous avez utilisé apparaît dans la liste
3. Si le compte n'existe pas → Le problème vient de la création
4. Si le compte existe → Le problème vient de la connexion

### 2. Vérifier l'email et le mot de passe

- **Email** : Doit être exactement le même (sensible à la casse)
- **Mot de passe** : Doit être exactement le même (sensible à la casse)
- Vérifiez qu'il n'y a pas d'espaces avant/après

### 3. Vérifier que l'email est confirmé

Dans Supabase → Authentication → Users :
- Si la colonne "Email Confirmed" est vide → C'est le problème
- Le compte doit avoir `email_confirmed_at` rempli

### 4. Vérifier les logs dans la console

Ouvrez la console du navigateur (F12) et regardez :
- Y a-t-il des erreurs lors de la création du compte ?
- Y a-t-il des erreurs lors de la connexion ?

### 5. Solutions

#### Solution 1 : Créer le compte directement dans Supabase

1. Allez sur Supabase → Authentication → Users
2. Cliquez sur **"Add user"** → **"Create new user"**
3. Entrez :
   - **Email** : votre email
   - **Password** : votre mot de passe
   - ✅ **Auto Confirm User** : Cochez cette case
4. Cliquez sur **"Create user"**
5. Essayez de vous connecter

#### Solution 2 : Vérifier le mot de passe

- Le mot de passe doit contenir au moins 6 caractères
- Essayez de créer un nouveau compte avec un mot de passe simple pour tester (ex: `test123`)

#### Solution 3 : Réinitialiser le mot de passe

Si le compte existe mais que vous ne vous souvenez plus du mot de passe :
1. Allez sur Supabase → Authentication → Users
2. Cliquez sur l'utilisateur
3. Cliquez sur **"Reset password"** ou supprimez et recréez le compte

### 6. Test avec le compte par défaut

Essayez de vous connecter avec le compte par défaut :
- **Email** : `marouaneba.mb@gmail.com`
- **Password** : `Dis010203040506/!`

Si ça fonctionne → Le problème vient de la création du nouveau compte
Si ça ne fonctionne pas → Le problème vient de la configuration Supabase Auth
