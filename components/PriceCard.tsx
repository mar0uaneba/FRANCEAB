'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { Pack } from '@/lib/supabase/types'
import PaymentModal from './PaymentModal'

interface PriceCardProps {
  pack: Pack
  index: number
}

export default function PriceCard({ pack, index }: PriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`relative group ${
        pack.is_promo
          ? 'bg-gradient-to-br from-accent-gold/20 to-accent-blue/20 border-2 border-accent-gold'
          : 'bg-dark-card border border-dark-border'
      } rounded-2xl p-8 hover:scale-105 transition-all duration-300`}
    >
      {pack.is_promo && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-gold text-dark-bg px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
          <Star className="w-4 h-4 fill-current" />
          PROMO
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{pack.name}</h3>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl md:text-5xl font-bold text-gradient">
            {pack.price}€
          </span>
          <span className="text-white/60">
            {pack.name === 'TEST IPTV 48H' 
              ? '/48H' 
              : `/${pack.duration} mois`}
          </span>
        </div>
        {pack.is_promo && (
          <p className="text-sm text-accent-gold mt-2">Économisez 50%</p>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {pack.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
            <span className="text-white/80">{feature}</span>
          </li>
        ))}
      </ul>

      <PaymentModal pack={pack}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            pack.is_promo
              ? 'bg-gradient-to-r from-accent-gold to-accent-blue text-dark-bg neon-glow'
              : 'bg-dark-surface border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-dark-bg'
          }`}
        >
          Acheter maintenant
        </motion.button>
      </PaymentModal>
    </motion.div>
  )
}


