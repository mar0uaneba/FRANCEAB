# 🔍 Guide de Dépannage - Emails Resend

## Problème : Vous ne recevez pas d'emails

### ✅ Vérifications à faire :

1. **Vérifier que le serveur est redémarré**
   - Après avoir ajouté/modifié `RESEND_API_KEY` dans `.env.local`, vous DEVEZ redémarrer le serveur
   - Arrêtez le serveur (Ctrl+C) et relancez avec `npm run dev`

2. **Vérifier les logs dans la console du serveur**
   - Ouvrez le terminal où tourne `npm run dev`
   - Quand vous envoyez un formulaire, vous devriez voir :
     - `📧 Tentative d'envoi d'email...`
     - `✅ Email admin envoyé avec succès` ou `❌ Erreur Resend: ...`

3. **Vérifier la console du navigateur**
   - Ouvrez les DevTools (F12)
   - Allez dans l'onglet "Console"
   - Vérifiez s'il y a des erreurs lors de l'envoi

4. **Vérifier votre boîte email**
   - Vérifiez les **spams/courrier indésirable**
   - Les emails de `onboarding@resend.dev` peuvent être filtrés
   - Vérifiez aussi les emails de confirmation au client

5. **Tester l'API directement**
   - Ouvrez la console du navigateur
   - Exécutez ce code pour tester :
   ```javascript
   fetch('/api/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       name: 'Test',
       email: 'marouaneba.mb@gmail.com',
       message: 'Test d\'envoi d\'email'
     })
   }).then(r => r.json()).then(console.log)
   ```

### 🔧 Solutions courantes :

#### Problème : "RESEND_API_KEY is not defined"
**Solution :** 
- Vérifiez que `.env.local` contient bien `RESEND_API_KEY=re_aUqevGoR_CyQ9mzrNjFhxAvVzsv71xYEz`
- Redémarrez le serveur

#### Problème : Erreur "Invalid API key"
**Solution :**
- Vérifiez que la clé API est correcte sur https://resend.com/api-keys
- Régénérez une nouvelle clé si nécessaire

#### Problème : Emails dans les spams
**Solution :**
- Vérifiez votre dossier spam/courrier indésirable
- Ajoutez `onboarding@resend.dev` à vos contacts
- Configurez votre domaine personnalisé dans Resend (voir RESEND_SETUP.md)

#### Problème : Aucun log dans la console
**Solution :**
- Vérifiez que le formulaire est bien soumis
- Ouvrez les DevTools (F12) > Network
- Cherchez la requête vers `/api/contact` ou `/api/purchase`
- Cliquez dessus pour voir la réponse

### 📧 Vérifier le statut dans Resend

1. Allez sur https://resend.com/emails
2. Connectez-vous avec votre compte
3. Vérifiez l'onglet "Emails" pour voir les emails envoyés
4. Vérifiez s'il y a des erreurs

### 🚨 Si rien ne fonctionne :

1. Vérifiez que Resend est bien activé :
   - Allez sur https://resend.com
   - Vérifiez que votre compte est actif
   - Vérifiez les limites d'envoi (gratuit : 100 emails/jour)

2. Testez avec curl (dans un terminal) :
   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"marouaneba.mb@gmail.com","message":"Test"}'
   ```

3. Contactez le support Resend si le problème persiste
