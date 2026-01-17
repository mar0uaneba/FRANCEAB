'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageCircle, Star } from 'lucide-react'
import { Testimonial } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'

export default function ConversationsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        
        // Filtrer seulement les témoignages avec des conversations/messages
        const withConversations = (data || []).filter(
          (t) => t.conversation || t.message
        )
        setTestimonials(withConversations)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  if (loading) {
    return (
      <section id="conversations" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-white/60">Chargement des témoignages...</div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="conversations" className="py-20 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-surface to-dark-bg">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'radial-gradient(circle at 0% 50%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 50%, rgba(0, 212, 255, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 50%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-accent-gold text-sm font-bold uppercase tracking-wider">
              Témoignages Clients
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Conversations </span>
            <span className="text-gradient">Clients Satisfaits</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez les conversations authentiques de nos clients satisfaits
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-dark-card border border-dark-border rounded-2xl p-6 md:p-8 lg:p-12 shadow-2xl"
            >
              {/* Platform Badge */}
              {currentTestimonial.platform && (
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-accent-blue" />
                    <span className="text-white/60 text-sm font-semibold uppercase">
                      {currentTestimonial.platform}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent-gold text-accent-gold"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Client Name */}
              {currentTestimonial.client_name && (
                <div className="mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {currentTestimonial.client_name}
                  </h3>
                </div>
              )}

              {/* Conversation/Message */}
              <div className="space-y-4">
                {currentTestimonial.conversation ? (
                  <div className="bg-dark-surface rounded-xl p-4 md:p-6 border border-dark-border">
                    <div className="text-white/90 whitespace-pre-wrap leading-relaxed">
                      {currentTestimonial.conversation}
                    </div>
                  </div>
                ) : currentTestimonial.message ? (
                  <div className="bg-dark-surface rounded-xl p-4 md:p-6 border border-dark-border">
                    <div className="text-white/90 text-lg leading-relaxed">
                      &quot;{currentTestimonial.message}&quot;
                    </div>
                  </div>
                ) : null}

                {/* Image if available */}
                {currentTestimonial.image_url && (
                  <div className="mt-6 rounded-xl overflow-hidden border border-dark-border">
                    <img
                      src={currentTestimonial.image_url}
                      alt={`Témoignage ${currentTestimonial.client_name || ''}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 bg-dark-card/90 backdrop-blur-sm border border-dark-border rounded-full p-3 hover:bg-dark-card hover:border-accent-gold transition-all z-20"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={next}
                className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 bg-dark-card/90 backdrop-blur-sm border border-dark-border rounded-full p-3 hover:bg-dark-card hover:border-accent-gold transition-all z-20"
                aria-label="Suivant"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsAutoPlaying(false)
                      setTimeout(() => setIsAutoPlaying(true), 8000)
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-accent-gold'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Aller au témoignage ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}


