'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Play, Star, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getPopularMovies, getPopularTV, mapMovieToMediaItem, mapTVToMediaItem } from '@/lib/tmdb'
import TrailerModal from './TrailerModal'

interface MediaItem {
  id: string
  tmdbId?: number
  title: string
  type: 'film' | 'serie'
  image: string
  rating: number
  year: number
  isNew?: boolean
}

// Top 10 Films & Séries 2025 - Dernières Sorties avec vraies images
// Images depuis TMDB (The Movie Database) - API gratuite et fiable
const newReleases: MediaItem[] = [
  // Top Films 2025
  {
    id: '1',
    title: 'Dune: Part Two',
    type: 'film',
    image: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    rating: 9.2,
    year: 2024,
    isNew: true,
  },
  {
    id: '2',
    title: 'Deadpool & Wolverine',
    type: 'film',
    image: '', // Sera chargé depuis TMDB si API key configurée
    rating: 9.0,
    year: 2024,
    isNew: true,
  },
  {
    id: '3',
    title: 'Gladiator 2',
    type: 'film',
    image: '', // Sera chargé depuis TMDB si API key configurée
    rating: 8.9,
    year: 2024,
    isNew: true,
  },
  {
    id: '4',
    title: 'Joker: Folie à Deux',
    type: 'film',
    image: '', // Sera chargé depuis TMDB si API key configurée
    rating: 9.1,
    year: 2024,
    isNew: true,
  },
  {
    id: '5',
    title: 'Venom: The Last Dance',
    type: 'film',
    image: '', // Sera chargé depuis TMDB si API key configurée
    rating: 8.7,
    year: 2024,
    isNew: true,
  },
  {
    id: '6',
    title: 'Inside Out 2',
    type: 'film',
    image: 'https://image.tmdb.org/t/p/w500/xeqXXTE1Cd3qNa9SJlU2F6gV6PX.jpg',
    rating: 8.8,
    year: 2024,
    isNew: true,
  },
  // Top Séries 2025
  {
    id: '7',
    title: 'House of the Dragon',
    type: 'serie',
    image: '', // Sera chargé depuis TMDB si API key configurée
    rating: 9.3,
    year: 2024,
    isNew: true,
  },
  {
    id: '8',
    title: 'The Last of Us S2',
    type: 'serie',
    image: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
    rating: 9.5,
    year: 2024,
    isNew: true,
  },
  {
    id: '9',
    title: 'Stranger Things S5',
    type: 'serie',
    image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    rating: 9.0,
    year: 2024,
    isNew: true,
  },
  {
    id: '10',
    title: 'The Boys S5',
    type: 'serie',
    image: 'https://image.tmdb.org/t/p/w500/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg',
    rating: 9.2,
    year: 2024,
    isNew: true,
  },
  {
    id: '11',
    title: 'Squid Game S2',
    type: 'serie',
    image: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    rating: 9.1,
    year: 2024,
    isNew: true,
  },
  {
    id: '12',
    title: 'Wednesday',
    type: 'serie',
    image: '', // Sera chargé depuis TMDB si API key configurée
    rating: 8.9,
    year: 2024,
    isNew: true,
  },
  {
    id: '13',
    title: 'The Witcher S4',
    type: 'serie',
    image: 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
    rating: 8.8,
    year: 2024,
    isNew: true,
  },
  {
    id: '14',
    title: 'Bridgerton',
    type: 'serie',
    image: '', // Sera chargé depuis TMDB si API key configurée
    rating: 8.7,
    year: 2024,
    isNew: true,
  },
  {
    id: '15',
    title: 'The Mandalorian S4',
    type: 'serie',
    image: 'https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg',
    rating: 9.0,
    year: 2024,
    isNew: true,
  },
  {
    id: '16',
    title: 'Euphoria S3',
    type: 'serie',
    image: 'https://image.tmdb.org/t/p/w500/jtnfNzqZwN4E32FGGxx1YZaBWWf.jpg',
    rating: 8.9,
    year: 2024,
    isNew: true,
  },
  {
    id: '17',
    title: 'Avatar: The Way of Water',
    type: 'film',
    image: '', // Sera chargé depuis TMDB si API key configurée
    rating: 8.6,
    year: 2022,
    isNew: true,
  },
  {
    id: '18',
    title: 'Mission: Impossible - Dead Reckoning',
    type: 'film',
    image: 'https://image.tmdb.org/t/p/w500/NNxYkU51HPguXjsfVhPqgqGXKz1S.jpg',
    rating: 8.8,
    year: 2023,
    isNew: true,
  },
]

