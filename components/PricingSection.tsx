'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Pack } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'
import PriceCard from './PriceCard'

export default function PricingSection() {
  const [packs, setPacks] = useState<Pack[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPacks() {
      try {
        // Vérifier que les variables d'environnement sont définies
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.error('Variables d\'environnement Supabase manquantes')
          setLoading(false)
          return
        }

        const supabase = createClient()
        const { data, error } = await supabase
          .from('packs')
          .select('*')
          .order('display_order', { ascending: true, nullsFirst: false })

        if (error) {
          console.error('Error fetching packs:', error)
          if (error.message.includes('relation') || error.message.includes('does not exist')) {
            setError('Les tables Supabase n\'ont pas été créées. Exécutez le script SQL dans Supabase.')
          } else {
            setError(`Erreur Supabase: ${error.message}`)
          }
          setLoading(false)
          return
        }
        
        setPacks(data || [])
      } catch (error: any) {
        console.error('Error fetching packs:', error)
        setError(error?.message || 'Erreur lors du chargement des packs')
      } finally {
        setLoading(false)
      }
    }

    fetchPacks()
  }, [])

  if (loading) {
    return (
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-white/60 animate-pulse">Chargement des tarifs...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Choisissez votre </span>
            <span className="text-gradient">abonnement annuel IPTV</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez nos offres premium avec une qualité 4K exceptionnelle et un support 24/7
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packs.map((pack, index) => (
            <PriceCard key={pack.id} pack={pack} index={index} />
          ))}
        </div>

        {packs.length === 0 && !loading && !error && (
          <div className="text-center text-white/60 py-12">
            Aucun pack disponible pour le moment.
            <p className="text-sm mt-2 text-white/40">
              Ajoutez des packs via le dashboard admin ou directement dans Supabase.
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-red-400 font-semibold mb-2">⚠️ Erreur de chargement</p>
              <p className="text-white/70 text-sm">{error}</p>
              <p className="text-white/50 text-xs mt-4">
                Vérifiez que vous avez exécuté le script SQL dans Supabase (supabase-schema.sql)
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

