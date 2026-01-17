'use client'

import Link from 'next/link'
import { Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-dark-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Logo size="md" />
            </div>
            <p className="text-white/70 text-sm">
              Le meilleur abonnement IPTV en France. Service classé premier abonnement en Europe.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-accent-gold transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-white/70 hover:text-accent-gold transition-colors text-sm">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-accent-gold transition-colors text-sm">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-accent-gold transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#faq" className="text-white/70 hover:text-accent-gold transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="mailto:admin@franceabonnementiptv.com"
                  className="text-white/70 hover:text-accent-gold transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="tel:+33756754304"
                  className="text-white/70 hover:text-accent-gold transition-colors text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  +33 7 56 75 43 04
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white/70 hover:text-accent-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-accent-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-accent-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} France Abonnement IPTV. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}



