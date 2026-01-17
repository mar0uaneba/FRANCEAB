'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Globe, Check } from 'lucide-react'
import { Pack } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { countryCodes } from '@/lib/countryCodes'

const phoneSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string()
    .min(9, 'Numéro de téléphone invalide (minimum 9 chiffres)')
    .regex(/^[0-9]+$/, 'Le numéro ne doit contenir que des chiffres')
    .refine((val) => {
      // Supprimer le 0 au début si présent (car l'indicatif est déjà sélectionné)
      const cleaned = val.replace(/^0/, '')
      return cleaned.length >= 9
    }, 'Numéro de téléphone invalide'),
  countryCode: z.string().min(1, 'Code pays requis'),
})

type PhoneFormData = z.infer<typeof phoneSchema>

interface PaymentModalProps {
  pack: Pack
  children: React.ReactNode
}

export default function PaymentModal({ pack, children }: PaymentModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'other' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: '+33',
    },
  })

  const handlePayPalClick = () => {
    if (pack.paypal_link) {
      window.open(pack.paypal_link, '_blank')
    }
  }

  const onSubmit = async (data: PhoneFormData) => {
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      
      // Normaliser le numéro : supprimer le 0 au début si présent (l'indicatif est déjà inclus)
      const normalizedPhone = data.phone.replace(/^0/, '')
      const fullPhoneNumber = `${data.countryCode}${normalizedPhone}`
      
      // Insérer dans Supabase
      const { error } = await supabase.from('prospects').insert({
        name: data.name,
        email: data.email,
        phone: fullPhoneNumber,
        pack_id: pack.id,
      })

      if (error) throw error

      // Envoyer l'email via l'API Resend
      try {
        console.log('📧 Envoi de l\'email d\'achat...', {
          name: data.name,
          email: data.email,
          packName: pack.name,
        })

        const emailResponse = await fetch('/api/purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: fullPhoneNumber,
            packName: pack.name,
            packPrice: pack.price,
            packDuration: pack.duration,
          }),
        })

        const emailResult = await emailResponse.json()

        if (!emailResponse.ok) {
          console.error('❌ Erreur lors de l\'envoi de l\'email:', emailResult)
          // On continue même si l'email échoue, mais on log l'erreur
        } else {
          console.log('✅ Email d\'achat envoyé avec succès:', emailResult)
        }
      } catch (emailError) {
        console.error('❌ Erreur email:', emailError)
        // On continue même si l'email échoue
      }

      setSubmitSuccess(true)
      reset()
      setTimeout(() => {
        setIsOpen(false)
        setPaymentMethod(null)
        setSubmitSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => !submitSuccess && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-card border border-dark-border rounded-2xl p-6 md:p-8 max-w-md w-full"
            >
              {!paymentMethod ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      Choisir un mode de paiement
                    </h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handlePayPalClick}
                      className="w-full p-4 bg-dark-surface border-2 border-accent-gold rounded-xl hover:bg-accent-gold/10 transition-all flex items-center gap-3 group"
                    >
                      <CreditCard className="w-6 h-6 text-accent-gold group-hover:scale-110 transition-transform" />
                      <span className="text-white font-semibold">Payer avec PayPal</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('other')}
                      className="w-full p-4 bg-dark-surface border-2 border-accent-blue rounded-xl hover:bg-accent-blue/10 transition-all flex items-center gap-3 group"
                    >
                      <Globe className="w-6 h-6 text-accent-blue group-hover:scale-110 transition-transform" />
                      <span className="text-white font-semibold">Autre méthode</span>
                    </button>
                  </div>
                </>
              ) : submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-accent-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Demande envoyée !
                  </h3>
                  <p className="text-white/70">
                    Nous vous contacterons sous peu.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">
                      Informations de contact
                    </h3>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod(null)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      Nom complet
                    </label>
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
                    <label className="block text-white/80 text-sm mb-2">
                      Email
                    </label>
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
                    <label className="block text-white/80 text-sm mb-2">
                      Téléphone
                    </label>
                    <div className="flex gap-2">
                      <select
                        {...register('countryCode')}
                        className="px-2 py-3 bg-dark-surface border border-dark-border rounded-xl text-white focus:outline-none focus:border-accent-gold transition-colors text-sm w-[140px] flex-shrink-0"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      <input
                        {...register('phone')}
                        type="tel"
                        className="flex-1 px-4 py-3 bg-dark-surface border border-dark-border rounded-xl text-white focus:outline-none focus:border-accent-gold transition-colors"
                        placeholder="612345678 (sans le 0)"
                      />
                    </div>
                    {errors.phone ? (
                      <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                    ) : (
                      <p className="text-white/60 text-xs mt-1">
                        Écrivez le numéro sans le 0 au début (ex: 612345678 au lieu de 0612345678)
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-accent-gold to-accent-blue text-dark-bg font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi...' : 'Envoyer la demande'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

