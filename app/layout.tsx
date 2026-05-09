import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Inter } from 'next/font/google'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meilleur Abonnement IPTV en France | Top Abonnement Smart Europe',
  description: 'Découvrez le meilleur abonnement IPTV en France. Notre service est classé premier abonnement en Europe grâce à une stabilité 4K sans coupure. Choisissez votre abonnement annuel et profitez du top abonnement...',
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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-754694957"
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-754694957');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ErrorBoundary />
        {children}
      </body>
    </html>
  )
}
