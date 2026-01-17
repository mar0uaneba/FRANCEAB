import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Vérifier que la clé API est définie
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not defined')
      return NextResponse.json(
        { error: 'Configuration email manquante' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, phone, packName, packPrice, packDuration } = body

    // Déterminer l'affichage de la durée selon le pack
    const durationDisplay = packName === 'TEST IPTV 48H' 
      ? '48H (2 jours)' 
      : `${packDuration} mois`

    console.log('📧 Tentative d\'envoi d\'email d\'achat:', { name, email, packName })

    // Validation basique
    if (!name || !email || !phone || !packName) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Envoyer l'email à l'administrateur
    const { data, error } = await resend.emails.send({
      from: 'France Abonnement IPTV <onboarding@resend.dev>',
      to: 'marouaneba.mb@gmail.com',
      replyTo: email,
      subject: `Nouvelle demande d'abonnement - ${packName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
          <h2 style="color: #fbbf24; margin-bottom: 20px;">🎉 Nouvelle demande d'abonnement IPTV</h2>
          
          <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #fbbf24; margin-top: 0;">Informations client :</h3>
            <p style="margin: 10px 0;"><strong style="color: #fbbf24;">Nom:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #fbbf24;">Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong style="color: #fbbf24;">Téléphone:</strong> ${phone}</p>
          </div>
          
          <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #fbbf24; margin-top: 0;">Pack sélectionné :</h3>
            <p style="margin: 10px 0;"><strong style="color: #fbbf24;">Nom:</strong> ${packName}</p>
            <p style="margin: 10px 0;"><strong style="color: #fbbf24;">Prix:</strong> ${packPrice}€</p>
            <p style="margin: 10px 0;"><strong style="color: #fbbf24;">Durée:</strong> ${durationDisplay}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: rgba(251, 191, 36, 0.1); border-left: 4px solid #fbbf24; border-radius: 4px;">
            <p style="margin: 0; color: #fbbf24;"><strong>⚠️ Action requise :</strong></p>
            <p style="margin: 5px 0 0 0;">Contactez le client pour finaliser l'abonnement.</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #3a3a3a; text-align: center; color: #888;">
            <p>Ce message a été envoyé depuis le formulaire d'achat de France Abonnement IPTV</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('❌ Erreur Resend:', error)
      return NextResponse.json(
        { error: `Erreur lors de l'envoi de l'email: ${error.message || JSON.stringify(error)}` },
        { status: 500 }
      )
    }

    console.log('✅ Email admin envoyé avec succès:', data)

    // Envoyer un email de confirmation au client
    // NOTE: En mode test Resend, on ne peut envoyer qu'à l'email vérifié
    // Si le compte est en mode production, décommentez cette section
    /*
    const confirmationResult = await resend.emails.send({
      from: 'France Abonnement IPTV <onboarding@resend.dev>',
      to: email,
      subject: 'Confirmation de votre demande d\'abonnement IPTV',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
          <h2 style="color: #fbbf24; margin-bottom: 20px;">✅ Demande reçue avec succès !</h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            Bonjour ${name},
          </p>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            Nous avons bien reçu votre demande d'abonnement pour le pack <strong style="color: #fbbf24;">${packName}</strong>.
          </p>
          
          <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #fbbf24; margin-top: 0;">Récapitulatif de votre demande :</h3>
            <p style="margin: 10px 0;"><strong>Pack:</strong> ${packName}</p>
            <p style="margin: 10px 0;"><strong>Prix:</strong> ${packPrice}€</p>
            <p style="margin: 10px 0;"><strong>Durée:</strong> ${packDuration} mois</p>
            <p style="margin: 10px 0;"><strong>Téléphone:</strong> ${phone}</p>
          </div>
          
          <p style="line-height: 1.6; margin-top: 30px;">
            Notre équipe va vous contacter dans les plus brefs délais pour finaliser votre abonnement et vous donner accès au meilleur service IPTV en France.
          </p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; border-radius: 4px;">
            <p style="margin: 0; color: #3b82f6;"><strong>💡 En attendant :</strong></p>
            <p style="margin: 5px 0 0 0;">Vous pouvez nous contacter directement au <strong>+33 7 56 75 43 04</strong> ou par email à <strong>admin@franceabonnementiptv.com</strong></p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #3a3a3a; text-align: center; color: #888;">
            <p style="margin: 0;">France Abonnement IPTV</p>
            <p style="margin: 5px 0;">Le meilleur abonnement IPTV en France</p>
          </div>
        </div>
      `,
    })

    if (confirmationResult.error) {
      console.error('❌ Erreur email de confirmation:', confirmationResult.error)
    } else {
      console.log('✅ Email de confirmation envoyé avec succès')
    }
    */
    
    // En mode test, on envoie la confirmation à l'admin aussi
    // TODO: Activer les emails de confirmation clients quand le domaine est vérifié dans Resend
    console.log('ℹ️ Email de confirmation client désactivé (mode test Resend). Activez-le après vérification du domaine.')

    return NextResponse.json(
      { success: true, message: 'Email envoyé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in purchase API:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

