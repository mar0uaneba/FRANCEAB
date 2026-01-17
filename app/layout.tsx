import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meilleur Abonnement IPTV en France | Top Abonnement Smart Europe',
  description: 'Découvrez le meilleur abonnement IPTV en France. Notre service est classé premier abonnement en Europe grâce à une stabilité 4K sans coupure. Choisissez votre abonnement annuel et profitez du top abonnement Smart du marché.',
  keywords: 'abonnement IPTV, meilleur abonnement IPTV, top abonnement Smart, premier abonnement Europe, abonnement annuel IPTV, France abonnement IPTV',
  openGraph: {
    title: 'Meilleur Abonnement IPTV en France | Top Abonnement Smart Europe',
    description: 'Découvrez le meilleur abonnement IPTV en France. Service classé premier abonnement en Europe.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className}>
        <ErrorBoundary />
        {children}
      </body>
    </html>
  )
}



