'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Mail, LogIn } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Normaliser l'email (minuscules, sans espaces)
      const normalizedEmail = email.trim().toLowerCase()
      
      console.log('🔐 Tentative de connexion:', { email: normalizedEmail })
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password.trim(), // Enlever les espaces du mot de passe
      })

      if (signInError) {
        console.error('❌ Erreur de connexion:', signInError)
        setError(signInError.message)
        return
      }
      
      console.log('✅ Connexion réussie:', { userId: data.user?.id, email: data.user?.email })

      if (data.user) {
        alert('Connecté avec succès ! Redirection vers l\'admin...')
        router.push('/admin')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }


  return (
    <main className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-dark-card border border-dark-border rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-blue rounded-full mb-4"
            >
              <Lock className="w-8 h-8 text-dark-bg" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Connexion Admin</h1>
            <p className="text-white/60">Accédez au panneau d'administration</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marouaneba.mb@gmail.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-gold transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-accent-gold to-accent-blue text-dark-bg font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-white/40 text-xs">
              Accès réservé aux administrateurs uniquement
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  )
}

