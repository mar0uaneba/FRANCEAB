'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import PaymentModal from './PaymentModal'
import { Pack } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'

export default function Hero() {
  const [backdropImage, setBackdropImage] = useState<string | null>(null)
  const [testPack, setTestPack] = useState<Pack | null>(null)
  
  // Pack TEST IPTV 48H par défaut (fallback si pas trouvé en base)
  const defaultTestPack: Pack = {
    id: 'test-iptv-48h',
    name: 'TEST IPTV 48H',
    price: 2.99, // Prix 2,99€
    duration: 2, // 2 JOURS (48 heures) - PAS 2 MOIS
    paypal_link: null,
    features: [
      'Accès complet à tous les chaînes',
      'Qualité 4K Ultra HD',
      'Support 24/7',
      'Test gratuit 48 heures'
    ],
    is_promo: true,
    display_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // Charger le pack TEST IPTV 48H depuis Supabase
  useEffect(() => {
    async function fetchTestPack() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('packs')
          .select('*')
          .eq('name', 'TEST IPTV 48H')
          .single()

        if (!error && data) {
          setTestPack(data)
        } else {
          // Utiliser le pack par défaut si pas trouvé
          setTestPack(defaultTestPack)
        }
      } catch (error) {
        console.error('Error fetching test pack:', error)
        setTestPack(defaultTestPack)
      }
    }

    fetchTestPack()
  }, [])
  
  // Positions fixes pour les particules (générées une seule fois)
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    width: 80 + (i * 20),
    height: 80 + (i * 20),
    left: (i * 15 + 10) % 100,
    top: (i * 25 + 20) % 100,
    color: i % 2 === 0 ? 'gold' : 'blue',
    delay: i * 0.5,
    duration: 6 + (i % 3),
  }))

  useEffect(() => {
    // Récupérer une affiche de film populaire depuis TMDB
    async function fetchBackdrop() {
      try {
        const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
        if (!TMDB_API_KEY || TMDB_API_KEY === 'your_api_key_here') {
          return
        }

        // Récupérer les films populaires
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=1`
        )
        
        if (response.ok) {
          const data = await response.json()
          const movies = data.results || []
          
          if (movies.length > 0) {
            // Choisir un film aléatoire parmi les 10 premiers
            const randomMovie = movies[Math.floor(Math.random() * Math.min(10, movies.length))]
            if (randomMovie?.backdrop_path) {
              const imageUrl = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
              setBackdropImage(imageUrl)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching backdrop:', error)
      }
    }

    fetchBackdrop()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-36">
      {/* Movie Poster Background with Blur */}
      <div className="absolute inset-0">
        {backdropImage ? (
          <>
            <Image
              src={backdropImage}
              alt="Movie backdrop"
              fill
              className="object-cover"
              priority
              quality={75}
              sizes="100vw"
            />
            {/* Flou et overlay */}
            <div className="absolute inset-0 backdrop-blur-md bg-dark-bg/60" />
            {/* Overlay gradient pour améliorer la lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/60 to-dark-bg/90" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        )}
      </div>

      {/* Wow Effect - Animated Particles Behind Text */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Particules animées */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full blur-xl"
            style={{
              width: particle.width,
              height: particle.height,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: particle.color === 'gold'
                ? 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.2, 0.7, 0.2],
              x: [0, (particle.id % 3) * 30 - 30, 0],
              y: [0, (particle.id % 4) * 40 - 60, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
        
        {/* Halos de lumière animés derrière le texte */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255, 215, 0, 0.2) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse 50% 35% at 50% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        
        {/* Étoiles scintillantes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${15 + (i * 7)}%`,
              top: `${20 + (i * 6)}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              textShadow: '0 0 30px rgba(0, 0, 0, 0.8), 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3)',
            }}
          >
            <span className="text-white drop-shadow-2xl">Découvrez le </span>
            <span className="text-gradient drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))' }}>meilleur abonnement IPTV</span>
            <span className="text-white drop-shadow-2xl"> en France</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            Notre service est classé{' '}
            <strong className="text-accent-gold">premier abonnement en Europe</strong> grâce à une
            stabilité 4K sans coupure. Choisissez votre{' '}
            <strong className="text-accent-blue">abonnement annuel</strong> et profitez du{' '}
            <strong className="text-accent-gold">top abonnement Smart</strong> du marché.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              href="#pricing"
              className="group relative px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-blue text-dark-bg font-bold rounded-full overflow-hidden neon-glow hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Choisir mon abonnement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-gold"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            {testPack && (
              <PaymentModal pack={testPack}>
                <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:border-accent-gold hover:text-accent-gold transition-all duration-300 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  TEST IPTV 48H
                </button>
              </PaymentModal>
            )}
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-accent-gold/10 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-accent-blue/10 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  )
}