export default function NewReleases() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [trailerModal, setTrailerModal] = useState<{ isOpen: boolean; mediaId: string; title: string }>({
    isOpen: false,
    mediaId: '',
    title: '',
  })

  // Charger les données depuis TMDB ou utiliser fallback
  useEffect(() => {
    async function loadMedia() {
      try {
        setLoading(true)
        
        // Vérifier le cache local (24 heures) pour réduire les appels API
        const cacheKey = 'tmdb_media_cache'
        const cached = localStorage.getItem(cacheKey)
        const cacheTime = localStorage.getItem(`${cacheKey}_time`)
        
        if (cached && cacheTime) {
          const age = Date.now() - parseInt(cacheTime)
          const cacheDuration = 24 * 60 * 60 * 1000 // 24 heures
          if (age < cacheDuration) {
            const cachedItems = JSON.parse(cached)
            if (cachedItems && cachedItems.length >= 6) {
              setMediaItems(cachedItems)
              setLoading(false)
              return
            }
          }
        }
        
        // Vérifier si l'API key est configurée
        const hasApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY && 
                         process.env.NEXT_PUBLIC_TMDB_API_KEY !== 'your_api_key_here' &&
                         process.env.NEXT_PUBLIC_TMDB_API_KEY !== 'your_tmdb_api_key_here'
        
        if (hasApiKey) {
          // Charger uniquement les films et séries populaires depuis TMDB
          const [movies, tvShows] = await Promise.all([
            getPopularMovies(),
            getPopularTV(),
          ])

          // Mapper et filtrer uniquement ceux avec des images valides
          const mappedMovies = movies
            .slice(0, 15) // Augmenter à 15 films
            .map((movie) => mapMovieToMediaItem(movie, true))
            .filter((item) => {
              return item.image && 
                     !item.image.includes('placeholder') && 
                     item.image.includes('tmdb.org') &&
                     item.image !== 'https://image.tmdb.org/t/p/w500null' &&
                     item.image.length > 40 &&
                     !item.image.match(/(.)\1{5,}/)
            })

          const mappedTV = tvShows
            .slice(0, 15) // Augmenter à 15 séries
            .map((tv) => mapTVToMediaItem(tv, true))
            .filter((item) => {
              return item.image && 
                     !item.image.includes('placeholder') && 
                     item.image.includes('tmdb.org') &&
                     item.image !== 'https://image.tmdb.org/t/p/w500null' &&
                     item.image.length > 40 &&
                     !item.image.match(/(.)\1{5,}/)
            })

          // Combiner en alternant films et séries
          const combined: MediaItem[] = []
          const maxLength = Math.max(mappedMovies.length, mappedTV.length)
          
          for (let i = 0; i < maxLength; i++) {
            if (i < mappedMovies.length && combined.length < 30) {
              combined.push(mappedMovies[i])
            }
            if (i < mappedTV.length && combined.length < 30) {
              combined.push(mappedTV[i])
            }
            if (combined.length >= 30) break
          }

          // Supprimer les doublons
          const uniqueItems = combined.filter((item, index, self) => {
            const firstIndex = self.findIndex(
              (t) => t.id === item.id || 
                     (t.title.toLowerCase() === item.title.toLowerCase() && t.type === item.type) ||
                     (t.image === item.image && item.image.length > 40)
            )
            return index === firstIndex
          })

          if (uniqueItems.length >= 6) {
            // Sauvegarder dans le cache local
            localStorage.setItem(cacheKey, JSON.stringify(uniqueItems.slice(0, 30)))
            localStorage.setItem(`${cacheKey}_time`, Date.now().toString())
            
            setMediaItems(uniqueItems.slice(0, 30))
            setLoading(false)
            return
          }
        }
        
        // Utiliser les données de fallback (nettoyées) - Filtrer les images invalides
        const fallback = newReleases
          .filter((item) => {
            // Vérifier que l'image est valide (pas de répétitions de caractères, longueur correcte)
            if (!item.image || !item.image.includes('tmdb.org')) return false
            if (item.image.includes('null')) return false
            if (item.image.length < 40) return false
            
            // Vérifier qu'il n'y a pas de répétitions suspectes (comme "JqJqJqJqJqJ")
            const pathMatch = item.image.match(/\/w500\/(.+)$/)
            if (pathMatch) {
              const filename = pathMatch[1]
              // Si le nom de fichier contient trop de répétitions, c'est invalide
              if (filename.match(/(.)\1{5,}/)) return false
            }
            
            return true
          })
          .filter((item, index, self) => {
            const firstIndex = self.findIndex(
              (t) => t.title.toLowerCase() === item.title.toLowerCase() && t.type === item.type
            )
            return index === firstIndex
          })
        setMediaItems(fallback)
      } catch (error) {
        console.error('Error loading media:', error)
        // En cas d'erreur, utiliser les données de fallback - Filtrer les images invalides
        const fallback = newReleases
          .filter((item) => {
            // Vérifier que l'image est valide
            if (!item.image || !item.image.includes('tmdb.org')) return false
            if (item.image.includes('null')) return false
            if (item.image.length < 40) return false
            
            // Vérifier qu'il n'y a pas de répétitions suspectes
            const pathMatch = item.image.match(/\/w500\/(.+)$/)
            if (pathMatch) {
              const filename = pathMatch[1]
              if (filename.match(/(.)\1{5,}/)) return false
            }
            
            return true
          })
          .filter((item, index, self) => {
            const firstIndex = self.findIndex(
              (t) => t.title.toLowerCase() === item.title.toLowerCase() && t.type === item.type
            )
            return index === firstIndex
          })
          .map((item) => {
            // Si l'image semble invalide, la remplacer par un placeholder
            if (item.image && item.image.match(/(.)\1{5,}/)) {
              return { ...item, image: '' }
            }
            return item
          })
        setMediaItems(fallback)
      } finally {
        setLoading(false)
      }
    }

    loadMedia()
  }, [])

  // Auto-slide effect - défilement film par film
  useEffect(() => {
    if (!isAutoPlaying || mediaItems.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, mediaItems.length - 6) // Afficher 6 à la fois
        return prev >= maxIndex ? 0 : prev + 1 // Défilement film par film
      })
    }, 4000) // Change every 4 seconds pour laisser le temps de voir les films/séries

    return () => clearInterval(interval)
  }, [isAutoPlaying, mediaItems.length])

  const nextSlide = () => {
    if (mediaItems.length === 0) return
    const maxIndex = Math.max(0, mediaItems.length - 6)
    setCurrentIndex((prev) => prev >= maxIndex ? 0 : prev + 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 7000)
  }

  const prevSlide = () => {
    if (mediaItems.length === 0) return
    const maxIndex = Math.max(0, mediaItems.length - 6)
    setCurrentIndex((prev) => prev <= 0 ? maxIndex : prev - 1)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 7000)
  }

  // Items visibles (6 à la fois, défilement film par film)
  const itemsToShow = mediaItems.length > 0 ? mediaItems : []
  const visibleItems = itemsToShow.slice(currentIndex, currentIndex + 6)

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-surface to-dark-bg">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 0% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-accent-gold text-sm font-bold uppercase tracking-wider">
              Nouveautés
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Top </span>
            <span className="text-gradient">Films & Séries</span>
            <span className="text-white"> - France Abonnement IPTV</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez les dernières sorties et les meilleurs contenus disponibles sur votre abonnement IPTV France premium
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] rounded-xl bg-dark-card border border-dark-border animate-pulse"
                />
              ))}
            </div>
          ) : itemsToShow.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              Aucun contenu disponible pour le moment.
            </div>
          ) : (
            <>
              {/* Carousel avec défilement film par film */}
              <div className="relative overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
                  >
                    {visibleItems.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${currentIndex}-${index}`}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        whileHover={{ y: -10, scale: 1.05 }}
                        className="group relative"
                      >
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-dark-card border border-dark-border group-hover:border-accent-gold transition-all duration-300">
                          {/* Image */}
                          <div className="relative w-full h-full bg-dark-surface">
                            {item.image && item.image.includes('tmdb.org') && item.image.length > 40 && !item.image.includes('null') ? (
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                                onError={(e) => {
                                  // Cacher l'image et afficher le fallback élégant
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                  const parent = target.parentElement
                                  if (parent && !parent.querySelector('.fallback-content')) {
                                    const fallback = document.createElement('div')
                                    fallback.className = 'fallback-content w-full h-full bg-gradient-to-br from-dark-surface to-dark-card flex flex-col items-center justify-center p-4 absolute inset-0'
                                    fallback.innerHTML = `
                                      <div class="text-accent-gold text-3xl mb-2">🎬</div>
                                      <span class="text-white/70 text-xs text-center font-semibold">${item.title}</span>
                                      <span class="text-white/50 text-xs mt-1">${item.type === 'film' ? 'FILM' : 'SÉRIE'}</span>
                                    `
                                    parent.appendChild(fallback)
                                  }
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-dark-surface to-dark-card flex flex-col items-center justify-center p-4">
                                <div className="text-accent-gold text-3xl mb-2">🎬</div>
                                <span className="text-white/70 text-xs text-center font-semibold">{item.title}</span>
                                <span className="text-white/50 text-xs mt-1">{item.type === 'film' ? 'FILM' : 'SÉRIE'}</span>
                              </div>
                            )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badge Nouveau */}
                  {item.isNew && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="absolute top-2 right-2 bg-accent-gold text-dark-bg px-2 py-1 rounded-md text-xs font-bold z-10"
                    >
                      NOUVEAU
                    </motion.div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-2 left-2 bg-accent-blue/90 text-white px-2 py-1 rounded-md text-xs font-semibold z-10">
                    {item.type === 'film' ? 'FILM' : 'SÉRIE'}
                  </div>

                  {/* Play Button Overlay */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-20"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (item.id) {
                        setTrailerModal({
                          isOpen: true,
                          mediaId: item.id,
                          title: item.title,
                        })
                      }
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 bg-accent-gold/90 rounded-full flex items-center justify-center neon-glow"
                    >
                      <Play className="w-8 h-8 text-dark-bg ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Info Overlay (Bottom) */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/80 backdrop-blur-sm">
                    <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-accent-gold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/70">
                        <Calendar className="w-3 h-3" />
                        <span>{item.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title Below Card (Mobile) */}
              <div className="mt-2 md:hidden">
                <h3 className="text-white text-sm font-semibold line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-accent-gold text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{item.rating}</span>
                  </div>
                  <span className="text-white/50 text-xs">{item.year}</span>
                </div>
              </div>
            </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 w-12 h-12 md:w-16 md:h-16 bg-dark-card/90 backdrop-blur-sm border-2 border-accent-gold rounded-full flex items-center justify-center hover:bg-accent-gold hover:scale-110 transition-all duration-300 group"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-accent-gold group-hover:text-dark-bg transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 w-12 h-12 md:w-16 md:h-16 bg-dark-card/90 backdrop-blur-sm border-2 border-accent-blue rounded-full flex items-center justify-center hover:bg-accent-blue hover:scale-110 transition-all duration-300 group"
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-accent-blue group-hover:text-dark-bg transition-colors" />
          </button>

          {/* Slide Indicators */}
          {itemsToShow.length > 6 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.max(1, itemsToShow.length - 5) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                    setTimeout(() => setIsAutoPlaying(true), 10000)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-accent-gold'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Aller au slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-blue text-dark-bg font-bold rounded-full hover:shadow-lg transition-all duration-300 neon-glow"
          >
            Voir toutes les nouveautés
          </motion.button>
        </motion.div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={trailerModal.isOpen}
        onClose={() => setTrailerModal({ isOpen: false, mediaId: '', title: '' })}
        mediaId={trailerModal.mediaId}
        title={trailerModal.title}
      />
    </section>
  )
}

