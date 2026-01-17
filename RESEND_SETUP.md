# Configuration Resend pour l'envoi d'emails

## 📧 Intégration Resend

L'API Resend a été intégrée pour gérer l'envoi d'emails depuis le formulaire de contact.

## 🔑 Configuration

1. **Ajoutez votre clé API Resend dans `.env.local`** :

```env
RESEND_API_KEY=re_aUqevGoR_CyQ9mzrNjFhxAvVzsv71xYEz
```

2. **Redémarrez le serveur de développement** après avoir ajouté la variable d'environnement.

## ✨ Fonctionnalités

- **Email à l'administrateur** : Reçoit tous les messages de contact
- **Email de confirmation** : Le client reçoit une confirmation automatique
- **Design HTML** : Emails stylisés avec le thème du site
- **Reply-To** : Les réponses vont directement au client

## 📝 Emails envoyés

### Email à l'administrateur
- **Destinataire** : marouaneba.mb@gmail.com
- **Contenu** : Nom, email et message du client
- **Reply-To** : Email du client (pour répondre facilement)

### Email de confirmation au client
- **Destinataire** : Email du client
- **Contenu** : Message de confirmation avec copie de son message
- **Lien** : Vers la page des tarifs

## 🔧 Personnalisation

Pour changer l'adresse email de réception, modifiez dans `app/api/contact/route.ts` :

```typescript
to: 'votre-email@example.com', // Ligne 20
```

Pour utiliser votre propre domaine (au lieu de `onboarding@resend.dev`), vous devez :
1. Vérifier votre domaine dans le dashboard Resend
2. Modifier la ligne `from` dans `app/api/contact/route.ts`

## 🚀 Test

1. Remplissez le formulaire de contact sur `/contact`
2. Vérifiez que vous recevez l'email de confirmation
3. Vérifiez que l'administrateur reçoit l'email avec les détails

## 📚 Documentation Resend

- [Documentation Resend](https://resend.com/docs)
- [Dashboard Resend](https://resend.com/emails)
