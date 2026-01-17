'use client'

import Link from 'next/link'
import { Calendar, BookOpen, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BlogArticle } from '@/lib/supabase/types'
import UrgencyBar from '@/components/UrgencyBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface BlogPageClientProps {
  articles: BlogArticle[]
}

export default function BlogPageClient({ articles }: BlogPageClientProps) {
  return (
    <main className="min-h-screen bg-dark-bg">
      <UrgencyBar />
      <Navbar />
      <div className="pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Blog </span>
            <span className="text-gradient">IPTV France</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Guides complets, actualités et conseils sur le meilleur abonnement IPTV en France
          </p>
        </motion.div>

        {/* Articles Grid */}
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-accent-gold transition-all duration-300"
              >
                <Link href={`/blog/${article.slug}`}>
                  {/* Featured Image */}
                  {article.featured_image ? (
                    <div className="relative h-48 bg-dark-surface overflow-hidden">
                      <Image
                        src={article.featured_image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          console.error('❌ Erreur chargement image:', article.featured_image)
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent && !parent.querySelector('.fallback-image')) {
                            const fallback = document.createElement('div')
                            fallback.className = 'fallback-image h-full bg-gradient-to-br from-dark-surface to-dark-card flex items-center justify-center'
                            fallback.innerHTML = '<BookOpen class="w-16 h-16 text-accent-gold/30" />'
                            parent.appendChild(fallback)
                          }
                        }}
                        onLoad={() => {
                          console.log('✅ Image chargée avec succès:', article.featured_image)
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-dark-surface to-dark-card flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-accent-gold/30" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(article.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-accent-gold transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-white/70 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-accent-gold font-semibold group-hover:gap-4 transition-all">
                      <span>Lire l&apos;article</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-white/60">
            Aucun article disponible pour le moment
          </div>
        )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

