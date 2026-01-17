'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, BookOpen } from 'lucide-react'
import { BlogArticle } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogSection() {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('blog_articles')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(4)

        if (error) throw error
        setArticles(data || [])
      } catch (error) {
        console.error('Error fetching blog articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <section id="blog" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-white/60 text-center">Chargement des articles...</div>
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <section id="blog" className="py-20 px-4 relative overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
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
            <span className="text-accent-gold text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              Blog & Actualités
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Guide Complet </span>
            <span className="text-gradient">IPTV France</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez nos articles sur l&apos;IPTV, les guides pratiques et les actualités du meilleur abonnement IPTV en France
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {articles.map((article, index) => {
            // Générer alt text automatiquement basé sur les keywords
            const altText = article.seo_keywords && article.seo_keywords.length > 0
              ? `${article.seo_keywords[0]} - ${article.title}`
              : `Image ${article.title} - France Abonnement IPTV`

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-accent-gold transition-all duration-500 cursor-pointer"
              >
                <Link href={`/blog/${article.slug}`} className="block">
                  {/* Featured Image with WOW Effect */}
                  <div className="relative h-64 bg-dark-surface overflow-hidden">
                    {article.featured_image ? (
                      <>
                        <Image
                          src={article.featured_image}
                          alt={altText}
                          fill
                          className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          onError={(e) => {
                            console.error('❌ Erreur chargement image:', article.featured_image)
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent && !parent.querySelector('.fallback-image')) {
                              const fallback = document.createElement('div')
                              fallback.className = 'fallback-image h-full bg-gradient-to-br from-dark-surface via-accent-gold/10 to-dark-card flex items-center justify-center'
                              fallback.innerHTML = '<div class="text-center"><BookOpen class="w-20 h-20 text-accent-gold/40 mx-auto mb-2" /><p class="text-white/60 text-sm">Image non disponible</p></div>'
                              parent.appendChild(fallback)
                            }
                          }}
                          onLoad={() => {
                            console.log('✅ Image chargée avec succès:', article.featured_image)
                          }}
                        />
                        {/* Animated Gradient Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                          initial={{ opacity: 0.6 }}
                          whileHover={{ opacity: 0.8 }}
                          transition={{ duration: 0.3 }}
                        />
                        {/* Shine Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.8, ease: 'easeInOut' }}
                        />
                      </>
                    ) : (
                      <motion.div
                        className="h-full bg-gradient-to-br from-dark-surface via-accent-gold/10 to-dark-card flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BookOpen className="w-20 h-20 text-accent-gold/40" />
                      </motion.div>
                    )}
                    
                    {/* Floating Badge */}
                    <motion.div
                      className="absolute top-4 right-4 px-3 py-1 bg-accent-gold/90 backdrop-blur-sm rounded-full text-dark-bg text-xs font-bold"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                    >
                      Nouveau
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    {/* Animated Background Glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-gold/0 via-accent-gold/5 to-accent-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />

                    {/* Date */}
                    <motion.div
                      className="flex items-center gap-2 text-white/60 text-sm mb-3 relative z-10"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(article.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </motion.div>

                    {/* Title with Gradient Effect */}
                    <motion.h3
                      className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-gold group-hover:to-accent-blue transition-all duration-500 line-clamp-2 relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {article.title}
                    </motion.h3>

                    {/* Excerpt */}
                    <motion.p
                      className="text-white/70 mb-4 line-clamp-3 relative z-10"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {article.excerpt}
                    </motion.p>

                    {/* Read More with Animated Arrow */}
                    <motion.div
                      className="flex items-center gap-2 text-accent-gold font-semibold relative z-10"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ x: 5 }}
                    >
                      <span>Lire l&apos;article</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                      }}
                    />
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-blue text-dark-bg font-bold rounded-full hover:scale-105 transition-transform neon-glow"
          >
            Voir tous les articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

