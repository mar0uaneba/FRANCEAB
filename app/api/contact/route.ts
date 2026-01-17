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
    const { name, email, message } = body

    console.log('📧 Tentative d\'envoi d\'email de contact:', { name, email })

    // Validation basique
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Envoyer l'email à l'administrateur
    const { data, error } = await resend.emails.send({
      from: 'France Abonnement IPTV <onboarding@resend.dev>', // Vous pouvez changer cela avec votre domaine vérifié
      to: 'marouaneba.mb@gmail.com',
      replyTo: email,
      subject: `Nouveau message de contact de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
          <h2 style="color: #fbbf24; margin-bottom: 20px;">Nouveau message de contact</h2>
          
          <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #fbbf24;">Nom:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #fbbf24;">Email:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px;">
            <h3 style="color: #fbbf24; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #3a3a3a; text-align: center; color: #888;">
            <p>Ce message a été envoyé depuis le formulaire de contact de France Abonnement IPTV</p>
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
      subject: 'Confirmation de réception - France Abonnement IPTV',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
          <h2 style="color: #fbbf24; margin-bottom: 20px;">Merci pour votre message !</h2>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            Bonjour ${name},
          </p>
          
          <p style="line-height: 1.6; margin-bottom: 20px;">
            Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.
          </p>
          
          <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #fbbf24;"><strong>Votre message:</strong></p>
            <p style="margin-top: 10px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="line-height: 1.6; margin-top: 30px;">
            En attendant, n'hésitez pas à consulter nos <a href="https://franceabonnementiptv.com/#pricing" style="color: #fbbf24; text-decoration: none;">offres d'abonnement IPTV</a>.
          </p>
          
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
    console.error('Error in contact API:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

