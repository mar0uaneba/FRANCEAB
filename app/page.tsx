import UrgencyBar from '@/components/UrgencyBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import NewReleases from '@/components/NewReleases'
import PricingSection from '@/components/PricingSection'
import ConversationsCarousel from '@/components/ConversationsCarousel'
import BentoGrid from '@/components/BentoGrid'
import BlogSection from '@/components/BlogSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Meilleur Abonnement IPTV en France | Top Abonnement Smart Europe',
  description: 'Découvrez le meilleur abonnement IPTV en France. Notre service est classé premier abonnement en Europe grâce à une stabilité 4K sans coupure. Choisissez votre abonnement annuel et profitez du top abonnement Smart du marché.',
  keywords: 'abonnement IPTV, meilleur abonnement IPTV, top abonnement Smart, premier abonnement Europe, abonnement annuel IPTV, France abonnement IPTV',
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <UrgencyBar />
      <Navbar />
      <Hero />
      <NewReleases />
      <PricingSection />
      <ConversationsCarousel />
      <BentoGrid />
      <BlogSection />
      <TestimonialsSection />
      <FAQ />
      <Footer />
    </main>
  )
}

