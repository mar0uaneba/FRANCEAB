'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'text-base md:text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-3xl md:text-4xl',
  }

  return (
    <Link href="/" className={`flex items-center space-x-2 group ${className}`}>
      {/* Icône/TV avec gradient */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        className="relative"
      >
        <div className={`relative ${
          size === 'sm' ? 'w-6 h-6 md:w-7 md:h-7' :
          size === 'md' ? 'w-7 h-7 md:w-8 md:h-8' :
          'w-10 h-10 md:w-12 md:h-12'
        }`}>
          {/* Fond avec gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold via-accent-blue to-accent-gold rounded-lg opacity-80 blur-sm group-hover:opacity-100 transition-opacity" />
          {/* Icône TV */}
          <div className="relative w-full h-full bg-gradient-to-br from-accent-gold to-accent-blue rounded-lg flex items-center justify-center border-2 border-white/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={`text-white ${
                size === 'sm' ? 'w-4 h-4 md:w-5 md:h-5' :
                size === 'md' ? 'w-5 h-5 md:w-6 md:h-6' :
                'w-6 h-6 md:w-7 md:h-7'
              }`}
            >
              <rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Texte avec gradient */}
      {showText && (
        <motion.span
          className={`font-bold ${sizeClasses[size]} group-hover:scale-105 transition-transform`}
        >
          <span className="text-accent-gold">France</span>{' '}
          <span className="text-accent-blue">Abonnement</span>{' '}
          <span className="bg-gradient-to-r from-accent-blue via-accent-gold to-accent-blue bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">IPTV</span>
        </motion.span>
      )}
    </Link>
  )
}

