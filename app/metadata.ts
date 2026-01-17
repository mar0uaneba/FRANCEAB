import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: 'Meilleur Abonnement IPTV en France | Top Abonnement Smart Europe',
  description: 'Découvrez le meilleur abonnement IPTV en France. Notre service est classé premier abonnement en Europe grâce à une stabilité 4K sans coupure. Choisissez votre abonnement annuel et profitez du top abonnement Smart du marché.',
  keywords: 'abonnement IPTV, meilleur abonnement IPTV, top abonnement Smart, premier abonnement Europe, abonnement annuel IPTV, France abonnement IPTV',
  authors: [{ name: 'France Abonnement IPTV' }],
  creator: 'France Abonnement IPTV',
  publisher: 'France Abonnement IPTV',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://franceabonnementiptv.com'), // Remplacez par votre domaine
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://franceabonnementiptv.com',
    title: 'Meilleur Abonnement IPTV en France | Top Abonnement Smart Europe',
    description: 'Découvrez le meilleur abonnement IPTV en France. Service classé premier abonnement en Europe.',
    siteName: 'France Abonnement IPTV',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meilleur Abonnement IPTV en France | Top Abonnement Smart Europe',
    description: 'Découvrez le meilleur abonnement IPTV en France. Service classé premier abonnement en Europe.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}


