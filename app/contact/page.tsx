'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Mail, Phone, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Erreur API:', result)
        throw new Error(result.error || 'Erreur lors de l\'envoi')
      }

      console.log('✅ Email envoyé avec succès:', result)
      setSubmitSuccess(true)
      reset()
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Contactez</span>
              <span className="text-gradient">-nous</span>
            </h1>
            <p className="text-white/70 text-lg">
              Notre équipe est disponible 24/7 pour répondre à vos questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-card border border-dark-border rounded-2xl p-6"
            >
              <Mail className="w-8 h-8 text-accent-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <a
                href="mailto:admin@franceabonnementiptv.com"
                className="text-accent-blue hover:text-accent-gold transition-colors"
              >
                admin@franceabonnementiptv.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-card border border-dark-border rounded-2xl p-6"
            >
              <Phone className="w-8 h-8 text-accent-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Téléphone</h3>
              <a
                href="tel:+33756754304"
                className="text-accent-blue hover:text-accent-gold transition-colors"
              >
                +33 7 56 75 43 04
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">Nom complet</label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-xl text-white focus:outline-none focus:border-accent-gold transition-colors"
                  placeholder="Jean Dupont"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-xl text-white focus:outline-none focus:border-accent-gold transition-colors"
                  placeholder="jean@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Message</label>
                <textarea
                  {...register('message')}
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-xl text-white focus:outline-none focus:border-accent-gold transition-colors resize-none"
                  placeholder="Votre message..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {submitSuccess && (
                <div className="bg-accent-gold/20 border border-accent-gold rounded-xl p-4 text-center">
                  <p className="text-accent-gold font-semibold">
                    Message envoyé avec succès ! Nous vous répondrons sous peu.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-accent-gold to-accent-blue text-dark-bg font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Envoi...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}



