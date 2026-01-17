'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

export default function AboutPage() {
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
              <span className="text-white">À Propos de </span>
              <span className="bg-gradient-to-r from-accent-gold via-accent-blue to-accent-gold bg-clip-text text-transparent">France Abonnement IPTV</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert max-w-none space-y-6"
          >
            <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Notre Mission</h2>
              <p className="text-white/70 leading-relaxed">
                France Abonnement IPTV est né de la volonté de proposer le{' '}
                <strong className="text-accent-gold">meilleur abonnement IPTV en France</strong>.
                Nous sommes fiers d&apos;être classés comme le{' '}
                <strong className="text-accent-blue">premier abonnement en Europe</strong> grâce à
                notre engagement envers l&apos;excellence et la satisfaction client.
              </p>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Pourquoi Nous Choisir ?</h2>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold">✓</span>
                  <span>
                    <strong className="text-white">Qualité 4K Ultra HD</strong> : Plus de 20 000
                    chaînes en qualité exceptionnelle
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold">✓</span>
                  <span>
                    <strong className="text-white">Stabilité Garantie</strong> : Service sans
                    coupure avec uptime de 99.9%
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold">✓</span>
                  <span>
                    <strong className="text-white">Support 24/7</strong> : Équipe dédiée disponible
                    à tout moment
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold">✓</span>
                  <span>
                    <strong className="text-white">Top Abonnement Smart</strong> : Compatible avec
                    tous vos appareils
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-gold">✓</span>
                  <span>
                    <strong className="text-white">Abonnement Annuel Avantageux</strong> : Économisez
                    jusqu&apos;à 50% avec nos offres promotionnelles
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Notre Engagement</h2>
              <p className="text-white/70 leading-relaxed">
                Nous nous engageons à vous offrir une expérience de streaming exceptionnelle. Chaque
                client compte, et nous travaillons sans relâche pour maintenir notre position de
                leader en tant que meilleur abonnement IPTV en France et en Europe.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

