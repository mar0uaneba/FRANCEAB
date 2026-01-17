export interface Pack {
  id: string
  name: string
  price: number
  duration: number
  paypal_link: string | null
  features: string[]
  is_promo: boolean
  display_order: number | null
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  image_url: string
  client_name: string | null
  conversation: string | null
  message: string | null
  platform: string | null
  created_at: string
}

export interface Prospect {
  id: string
  name: string
  email: string
  phone: string
  pack_id: string | null
  created_at: string
}

export interface BlogArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string | null
  author: string
  published: boolean
  seo_keywords: string[]
  seo_description: string | null
  created_at: string
  updated_at: string
}


