'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Flame } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function UrgencyBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [announcementText, setAnnouncementText] = useState('OFFRE LIMITÉE: -50% abonnement 12 mois - 7 places restantes')

  // Charger le texte de l'annonce depuis Supabase
  useEffect(() => {
    async function fetchAnnouncementText() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'urgency_bar_text')
          .single()

        if (!error && data?.value) {
          setAnnouncementText(data.value)
        }
      } catch (error) {
        console.error('Error fetching announcement text:', error)
        // Garder le texte par défaut en cas d'erreur
      }
    }

    fetchAnnouncementText()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // Masquer quand on descend (scroll > 100px)
      if (scrollY > 100) {
        setIsVisible(false)
        setHasScrolled(true)
      } 
      // Réafficher quand on revient en haut (scroll < 50px)
      else if (scrollY < 50 && hasScrolled) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-accent-gold/20 via-accent-blue/20 to-accent-gold/20 border-b border-accent-gold/30 py-2 px-2 md:py-2.5 md:px-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-sm lg:text-base overflow-hidden">
            <Flame className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-accent-gold animate-pulse flex-shrink-0" />
            <span className="text-white/90 whitespace-nowrap overflow-hidden text-ellipsis">
              {announcementText.split('OFFRE LIMITÉE').map((part, index, array) => {
                if (index === 0 && array.length === 1) {
                  // Pas de "OFFRE LIMITÉE" dans le texte, afficher tel quel
                  return <span key={index}>{part}</span>
                }
                if (index === 0) {
                  // Partie avant "OFFRE LIMITÉE"
                  return part ? <span key={index}>{part}</span> : null
                }
                // "OFFRE LIMITÉE" et le reste
                return (
                  <span key={index}>
                    <strong className="text-accent-gold">OFFRE LIMITÉE</strong>
                    {part}
                  </span>
                )
              })}
            </span>
            <Link
              href="#pricing"
              className="text-accent-gold hover:text-accent-blue underline transition-colors whitespace-nowrap flex-shrink-0 text-[10px] sm:text-xs md:text-sm lg:text-base"
            >
              Voir offre
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}



