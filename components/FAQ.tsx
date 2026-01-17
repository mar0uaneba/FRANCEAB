'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'Qu\'est-ce qu\'un abonnement IPTV ?',
    answer: 'Un abonnement IPTV (Internet Protocol Television) vous permet d\'accéder à des chaînes de télévision via Internet. Notre service offre une qualité 4K exceptionnelle avec plus de 20 000 chaînes et VOD.',
  },
  {
    question: 'Pourquoi choisir le meilleur abonnement IPTV en France ?',
    answer: 'Notre service est classé premier abonnement en Europe grâce à sa stabilité 4K sans coupure, son support 24/7 et sa compatibilité avec tous les appareils Smart TV, Android, iOS et plus encore.',
  },
  {
    question: 'Comment fonctionne l\'abonnement annuel IPTV ?',
    answer: 'L\'abonnement annuel IPTV vous donne accès à 12 mois de service premium. Après votre achat, vous recevrez vos identifiants par email et pourrez commencer à profiter de nos chaînes immédiatement.',
  },
  {
    question: 'Quels appareils sont compatibles avec le top abonnement Smart ?',
    answer: 'Notre service est compatible avec Smart TV (Samsung, LG), Android TV, Apple TV, Fire TV Stick, iPhone, iPad, Android, Windows, Mac et bien plus encore.',
  },
  {
    question: 'Y a-t-il une garantie de remboursement ?',
    answer: 'Oui, nous offrons une garantie satisfait ou remboursé de 7 jours. Si vous n\'êtes pas satisfait de notre service, contactez-nous pour un remboursement complet.',
  },
  {
    question: 'Comment contacter le support client ?',
    answer: 'Notre équipe de support est disponible 24/7. Vous pouvez nous contacter par email à admin@franceabonnementiptv.com ou par téléphone au +33 7 56 75 43 04.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Questions </span>
            <span className="text-gradient">Fréquentes</span>
          </h2>
          <p className="text-white/70 text-lg">
            Tout ce que vous devez savoir sur notre service IPTV
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-card border border-dark-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-dark-surface transition-colors"
              >
                <span className="text-white font-semibold pr-4">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-accent-gold flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 text-white/70 border-t border-dark-border">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


