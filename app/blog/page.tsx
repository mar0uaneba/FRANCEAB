import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import BlogPageClient from '@/components/BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog IPTV | Guide Complet France Abonnement IPTV',
  description: 'Découvrez nos articles sur l&apos;IPTV, guides pratiques et actualités du meilleur abonnement IPTV en France et en Europe.',
  keywords: 'blog IPTV, guide IPTV, France Abonnement IPTV, meilleur abonnement IPTV, actualités IPTV',
}

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return <BlogPageClient articles={articles || []} />
}


