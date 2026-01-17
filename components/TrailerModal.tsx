'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { getMovieVideos, getTVVideos, extractTMDBId, type TMDBVideo } from '@/lib/tmdb'

interface TrailerModalProps {
  isOpen: boolean
  onClose: () => void
  mediaId: string // Format: "movie-123" ou "tv-456"
  title: string
}

export default function TrailerModal({ isOpen, onClose, mediaId, title }: TrailerModalProps) {
  const [videos, setVideos] = useState<TMDBVideo[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<TMDBVideo | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadVideos = useCallback(async () => {
    const tmdbInfo = extractTMDBId(mediaId)
    if (!tmdbInfo) {
      setError('ID invalide')
      return
    }

    setLoading(true)
    setError(null)

    try {
      let videoResults: TMDBVideo[] = []
      
      console.log(`🎬 Recherche de trailers pour ${tmdbInfo.type} ID: ${tmdbInfo.id}`)
      
      if (tmdbInfo.type === 'movie') {
        videoResults = await getMovieVideos(tmdbInfo.id)
      } else {
        videoResults = await getTVVideos(tmdbInfo.id)
      }

      console.log(`📹 ${videoResults.length} vidéo(s) trouvée(s)`, videoResults)

      if (videoResults.length > 0) {
        setVideos(videoResults)
        // Sélectionner le premier trailer par défaut
        setSelectedVideo(videoResults[0])
      } else {
        console.warn(`⚠️ Aucun trailer trouvé pour ${tmdbInfo.type} ID: ${tmdbInfo.id}`)
        setError('Aucun trailer disponible pour ce contenu')
      }
    } catch (err) {
      console.error('❌ Error loading videos:', err)
      setError('Erreur lors du chargement du trailer')
    } finally {
      setLoading(false)
    }
  }, [mediaId])

  useEffect(() => {
    if (isOpen && mediaId) {
      loadVideos()
    } else {
      // Reset when modal closes
      setVideos([])
      setSelectedVideo(null)
      setError(null)
    }
  }, [isOpen, mediaId, loadVideos])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-dark-border bg-dark-surface">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-dark-card rounded-lg transition-colors group"
                  aria-label="Fermer"
                >
                  <X className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-12 h-12 text-accent-gold animate-spin mb-4" />
                    <p className="text-white/70">Chargement du trailer...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="text-4xl mb-4">🎬</div>
                    <p className="text-white/70 text-center">{error}</p>
                    <p className="text-white/50 text-sm mt-2 text-center">
                      Le trailer n&apos;est pas disponible pour ce contenu
                    </p>
                  </div>
                ) : selectedVideo ? (
                  <div className="space-y-4">
                    {/* Video Player */}
                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&rel=0&modestbranding=1`}
                        title={selectedVideo.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>

                    {/* Video List (if multiple trailers) */}
                    {videos.length > 1 && (
                      <div className="mt-4">
                        <h3 className="text-white font-semibold mb-3">
                          Autres trailers ({videos.length})
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {videos.map((video) => (
                            <button
                              key={video.id}
                              onClick={() => setSelectedVideo(video)}
                              className={`p-3 rounded-lg border transition-all text-left ${
                                selectedVideo.id === video.id
                                  ? 'border-accent-gold bg-accent-gold/10'
                                  : 'border-dark-border bg-dark-surface hover:border-accent-gold/50'
                              }`}
                            >
                              <p className="text-white text-sm font-medium line-clamp-2">
                                {video.name}
                              </p>
                              <p className="text-white/50 text-xs mt-1">
                                {video.type}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


