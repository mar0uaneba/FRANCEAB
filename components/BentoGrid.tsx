'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Testimonial } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

export default function BentoGrid() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6)

        if (error) throw error
        setTestimonials(data || [])
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  if (loading || testimonials.length === 0) {
    return null
  }

  // Organiser les témoignages en grille asymétrique (Bento Grid)
  const gridLayout = [
    { row: 'span 2', col: 'span 1' },
    { row: 'span 1', col: 'span 1' },
    { row: 'span 1', col: 'span 1' },
    { row: 'span 1', col: 'span 2' },
    { row: 'span 1', col: 'span 1' },
    { row: 'span 1', col: 'span 1' },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Mur de Confiance - </span>
            <span className="text-gradient">Screenshots Clients</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez les captures d&apos;écran authentiques de nos clients satisfaits
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-dark-card border border-dark-border group cursor-pointer hover:border-accent-gold transition-all ${
                index === 0 ? 'md:row-span-2' : ''
              } ${index === 3 ? 'md:col-span-2' : ''}`}
            >
              {testimonial.image_url && (
                <div className="relative w-full h-full min-h-[200px]">
                  <Image
                    src={testimonial.image_url}
                    alt={`Témoignage ${testimonial.client_name || `client ${index + 1}`}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {testimonial.client_name && (
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-semibold">{testimonial.client_name}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



