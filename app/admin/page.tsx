'use client'

import { useEffect, useState } from 'react'
import { Pack, Testimonial, Prospect, BlogArticle } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit, Upload, X, ChevronUp, ChevronDown, LogOut, Flame, Download, FileText, FileSpreadsheet } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [packs, setPacks] = useState<Pack[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [activeTab, setActiveTab] = useState<'packs' | 'testimonials' | 'prospects' | 'blog' | 'users' | 'announcement'>('packs')
  const [announcementText, setAnnouncementText] = useState('')
  const [loadingAnnouncement, setLoadingAnnouncement] = useState(false)
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null)
  const [editArticleData, setEditArticleData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author: 'France Abonnement IPTV',
    published: true,
    seo_keywords: [] as string[],
    seo_description: '',
  })
  const [showAddArticle, setShowAddArticle] = useState(false)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()
  const [editingPack, setEditingPack] = useState<Pack | null>(null)
  const [editPackData, setEditPackData] = useState({
    name: '',
    price: '',
    duration: '',
    paypal_link: '',
    features: [] as string[],
    is_promo: false,
  })
  const [showAddTestimonial, setShowAddTestimonial] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState({
    client_name: '',
    conversation: '',
    message: '',
    platform: 'WhatsApp',
    image_url: '',
  })
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadingArticleImage, setUploadingArticleImage] = useState(false)
  const [articleImagePreview, setArticleImagePreview] = useState<string | null>(null)
  const [selectedArticleFile, setSelectedArticleFile] = useState<File | null>(null)
  const [showAddUser, setShowAddUser] = useState(false)
  const [adminUsers, setAdminUsers] = useState<any[]>([])
  const [newUser, setNewUser] = useState({ email: '', password: '' })

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const supabase = createClient()
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error checking auth:', error)
        router.push('/login')
        return
      }

      if (!session) {
        router.push('/login')
        return
      }

      setAuthenticated(true)
      fetchData()
    } catch (error) {
      console.error('Error checking auth:', error)
      router.push('/login')
    } finally {
      setCheckingAuth(false)
    }
  }

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        alert('Erreur lors de la déconnexion')
        return
      }

      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  async function fetchData() {
    try {
      const supabase = createClient()
      
      const [packsRes, testimonialsRes, prospectsRes, articlesRes, announcementRes, usersRes] = await Promise.all([
        supabase.from('packs').select('*').order('display_order', { ascending: true, nullsFirst: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('prospects').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_articles').select('*').order('created_at', { ascending: false }),
        supabase.from('site_settings').select('value').eq('key', 'urgency_bar_text').single(),
        fetch('/api/admin/users').then(res => res.json()).catch(() => ({ success: false, users: [] })),
      ])

      if (packsRes.data) setPacks(packsRes.data)
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data)
      if (prospectsRes.data) setProspects(prospectsRes.data)
      if (articlesRes.data) setArticles(articlesRes.data)
      if (announcementRes.data?.value) setAnnouncementText(announcementRes.data.value)
      if (usersRes.success && usersRes.users) setAdminUsers(usersRes.users)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAnnouncement = async () => {
    if (!announcementText.trim()) {
      alert('Le texte de l\'annonce ne peut pas être vide')
      return
    }

    setLoadingAnnouncement(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'urgency_bar_text',
          value: announcementText.trim(),
        })
        .select()
        .single()

      if (error) throw error

      alert('Annonce sauvegardée avec succès!')
      // Recharger la page pour voir les changements
      window.location.reload()
    } catch (error: any) {
      console.error('Error saving announcement:', error)
      alert(`Erreur lors de la sauvegarde: ${error.message || 'Erreur inconnue'}`)
    } finally {
      setLoadingAnnouncement(false)
    }
  }

  const handleAddAdminUser = async () => {
    if (!newUser.email || !newUser.password) {
      alert('Veuillez remplir tous les champs')
      return
    }

    if (newUser.password.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    try {
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création du compte')
      }

      alert('Compte admin créé avec succès!')
      setShowAddUser(false)
      setNewUser({ email: '', password: '' })
      fetchData() // Recharger la liste des utilisateurs
    } catch (error: any) {
      console.error('Error adding admin user:', error)
      alert(error.message || 'Erreur lors de la création du compte')
    }
  }

  const handleDeleteAdminUser = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce compte admin ?')) return

    try {
      const response = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la suppression')
      }

      alert('Compte admin supprimé avec succès!')
      setAdminUsers(adminUsers.filter((u) => u.id !== userId))
    } catch (error: any) {
      console.error('Error deleting admin user:', error)
      alert(error.message || 'Erreur lors de la suppression')
    }
  }

  const handleDeleteProspect = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce prospect ?')) return
    
    try {
      const supabase = createClient()
      const { error } = await supabase.from('prospects').delete().eq('id', id)
      if (error) throw error
      setProspects(prospects.filter((p) => p.id !== id))
      alert('Prospect supprimé avec succès!')
    } catch (error) {
      console.error('Error deleting prospect:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleExportPDF = () => {
    if (prospects.length === 0) {
      alert('Aucun prospect à exporter')
      return
    }

    // Créer le contenu HTML pour le PDF
    let htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Liste des Prospects</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Liste des Prospects - France Abonnement IPTV</h1>
          <p>Date d'export : ${new Date().toLocaleDateString('fr-FR')}</p>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
    `

    prospects.forEach((prospect) => {
      htmlContent += `
        <tr>
          <td>${prospect.name || ''}</td>
          <td>${prospect.email || ''}</td>
          <td>${prospect.phone || ''}</td>
          <td>${new Date(prospect.created_at).toLocaleDateString('fr-FR')}</td>
        </tr>
      `
    })

    htmlContent += `
            </tbody>
          </table>
        </body>
      </html>
    `

    // Créer une nouvelle fenêtre et imprimer
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.onload = () => {
        printWindow.print()
      }
    }
  }

  const handleExportExcel = () => {
    if (prospects.length === 0) {
      alert('Aucun prospect à exporter')
      return
    }

    // Créer le contenu CSV (compatible Excel)
    const headers = ['Nom', 'Email', 'Téléphone', 'Date']
    const csvRows = [
      headers.join(','),
      ...prospects.map((prospect) => {
        return [
          `"${(prospect.name || '').replace(/"/g, '""')}"`,
          `"${(prospect.email || '').replace(/"/g, '""')}"`,
          `"${(prospect.phone || '').replace(/"/g, '""')}"`,
          `"${new Date(prospect.created_at).toLocaleDateString('fr-FR')}"`,
        ].join(',')
      }),
    ]

    const csvContent = csvRows.join('\n')
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `prospects_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDeletePack = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce pack ?')) return
    
    try {
      const supabase = createClient()
      const { error } = await supabase.from('packs').delete().eq('id', id)
      if (error) throw error
      setPacks(packs.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Error deleting pack:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleMovePack = async (packId: string, direction: 'up' | 'down') => {
    const currentIndex = packs.findIndex((p) => p.id === packId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= packs.length) return

    const pack = packs[currentIndex]
    const targetPack = packs[newIndex]

    // Échanger les display_order
    const packOrder = pack.display_order ?? currentIndex
    const targetOrder = targetPack.display_order ?? newIndex

    // Mettre à jour l'état local immédiatement pour un feedback visuel
    const newPacks = [...packs]
    ;[newPacks[currentIndex], newPacks[newIndex]] = [newPacks[newIndex], newPacks[currentIndex]]
    // Mettre à jour aussi les display_order dans l'état local
    newPacks[currentIndex].display_order = targetOrder
    newPacks[newIndex].display_order = packOrder
    setPacks(newPacks)

    try {
      const supabase = createClient()
      
      // Mettre à jour les deux packs en même temps
      const [update1, update2] = await Promise.all([
        supabase
          .from('packs')
          .update({ display_order: targetOrder })
          .eq('id', pack.id),
        supabase
          .from('packs')
          .update({ display_order: packOrder })
          .eq('id', targetPack.id),
      ])

      if (update1.error) throw update1.error
      if (update2.error) throw update2.error

      // Recharger les packs depuis la base pour s'assurer que l'ordre est bien sauvegardé
      const { data: updatedPacks, error: fetchError } = await supabase
        .from('packs')
        .select('*')
        .order('display_order', { ascending: true, nullsFirst: false })

      if (fetchError) {
        console.error('Error fetching packs after move:', fetchError)
        // Ne pas jeter l'erreur, garder l'état local mis à jour
        alert('Ordre mis à jour localement. Vérifiez la connexion à la base de données.')
        return
      }

      // Seulement mettre à jour si on a reçu des données valides
      if (updatedPacks && updatedPacks.length > 0) {
        setPacks(updatedPacks)
        alert('Ordre des packs sauvegardé avec succès!')
      } else {
        // Si aucun pack n'est retourné, garder l'état local
        console.warn('Aucun pack retourné après le déplacement, conservation de l\'état local')
        alert('Ordre mis à jour localement. Vérifiez la connexion à la base de données.')
      }
    } catch (error) {
      console.error('Error moving pack:', error)
      // En cas d'erreur, garder l'état local mis à jour
      alert('Erreur lors de la sauvegarde. L\'ordre a été mis à jour localement mais pourrait ne pas être sauvegardé.')
    }
  }

  const handleEditPack = (pack: Pack) => {
    setEditingPack(pack)
    setEditPackData({
      name: pack.name,
      price: pack.price.toString(),
      duration: pack.duration.toString(),
      paypal_link: pack.paypal_link || '',
      features: pack.features || [],
      is_promo: pack.is_promo,
    })
  }

  const handleUpdatePack = async () => {
    if (!editingPack) return

    try {
      const supabase = createClient()
      
      // Préserver le display_order existant
      const currentPack = packs.find((p) => p.id === editingPack.id)
      const displayOrder = currentPack?.display_order ?? editingPack.display_order
      
      const { error } = await supabase
        .from('packs')
        .update({
          name: editPackData.name,
          price: parseFloat(editPackData.price),
          duration: parseInt(editPackData.duration),
          paypal_link: editPackData.paypal_link || null,
          features: editPackData.features,
          is_promo: editPackData.is_promo,
          display_order: displayOrder, // Préserver l'ordre
        })
        .eq('id', editingPack.id)

      if (error) throw error

      // Recharger les packs depuis la base pour s'assurer que l'ordre est préservé
      const { data: updatedPacks, error: fetchError } = await supabase
        .from('packs')
        .select('*')
        .order('display_order', { ascending: true, nullsFirst: false })

      if (fetchError) throw fetchError

      if (updatedPacks) {
        setPacks(updatedPacks)
      } else {
        // Fallback : mettre à jour la liste localement
        const localUpdatedPacks = packs.map((p) =>
          p.id === editingPack.id
            ? {
                ...p,
                name: editPackData.name,
                price: parseFloat(editPackData.price),
                duration: parseInt(editPackData.duration),
                paypal_link: editPackData.paypal_link || null,
                features: editPackData.features,
                is_promo: editPackData.is_promo,
                display_order: displayOrder,
              }
            : p
        )
        setPacks(localUpdatedPacks)
      }
      
      setEditingPack(null)
      alert('Pack modifié avec succès!')
    } catch (error) {
      console.error('Error updating pack:', error)
      alert('Erreur lors de la modification')
    }
  }

  const handleAddFeature = () => {
    const feature = prompt('Entrez une fonctionnalité:')
    if (feature) {
      setEditPackData({
        ...editPackData,
        features: [...editPackData.features, feature],
      })
    }
  }

  const handleRemoveFeature = (index: number) => {
    setEditPackData({
      ...editPackData,
      features: editPackData.features.filter((_, i) => i !== index),
    })
  }

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return
    
    try {
      const supabase = createClient()
      const { error } = await supabase.from('testimonials').delete().eq('id', id)
      if (error) throw error
      setTestimonials(testimonials.filter((t) => t.id !== id))
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleImageUpload = async (file: File) => {
    if (!file) {
      console.error('❌ Aucun fichier sélectionné')
      return
    }

    console.log('📤 Début de l\'upload:', { name: file.name, size: file.size, type: file.type })

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide')
      return
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image est trop grande. Taille maximale : 5MB')
      return
    }

    setUploadingImage(true)
    try {
      const supabase = createClient()
      
      // Créer un nom de fichier unique
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `testimonials/${fileName}`

      console.log('📁 Chemin du fichier:', filePath)

      // Uploader l'image
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('testimonials')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('❌ Erreur upload:', uploadError)
        if (uploadError.message.includes('not found') || uploadError.message.includes('Bucket')) {
          alert('Le bucket "testimonials" n\'existe pas. Veuillez le créer dans Supabase Storage > Storage > Create bucket')
        } else {
          alert(`Erreur lors de l'upload: ${uploadError.message}`)
        }
        throw uploadError
      }

      console.log('✅ Upload réussi:', uploadData)

      // Obtenir l'URL publique
      const { data: urlData } = supabase.storage
        .from('testimonials')
        .getPublicUrl(filePath)

      console.log('🔗 URL publique:', urlData?.publicUrl)

      if (urlData?.publicUrl) {
        const imageUrl = urlData.publicUrl
        console.log('✅ URL image obtenue:', imageUrl)
        
        // CORRECTION : Utiliser une fonction callback pour éviter le problème de closure
        setNewTestimonial((prev) => {
          const updated = { ...prev, image_url: imageUrl }
          console.log('📋 Nouveau state avec image URL:', updated)
          return updated
        })
        
        setImagePreview(imageUrl)
        setSelectedFile(null) // Réinitialiser le fichier sélectionné
        alert('✅ Image uploadée avec succès! L\'URL a été automatiquement remplie dans le champ ci-dessous.')
        console.log('✅ Image URL sauvegardée dans le state:', imageUrl)
      } else {
        console.error('❌ Aucune URL publique retournée')
        alert('Erreur: Impossible d\'obtenir l\'URL publique de l\'image')
      }
    } catch (error: any) {
      console.error('❌ Error uploading image:', error)
      alert(`Erreur lors de l'upload de l'image: ${error.message || 'Erreur inconnue'}. Vérifiez la console pour plus de détails.`)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Créer un aperçu local
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Upload d'image pour les articles de blog
  const handleArticleImageUpload = async (file: File) => {
    if (!file) {
      console.error('❌ Aucun fichier sélectionné')
      return
    }

    console.log('📤 Début de l\'upload article:', { name: file.name, size: file.size, type: file.type })

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide')
      return
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image est trop grande. Taille maximale : 5MB')
      return
    }

    setUploadingArticleImage(true)
    try {
      const supabase = createClient()
      
      // Vérifier que l'utilisateur est authentifié
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        console.error('❌ Erreur de session:', sessionError)
        alert('Vous devez être connecté pour uploader des images. Veuillez vous reconnecter.')
        router.push('/login')
        return
      }
      
      console.log('✅ Session authentifiée:', { userId: session.user.id, email: session.user.email })
      
      // Créer un nom de fichier unique
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `blog/${fileName}`

      console.log('📁 Chemin du fichier:', filePath)

      // Uploader l'image
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('❌ Erreur upload:', uploadError)
        if (uploadError.message.includes('not found') || uploadError.message.includes('Bucket')) {
          alert('Le bucket "blog" n\'existe pas. Veuillez le créer dans Supabase Storage > Storage > Create bucket')
        } else {
          alert(`Erreur lors de l'upload: ${uploadError.message}`)
        }
        throw uploadError
      }

      console.log('✅ Upload réussi:', uploadData)
      console.log('👤 Uploadé par utilisateur authentifié:', { userId: session.user.id, email: session.user.email })

      // Obtenir l'URL publique
      const { data: urlData } = supabase.storage
        .from('blog')
        .getPublicUrl(filePath)

      console.log('🔗 URL publique:', urlData?.publicUrl)

      if (urlData?.publicUrl) {
        const imageUrl = urlData.publicUrl
        console.log('✅ URL image obtenue:', imageUrl)
        console.log('💾 Cette URL sera automatiquement sauvegardée dans featured_image lors de la création/modification de l\'article')
        
        // CORRECTION : Utiliser une fonction callback pour éviter le problème de closure
        setEditArticleData((prev) => {
          const updated = { ...prev, featured_image: imageUrl }
          console.log('📋 Nouveau state avec image URL:', updated)
          return updated
        })
        
        setArticleImagePreview(imageUrl)
        setSelectedArticleFile(null) // Réinitialiser le fichier sélectionné
        alert('✅ Image uploadée avec succès! L\'URL a été automatiquement remplie. Elle sera sauvegardée dans featured_image lors de la création/modification de l\'article.')
        console.log('✅ Image URL sauvegardée dans le state, prête à être enregistrée dans la base de données')
      } else {
        console.error('❌ Aucune URL publique retournée')
        alert('Erreur: Impossible d\'obtenir l\'URL publique de l\'image')
      }
    } catch (error: any) {
      console.error('❌ Error uploading article image:', error)
      alert(`Erreur lors de l'upload de l'image: ${error.message || 'Erreur inconnue'}. Vérifiez la console pour plus de détails.`)
    } finally {
      setUploadingArticleImage(false)
    }
  }

  const handleArticleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedArticleFile(file)
      // Créer un aperçu local
      const reader = new FileReader()
      reader.onloadend = () => {
        setArticleImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Générer alt text automatiquement basé sur les keywords
  const generateAltText = (title: string, keywords: string[]) => {
    if (keywords && keywords.length > 0) {
      return `${keywords[0]} - ${title} - France Abonnement IPTV`
    }
    return `${title} - France Abonnement IPTV`
  }

  const handleAddTestimonial = async () => {
    if (!newTestimonial.conversation && !newTestimonial.message && !newTestimonial.image_url && !selectedFile) {
      alert('Veuillez remplir au moins un champ (conversation, message ou image)')
      return
    }

    // Si une image est sélectionnée mais pas encore uploadée, l'uploader d'abord
    if (selectedFile && !newTestimonial.image_url) {
      await handleImageUpload(selectedFile)
      // Attendre un peu pour que l'upload se termine
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('testimonials')
        .insert([{
          client_name: newTestimonial.client_name || null,
          conversation: newTestimonial.conversation || null,
          message: newTestimonial.message || null,
          platform: newTestimonial.platform || 'WhatsApp',
          image_url: newTestimonial.image_url || '',
        }])
        .select()
        .single()

      if (error) throw error
      
      setTestimonials([data, ...testimonials])
      setNewTestimonial({
        client_name: '',
        conversation: '',
        message: '',
        platform: 'WhatsApp',
        image_url: '',
      })
      setImagePreview(null)
      setSelectedFile(null)
      setShowAddTestimonial(false)
      alert('Témoignage ajouté avec succès!')
    } catch (error) {
      console.error('Error adding testimonial:', error)
      alert('Erreur lors de l\'ajout du témoignage')
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-white/60">Vérification de l&apos;authentification...</div>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null // Redirection en cours
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-white/60">Chargement...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-dark-bg pt-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gradient">Dashboard Admin</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-dark-border overflow-x-auto">
          {(['packs', 'testimonials', 'prospects', 'blog', 'announcement'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-accent-gold border-b-2 border-accent-gold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab === 'packs' && 'Packs'}
              {tab === 'testimonials' && 'Témoignages'}
              {tab === 'prospects' && 'Prospects'}
              {tab === 'blog' && 'Blog'}
              {tab === 'announcement' && 'Annonce'}
            </button>
          ))}
        </div>

        {/* Packs Tab */}
        {activeTab === 'packs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Gestion des Packs</h2>
              <button className="px-4 py-2 bg-accent-gold text-dark-bg rounded-lg font-semibold hover:bg-accent-gold/90 transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Ajouter un pack
              </button>
            </div>

            <div className="space-y-4">
              {packs.map((pack, index) => (
                <div
                  key={pack.id}
                  className="bg-dark-card border border-dark-border rounded-xl p-6 flex items-center gap-4"
                >
                  {/* Boutons de réorganisation */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleMovePack(pack.id, 'up')}
                      disabled={index === 0}
                      className={`p-2 rounded-lg transition-colors ${
                        index === 0
                          ? 'bg-dark-surface/50 text-white/30 cursor-not-allowed'
                          : 'bg-dark-surface border border-dark-border text-white hover:border-accent-gold hover:text-accent-gold'
                      }`}
                      title="Déplacer vers le haut"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleMovePack(pack.id, 'down')}
                      disabled={index === packs.length - 1}
                      className={`p-2 rounded-lg transition-colors ${
                        index === packs.length - 1
                          ? 'bg-dark-surface/50 text-white/30 cursor-not-allowed'
                          : 'bg-dark-surface border border-dark-border text-white hover:border-accent-gold hover:text-accent-gold'
                      }`}
                      title="Déplacer vers le bas"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Contenu du pack */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white/50 text-sm font-semibold">#{index + 1}</span>
                          <h3 className="text-xl font-bold text-white">{pack.name}</h3>
                        </div>
                        <p className="text-2xl font-bold text-accent-gold">
                          {pack.price}€ / {pack.duration} mois
                        </p>
                      </div>
                      {pack.is_promo && (
                        <span className="bg-accent-gold text-dark-bg px-2 py-1 rounded text-xs font-bold">
                          PROMO
                        </span>
                      )}
                    </div>

                    <ul className="space-y-1 mb-4 text-white/70 text-sm">
                      {pack.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditPack(pack)}
                        className="flex-1 px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white hover:border-accent-blue transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeletePack(pack.id)}
                        className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Pack Modal */}
            {editingPack && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-dark-card border border-dark-border rounded-xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Modifier le Pack</h3>
                    <button
                      onClick={() => setEditingPack(null)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2">Nom du pack</label>
                      <input
                        type="text"
                        value={editPackData.name}
                        onChange={(e) => setEditPackData({ ...editPackData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 mb-2">Prix (€)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editPackData.price}
                          onChange={(e) => setEditPackData({ ...editPackData, price: e.target.value })}
                          className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 mb-2">Durée (mois)</label>
                        <input
                          type="number"
                          value={editPackData.duration}
                          onChange={(e) => setEditPackData({ ...editPackData, duration: e.target.value })}
                          className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2">Lien PayPal</label>
                      <input
                        type="url"
                        value={editPackData.paypal_link}
                        onChange={(e) => setEditPackData({ ...editPackData, paypal_link: e.target.value })}
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold"
                        placeholder="https://paypal.me/..."
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-white/80">Fonctionnalités</label>
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="px-3 py-1 bg-accent-gold text-dark-bg rounded text-sm font-semibold hover:bg-accent-gold/90"
                        >
                          + Ajouter
                        </button>
                      </div>
                      <div className="space-y-2">
                        {editPackData.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => {
                                const newFeatures = [...editPackData.features]
                                newFeatures[index] = e.target.value
                                setEditPackData({ ...editPackData, features: newFeatures })
                              }}
                              className="flex-1 px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(index)}
                              className="px-3 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-400 hover:bg-red-500/30"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="is_promo"
                        checked={editPackData.is_promo}
                        onChange={(e) => setEditPackData({ ...editPackData, is_promo: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label htmlFor="is_promo" className="text-white/80">
                        Pack promotionnel
                      </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleUpdatePack}
                        className="flex-1 px-6 py-3 bg-accent-gold text-dark-bg rounded-lg font-semibold hover:bg-accent-gold/90 transition-colors"
                      >
                        Enregistrer
                      </button>
                      <button
                        onClick={() => setEditingPack(null)}
                        className="px-6 py-3 bg-dark-surface border border-dark-border text-white rounded-lg hover:bg-dark-card transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Gestion des Témoignages</h2>
              <button 
                onClick={() => setShowAddTestimonial(!showAddTestimonial)}
                className="px-4 py-2 bg-accent-gold text-dark-bg rounded-lg font-semibold hover:bg-accent-gold/90 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {showAddTestimonial ? 'Annuler' : 'Ajouter un témoignage'}
              </button>
            </div>

            {/* Add Testimonial Form */}
            {showAddTestimonial && (
              <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Nouveau Témoignage</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 mb-2">Nom du client (optionnel)</label>
                    <input
                      type="text"
                      value={newTestimonial.client_name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, client_name: e.target.value })}
                      className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold"
                      placeholder="Ex: Jean Dupont"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-2">Plateforme</label>
                    <select
                      value={newTestimonial.platform}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, platform: e.target.value })}
                      className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold"
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Telegram">Telegram</option>
                      <option value="Email">Email</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Conversation complète (optionnel)</label>
                    <textarea
                      value={newTestimonial.conversation}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, conversation: e.target.value })}
                      className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold min-h-[150px]"
                      placeholder="Collez ici la conversation complète du client..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Message principal (optionnel)</label>
                    <textarea
                      value={newTestimonial.message}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
                      className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold min-h-[100px]"
                      placeholder="Ou entrez un message principal..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Image du témoignage</label>
                    
                    {/* Upload d'image depuis l'ordinateur */}
                    <div className="mb-3">
                      <label className="block text-white/60 text-sm mb-2">
                        Uploader une image depuis votre ordinateur
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="testimonial-image-upload"
                          disabled={uploadingImage}
                        />
                        <label
                          htmlFor="testimonial-image-upload"
                          className={`flex-1 px-4 py-2 bg-accent-blue/20 border border-accent-blue rounded-lg text-accent-blue hover:bg-accent-blue/30 transition-colors cursor-pointer flex items-center justify-center gap-2 ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <Upload className="w-4 h-4" />
                          {uploadingImage ? 'Upload en cours...' : 'Choisir une image'}
                        </label>
                        {selectedFile && !uploadingImage && (
                          <button
                            onClick={async () => {
                              await handleImageUpload(selectedFile)
                            }}
                            className="px-4 py-2 bg-accent-gold text-dark-bg font-bold rounded-lg hover:bg-accent-gold/90 transition-colors"
                          >
                            Uploader
                          </button>
                        )}
                      </div>
                      {imagePreview && (
                        <div className="mt-3 relative">
                          <img
                            src={imagePreview}
                            alt="Aperçu"
                            className="w-full h-48 object-cover rounded-lg border border-dark-border"
                          />
                          <button
                            onClick={() => {
                              setImagePreview(null)
                              setSelectedFile(null)
                              setNewTestimonial({ ...newTestimonial, image_url: '' })
                            }}
                            className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <p className="text-white/60 text-xs mt-2">
                            ✅ Image prête ! L&apos;URL a été automatiquement remplie ci-dessous.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Ou entrer une URL */}
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Ou entrer une URL d&apos;image
                      </label>
                      <input
                        type="url"
                        value={newTestimonial.image_url}
                        onChange={(e) => {
                          setNewTestimonial({ ...newTestimonial, image_url: e.target.value })
                          setImagePreview(e.target.value || null)
                        }}
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleAddTestimonial}
                      className="px-6 py-2 bg-accent-gold text-dark-bg rounded-lg font-semibold hover:bg-accent-gold/90 transition-colors"
                    >
                      Ajouter
                    </button>
                    <button
                      onClick={() => {
                        setShowAddTestimonial(false)
                        setNewTestimonial({
                          client_name: '',
                          conversation: '',
                          message: '',
                          platform: 'WhatsApp',
                          image_url: '',
                        })
                        setImagePreview(null)
                        setSelectedFile(null)
                      }}
                      className="px-6 py-2 bg-dark-surface border border-dark-border text-white rounded-lg hover:bg-dark-card transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-dark-card border border-dark-border rounded-xl overflow-hidden"
                >
                  <div className="aspect-video bg-dark-surface relative">
                    {testimonial.image_url && (
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.client_name || 'Témoignage'}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-white font-semibold mb-1">
                      {testimonial.client_name || 'Client anonyme'}
                    </p>
                    {testimonial.platform && (
                      <p className="text-white/60 text-sm mb-2">{testimonial.platform}</p>
                    )}
                    {(testimonial.conversation || testimonial.message) && (
                      <p className="text-white/70 text-sm mb-3 line-clamp-2">
                        {testimonial.conversation || testimonial.message}
                      </p>
                    )}
                    <button
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="w-full px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prospects Tab */}
        {activeTab === 'prospects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Prospects</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleExportPDF}
                  disabled={prospects.length === 0}
                  className="px-4 py-2 bg-accent-blue/20 border border-accent-blue rounded-lg text-accent-blue hover:bg-accent-blue/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Télécharger PDF
                </button>
                <button
                  onClick={handleExportExcel}
                  disabled={prospects.length === 0}
                  className="px-4 py-2 bg-green-500/20 border border-green-500 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Télécharger Excel
                </button>
              </div>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-dark-surface">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Nom</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Téléphone</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prospects.map((prospect) => (
                    <tr
                      key={prospect.id}
                      className="border-t border-dark-border hover:bg-dark-surface/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-white/80">{prospect.name}</td>
                      <td className="px-6 py-4 text-white/80">{prospect.email}</td>
                      <td className="px-6 py-4 text-white/80">{prospect.phone}</td>
                      <td className="px-6 py-4 text-white/60 text-sm">
                        {new Date(prospect.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteProspect(prospect.id)}
                          className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {prospects.length === 0 && (
                <div className="p-8 text-center text-white/60">
                  Aucun prospect pour le moment
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Articles de Blog</h2>
              <button
                      onClick={() => {
                        setShowAddArticle(true)
                        setEditingArticle(null)
                        setEditArticleData({
                          title: '',
                          slug: '',
                          excerpt: '',
                          content: '',
                          featured_image: '',
                          author: 'France Abonnement IPTV',
                          published: true,
                          seo_keywords: [],
                          seo_description: '',
                        })
                        setArticleImagePreview(null)
                        setSelectedArticleFile(null)
                      }}
                className="px-6 py-3 bg-accent-gold text-dark-bg font-bold rounded-lg hover:bg-accent-gold/90 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Nouvel Article
              </button>
            </div>

            {/* Articles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-dark-card border border-dark-border rounded-xl p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                      <p className="text-white/70 text-sm mb-2 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-white/60 text-xs">
                        <span>Slug: {article.slug}</span>
                        <span className={article.published ? 'text-green-400' : 'text-red-400'}>
                          {article.published ? 'Publié' : 'Brouillon'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingArticle(article)
                        setEditArticleData({
                          title: article.title,
                          slug: article.slug,
                          excerpt: article.excerpt,
                          content: article.content,
                          featured_image: article.featured_image || '',
                          author: article.author,
                          published: article.published,
                          seo_keywords: article.seo_keywords || [],
                          seo_description: article.seo_description || '',
                        })
                        setArticleImagePreview(article.featured_image || null)
                        setSelectedArticleFile(null)
                        setShowAddArticle(true)
                      }}
                      className="flex-1 px-4 py-2 bg-accent-blue/20 border border-accent-blue rounded-lg text-accent-blue hover:bg-accent-blue/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Modifier
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return
                        try {
                          const supabase = createClient()
                          const { error } = await supabase
                            .from('blog_articles')
                            .delete()
                            .eq('id', article.id)
                          if (error) throw error
                          setArticles(articles.filter((a) => a.id !== article.id))
                          alert('Article supprimé avec succès!')
                        } catch (error) {
                          console.error('Error deleting article:', error)
                          alert('Erreur lors de la suppression')
                        }
                      }}
                      className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {articles.length === 0 && (
              <div className="text-center py-12 text-white/60">
                Aucun article pour le moment
              </div>
            )}

            {/* Add/Edit Article Modal */}
            {showAddArticle && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-dark-card border border-dark-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-dark-border flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-white">
                      {editingArticle ? 'Modifier l\'article' : 'Nouvel Article'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowAddArticle(false)
                        setEditingArticle(null)
                      }}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2">Titre *</label>
                      <input
                        type="text"
                        value={editArticleData.title}
                        onChange={(e) => {
                          setEditArticleData({
                            ...editArticleData,
                            title: e.target.value,
                            slug: e.target.value
                              .toLowerCase()
                              .normalize('NFD')
                              .replace(/[\u0300-\u036f]/g, '')
                              .replace(/[^a-z0-9]+/g, '-')
                              .replace(/^-+|-+$/g, ''),
                          })
                        }}
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white"
                        placeholder="Titre de l'article"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2">Slug (URL) *</label>
                      <input
                        type="text"
                        value={editArticleData.slug}
                        onChange={(e) =>
                          setEditArticleData({ ...editArticleData, slug: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white"
                        placeholder="slug-de-l-article"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2">Extrait *</label>
                      <textarea
                        value={editArticleData.excerpt}
                        onChange={(e) =>
                          setEditArticleData({ ...editArticleData, excerpt: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white"
                        rows={3}
                        placeholder="Résumé court de l'article"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2">Contenu (HTML) *</label>
                      <textarea
                        value={editArticleData.content}
                        onChange={(e) =>
                          setEditArticleData({ ...editArticleData, content: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white font-mono text-sm"
                        rows={15}
                        placeholder="<h2>Titre</h2><p>Contenu...</p>"
                      />
                      <p className="text-white/60 text-xs mt-2">
                        Utilisez du HTML. Pour les liens vers les abonnements, utilisez :{' '}
                        <code className="bg-dark-surface px-2 py-1 rounded">
                          &lt;a href=&quot;/#pricing&quot;&gt;texte&lt;/a&gt;
                        </code>
                      </p>
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2">Image à la une</label>
                      
                      {/* Upload d'image depuis l'ordinateur */}
                      <div className="mb-3">
                        <label className="block text-white/60 text-sm mb-2">
                          Uploader une image depuis votre ordinateur
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleArticleFileSelect}
                            className="hidden"
                            id="article-image-upload"
                            disabled={uploadingArticleImage}
                          />
                          <label
                            htmlFor="article-image-upload"
                            className="flex-1 px-4 py-2 bg-accent-blue/20 border border-accent-blue rounded-lg text-accent-blue hover:bg-accent-blue/30 transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <Upload className="w-4 h-4" />
                            {uploadingArticleImage ? 'Upload en cours...' : 'Choisir une image'}
                          </label>
                          {selectedArticleFile && !uploadingArticleImage && (
                            <button
                              onClick={async () => {
                                await handleArticleImageUpload(selectedArticleFile)
                              }}
                              className="px-4 py-2 bg-accent-gold text-dark-bg font-bold rounded-lg hover:bg-accent-gold/90 transition-colors"
                            >
                              Uploader
                            </button>
                          )}
                        </div>
                        {articleImagePreview && (
                          <div className="mt-3 relative">
                            <img
                              src={articleImagePreview}
                              alt="Aperçu"
                              className="w-full h-48 object-cover rounded-lg border border-dark-border"
                            />
                            <button
                              onClick={() => {
                                setArticleImagePreview(null)
                                setSelectedArticleFile(null)
                                setEditArticleData({ ...editArticleData, featured_image: '' })
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <p className="text-white/60 text-xs mt-2">
                              ✅ Image prête ! L&apos;URL a été automatiquement remplie ci-dessous.
                            </p>
                          </div>
                        )}
                        {!articleImagePreview && editArticleData.featured_image && (
                          <div className="mt-3">
                            <p className="text-white/60 text-xs mb-2">Image actuelle :</p>
                            <img
                              src={editArticleData.featured_image}
                              alt="Image actuelle"
                              className="w-full h-48 object-cover rounded-lg border border-dark-border"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                const parent = target.parentElement
                                if (parent) {
                                  parent.innerHTML = '<p class="text-red-400 text-sm">❌ Erreur : Impossible de charger l\'image. Vérifiez l\'URL.</p>'
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Ou entrer une URL */}
                      <div>
                        <label className="block text-white/60 text-sm mb-2">
                          Ou entrer une URL d&apos;image
                        </label>
                        <input
                          type="text"
                          value={editArticleData.featured_image}
                          onChange={(e) => {
                            setEditArticleData({ ...editArticleData, featured_image: e.target.value })
                            setArticleImagePreview(e.target.value || null)
                          }}
                          className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      {/* Alt text automatique */}
                      {editArticleData.featured_image && (
                        <div className="mt-2 p-3 bg-dark-surface/50 rounded-lg">
                          <p className="text-white/60 text-xs mb-1">Alt text généré automatiquement :</p>
                          <p className="text-accent-gold text-sm font-mono">
                            {generateAltText(editArticleData.title, editArticleData.seo_keywords)}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2">Auteur</label>
                      <input
                        type="text"
                        value={editArticleData.author}
                        onChange={(e) =>
                          setEditArticleData({ ...editArticleData, author: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2">Mots-clés SEO (séparés par des virgules)</label>
                      <input
                        type="text"
                        value={editArticleData.seo_keywords.join(', ')}
                        onChange={(e) =>
                          setEditArticleData({
                            ...editArticleData,
                            seo_keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white"
                        placeholder="France Abonnement IPTV, meilleur abonnement IPTV"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 mb-2">Description SEO</label>
                      <textarea
                        value={editArticleData.seo_description}
                        onChange={(e) =>
                          setEditArticleData({ ...editArticleData, seo_description: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white"
                        rows={2}
                        placeholder="Description pour les moteurs de recherche"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="published"
                        checked={editArticleData.published}
                        onChange={(e) =>
                          setEditArticleData({ ...editArticleData, published: e.target.checked })
                        }
                        className="w-5 h-5"
                      />
                      <label htmlFor="published" className="text-white/80">
                        Publié
                      </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={async () => {
                          if (!editArticleData.title || !editArticleData.slug || !editArticleData.content) {
                            alert('Veuillez remplir tous les champs obligatoires')
                            return
                          }

                          try {
                            const supabase = createClient()
                            // Vérifier les données avant sauvegarde
                            console.log('💾 Données à sauvegarder:', {
                              title: editArticleData.title,
                              featured_image: editArticleData.featured_image,
                              hasImage: !!editArticleData.featured_image,
                              imageLength: editArticleData.featured_image?.length || 0
                            })

                            if (editingArticle) {
                              // Update
                              const updateData = {
                                title: editArticleData.title,
                                slug: editArticleData.slug,
                                excerpt: editArticleData.excerpt,
                                content: editArticleData.content,
                                featured_image: editArticleData.featured_image && editArticleData.featured_image.trim() !== '' ? editArticleData.featured_image : null,
                                author: editArticleData.author,
                                published: editArticleData.published,
                                seo_keywords: editArticleData.seo_keywords,
                                seo_description: editArticleData.seo_description || null,
                              }
                              
                              console.log('📤 Données envoyées à Supabase (UPDATE):', updateData)
                              
                              const { data, error } = await supabase
                                .from('blog_articles')
                                .update(updateData)
                                .eq('id', editingArticle.id)
                                .select()
                                .single()

                              if (error) {
                                console.error('❌ Erreur Supabase:', error)
                                throw error
                              }
                              console.log('✅ Article modifié avec succès:', data)
                              console.log('📸 Image featured sauvegardée:', data.featured_image)
                              setArticles(
                                articles.map((a) => (a.id === editingArticle.id ? data : a))
                              )
                              alert('Article modifié avec succès!')
                              
                              // Recharger les données pour voir les images
                              fetchData()
                            } else {
                              // Insert
                              const insertData = {
                                title: editArticleData.title,
                                slug: editArticleData.slug,
                                excerpt: editArticleData.excerpt,
                                content: editArticleData.content,
                                featured_image: editArticleData.featured_image && editArticleData.featured_image.trim() !== '' ? editArticleData.featured_image : null,
                                author: editArticleData.author,
                                published: editArticleData.published,
                                seo_keywords: editArticleData.seo_keywords,
                                seo_description: editArticleData.seo_description || null,
                              }
                              
                              console.log('📤 Données envoyées à Supabase (INSERT):', insertData)
                              
                              const { data, error } = await supabase
                                .from('blog_articles')
                                .insert([insertData])
                                .select()
                                .single()

                              if (error) {
                                console.error('❌ Erreur Supabase:', error)
                                throw error
                              }
                              console.log('✅ Article créé avec succès:', data)
                              console.log('📸 Image featured sauvegardée:', data.featured_image)
                              setArticles([data, ...articles])
                              alert('Article ajouté avec succès!')
                            }

                            setShowAddArticle(false)
                            setEditingArticle(null)
                            setArticleImagePreview(null)
                            setSelectedArticleFile(null)
                          } catch (error: any) {
                            console.error('Error saving article:', error)
                            alert(`Erreur: ${error.message}`)
                          }
                        }}
                        className="flex-1 px-6 py-3 bg-accent-gold text-dark-bg font-bold rounded-lg hover:bg-accent-gold/90 transition-colors"
                      >
                        {editingArticle ? 'Enregistrer' : 'Créer'}
                      </button>
                      <button
                        onClick={() => {
                          setShowAddArticle(false)
                          setEditingArticle(null)
                          setArticleImagePreview(null)
                          setSelectedArticleFile(null)
                        }}
                        className="px-6 py-3 bg-dark-surface border border-dark-border text-white rounded-lg hover:bg-dark-surface/80 transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Announcement Tab - Gestion de l'Annonce */}
        {activeTab === 'announcement' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Gestion de l&apos;Annonce</h2>
              <p className="text-white/60 text-sm">
                Modifiez le texte affiché dans la barre d&apos;annonce en haut de la page
              </p>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Texte de l&apos;annonce *
                  </label>
                  <textarea
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent-gold transition-colors resize-y min-h-[100px]"
                    placeholder="OFFRE LIMITÉE: -50% abonnement 12 mois - 7 places restantes"
                    rows={3}
                  />
                  <p className="text-white/60 text-xs mt-2">
                    Le texte sera affiché dans la barre d&apos;annonce en haut de toutes les pages. Utilisez <strong className="text-accent-gold">OFFRE LIMITÉE</strong> pour mettre en avant.
                  </p>
                </div>

                {/* Aperçu */}
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Aperçu</label>
                  <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <Flame className="w-4 h-4 text-accent-gold animate-pulse flex-shrink-0" />
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {announcementText || 'OFFRE LIMITÉE: -50% abonnement 12 mois - 7 places restantes'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSaveAnnouncement}
                    disabled={loadingAnnouncement || !announcementText.trim()}
                    className="px-6 py-3 bg-accent-gold text-dark-bg font-bold rounded-lg hover:bg-accent-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loadingAnnouncement ? (
                      <>
                        <div className="w-5 h-5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      'Enregistrer l&apos;annonce'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab - Gestion des Comptes Admin */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Gestion des Comptes Admin</h2>
              <button
                onClick={() => setShowAddUser(!showAddUser)}
                className="px-4 py-2 bg-accent-gold text-dark-bg rounded-lg font-semibold hover:bg-accent-gold/90 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {showAddUser ? 'Annuler' : 'Ajouter un compte admin'}
              </button>
            </div>

            {/* Add User Form */}
            {showAddUser && (
              <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Nouveau Compte Admin</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 mb-2">Email *</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold"
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2">Mot de passe *</label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-accent-gold"
                      placeholder="Minimum 6 caractères"
                    />
                    <p className="text-white/60 text-xs mt-1">Le mot de passe doit contenir au moins 6 caractères</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddAdminUser}
                      className="px-6 py-2 bg-accent-gold text-dark-bg rounded-lg font-semibold hover:bg-accent-gold/90 transition-colors"
                    >
                      Créer le compte
                    </button>
                    <button
                      onClick={() => {
                        setShowAddUser(false)
                        setNewUser({ email: '', password: '' })
                      }}
                      className="px-6 py-2 bg-dark-surface border border-dark-border text-white rounded-lg hover:bg-dark-card transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Users List */}
            <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-dark-surface">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Date de création</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Dernière connexion</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Statut</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-white/60">
                        Aucun compte admin pour le moment
                      </td>
                    </tr>
                  ) : (
                    adminUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-t border-dark-border hover:bg-dark-surface/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-white/80">{user.email}</td>
                        <td className="px-6 py-4 text-white/60 text-sm">
                          {user.created_at
                            ? new Date(user.created_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })
                            : '-'}
                        </td>
                        <td className="px-6 py-4 text-white/60 text-sm">
                          {user.last_sign_in_at
                            ? new Date(user.last_sign_in_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })
                            : 'Jamais connecté'}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              user.email_confirmed_at
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {user.email_confirmed_at ? 'Confirmé' : 'En attente'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteAdminUser(user.id)}
                            className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}


