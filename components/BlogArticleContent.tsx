'use client'

import { BlogArticle } from '@/lib/supabase/types'
import { Calendar, User, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface BlogArticleContentProps {
  article: BlogArticle
}

export default function BlogArticleContent({ article }: BlogArticleContentProps) {
  // Générer alt text automatiquement basé sur les keywords
  const altText = article.seo_keywords && article.seo_keywords.length > 0
    ? `${article.seo_keywords[0]} - ${article.title} - France Abonnement IPTV`
    : `Image ${article.title} - France Abonnement IPTV`

  // Fonction pour convertir le HTML en composants React avec liens marketing
  const renderContent = (htmlContent: string) => {
    // Remplacer les liens vers /#pricing par des liens stylisés
    const processedContent = htmlContent.replace(
      /<a href="\/#pricing">([^<]+)<\/a>/g,
      '<a href="/#pricing" class="blog-cta-link">$1</a>'
    )

    return (
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-white/80 prose-p:leading-relaxed
          prose-ul:text-white/80 prose-li:text-white/80
          prose-strong:text-accent-gold prose-strong:font-bold
          prose-a:text-accent-blue prose-a:no-underline hover:prose-a:text-accent-gold
          prose-table:text-white/80
          prose-th:text-white prose-td:text-white/80
          blog-content"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    )
  }

  return (
    <article className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
      {/* Featured Image */}
      {article.featured_image ? (
        <div className="relative h-64 md:h-96 bg-dark-surface overflow-hidden">
          <Image
            src={article.featured_image}
            alt={altText}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
            onError={(e) => {
              console.error('❌ Erreur chargement image featured:', article.featured_image)
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
              console.log('✅ Image featured chargée avec succès:', article.featured_image)
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      ) : (
        <div className="relative h-64 md:h-96 bg-gradient-to-br from-dark-surface via-accent-gold/10 to-dark-card flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-20 h-20 text-accent-gold/40 mx-auto mb-2" />
            <p className="text-white/60 text-sm">Aucune image</p>
          </div>
        </div>
      )}

      {/* Article Header */}
      <div className="p-6 md:p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Meta */}
          <div className="flex items-center gap-4 text-white/60 text-sm mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(article.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Content */}
          <div className="mt-8">
            {renderContent(article.content)}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12 p-6 bg-gradient-to-r from-accent-gold/10 to-accent-blue/10 border border-accent-gold/30 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              Prêt à Profiter du Meilleur Abonnement IPTV ?
            </h3>
            <p className="text-white/80 mb-6">
              Rejoignez <strong>France Abonnement IPTV</strong>, le <strong>premier abonnement en Europe</strong> et le <strong>top abonnement Smart</strong> du marché.
            </p>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-blue text-dark-bg font-bold rounded-full hover:scale-105 transition-transform neon-glow"
            >
              Voir les Abonnements
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </article>
  )
}

