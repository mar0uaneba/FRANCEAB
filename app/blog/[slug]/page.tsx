import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import BlogArticleContent from '@/components/BlogArticleContent'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import UrgencyBar from '@/components/UrgencyBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = await createClient()
  const { data: article } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!article) {
    return {
      title: 'Article non trouvé - France Abonnement IPTV',
    }
  }

  return {
    title: `${article.title} | France Abonnement IPTV`,
    description: article.seo_description || article.excerpt,
    keywords: article.seo_keywords?.join(', ') || 'France Abonnement IPTV, abonnement IPTV',
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
    },
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const supabase = await createClient()
  const { data: article, error } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (error || !article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-dark-bg">
      <UrgencyBar />
      <Navbar />
      <div className="pt-24 md:pt-28">
        <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-white/70 hover:text-accent-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        {/* Article Content */}
        <BlogArticleContent article={article} />
        </div>
      </div>
      <Footer />
    </main>
  )
}


