'use client'

import { useEffect } from 'react'

export default function ErrorBoundary() {
  useEffect(() => {
    // Fonction pour détecter les erreurs MetaMask
    const isMetaMaskError = (message: string) => {
      return (
        message.includes('MetaMask') ||
        message.includes('Failed to connect to MetaMask') ||
        message.includes('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn') ||
        message.includes('ethereum') ||
        message.includes('web3')
      )
    }

    // Ignorer les erreurs MetaMask dans console.error
    const originalError = console.error
    console.error = (...args: any[]) => {
      const errorMessage = args[0]?.toString() || ''
      
      if (isMetaMaskError(errorMessage)) {
        return // Ne pas afficher l'erreur
      }
      
      originalError.apply(console, args)
    }

    // Gérer les erreurs non capturées (window.onerror)
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || event.filename || ''
      
      if (isMetaMaskError(errorMessage)) {
        event.preventDefault()
        event.stopPropagation()
        return false
      }
    }

    // Gérer les promesses rejetées non capturées
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorMessage = event.reason?.message || event.reason?.toString() || ''
      
      if (isMetaMaskError(errorMessage)) {
        event.preventDefault()
        return false
      }
    }

    // Intercepter les erreurs au niveau le plus bas possible
    window.addEventListener('error', handleError, true)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Supprimer les erreurs MetaMask du DOM si elles apparaissent
    const observer = new MutationObserver(() => {
      // Chercher et masquer les overlays d'erreur Next.js contenant MetaMask
      const errorOverlay = document.querySelector('[data-nextjs-dialog]')
      if (errorOverlay) {
        const errorText = errorOverlay.textContent || ''
        if (isMetaMaskError(errorText)) {
          errorOverlay.remove()
        }
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      console.error = originalError
      window.removeEventListener('error', handleError, true)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      observer.disconnect()
    }
  }, [])

  return null
}

