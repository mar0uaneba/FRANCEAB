import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À Propos - France Abonnement IPTV | Premier Service IPTV en Europe',
  description: 'Découvrez l\'histoire de France Abonnement IPTV, le meilleur service IPTV en France et en Europe. Notre mission est de vous offrir le top abonnement Smart avec une qualité 4K exceptionnelle.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


