// TMDB API Integration
// Pour obtenir une clé API gratuite : https://www.themoviedb.org/settings/api

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'your_api_key_here'
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export interface TMDBMovie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
  overview: string
}

export interface TMDBTV {
  id: number
  name: string
  poster_path: string | null
  first_air_date: string
  vote_average: number
  overview: string
}

// Rechercher un film par titre
export async function searchMovie(query: string): Promise<TMDBMovie | null> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=fr-FR`
    )
    const data = await response.json()
    if (data.results && data.results.length > 0) {
      return data.results[0]
    }
    return null
  } catch (error) {
    console.error('Error searching movie:', error)
    return null
  }
}

// Rechercher une série par titre
export async function searchTV(query: string): Promise<TMDBTV | null> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=fr-FR`
    )
    const data = await response.json()
    if (data.results && data.results.length > 0) {
      return data.results[0]
    }
    return null
  } catch (error) {
    console.error('Error searching TV:', error)
    return null
  }
}

// Obtenir les films populaires
export async function getPopularMovies(): Promise<TMDBMovie[]> {
  try {
    // Vérifier si l'API key est valide
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_api_key_here') {
      return []
    }
    
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=1`,
      { next: { revalidate: 21600 } } // Cache 6 heures (réduit les appels API)
    )
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    
    const data = await response.json()
    // Filtrer seulement les films avec des posters
    return (data.results || []).filter((movie: TMDBMovie) => movie.poster_path)
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    return []
  }
}

// Obtenir les séries populaires
export async function getPopularTV(): Promise<TMDBTV[]> {
  try {
    // Vérifier si l'API key est valide
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_api_key_here') {
      return []
    }
    
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=1`,
      { next: { revalidate: 21600 } } // Cache 6 heures (réduit les appels API)
    )
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    
    const data = await response.json()
    // Filtrer seulement les séries avec des posters
    return (data.results || []).filter((tv: TMDBTV) => tv.poster_path)
  } catch (error) {
    console.error('Error fetching popular TV:', error)
    return []
  }
}

// Obtenir l'URL complète de l'image
export function getImageUrl(posterPath: string | null): string {
  if (!posterPath || posterPath === 'null' || posterPath.trim() === '') {
    // Retourner null pour que le composant puisse gérer le fallback
    return ''
  }
  return `${TMDB_IMAGE_BASE_URL}${posterPath}`
}

// Mapper les films populaires vers notre format
export function mapMovieToMediaItem(movie: TMDBMovie, isNew: boolean = true) {
  // Vérifier que la date est valide
  let year = new Date().getFullYear()
  if (movie.release_date) {
    const releaseYear = new Date(movie.release_date).getFullYear()
    if (!isNaN(releaseYear)) {
      year = releaseYear
    }
  }

  return {
    id: `movie-${movie.id}`,
    tmdbId: movie.id,
    title: movie.title,
    type: 'film' as const,
    image: getImageUrl(movie.poster_path),
    rating: Math.round(movie.vote_average * 10) / 10,
    year,
    isNew,
  }
}

// Mapper les séries vers notre format
export function mapTVToMediaItem(tv: TMDBTV, isNew: boolean = true) {
  // Vérifier que la date est valide
  let year = new Date().getFullYear()
  if (tv.first_air_date) {
    const airYear = new Date(tv.first_air_date).getFullYear()
    if (!isNaN(airYear)) {
      year = airYear
    }
  }

  return {
    id: `tv-${tv.id}`,
    tmdbId: tv.id,
    title: tv.name,
    type: 'serie' as const,
    image: getImageUrl(tv.poster_path),
    rating: Math.round(tv.vote_average * 10) / 10,
    year,
    isNew,
  }
}

// Fonction pour obtenir les IDs TMDB des films populaires
export async function getMoviePosterByTitle(title: string): Promise<string | null> {
  try {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_api_key_here') {
      return null
    }
    
    const movie = await searchMovie(title)
    if (movie && movie.poster_path) {
      return getImageUrl(movie.poster_path)
    }
    return null
  } catch (error) {
    console.error(`Error getting poster for ${title}:`, error)
    return null
  }
}

// Fonction pour obtenir les IDs TMDB des séries populaires
export async function getTVPosterByTitle(title: string): Promise<string | null> {
  try {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_api_key_here') {
      return null
    }
    
    const tv = await searchTV(title)
    if (tv && tv.poster_path) {
      return getImageUrl(tv.poster_path)
    }
    return null
  } catch (error) {
    console.error(`Error getting poster for ${title}:`, error)
    return null
  }
}

// Interface pour les vidéos TMDB
export interface TMDBVideo {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

// Obtenir les vidéos (trailers) d'un film
export async function getMovieVideos(movieId: number): Promise<TMDBVideo[]> {
  try {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_api_key_here') {
      return []
    }
    
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=fr-FR`
    )
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    
    const data = await response.json()
    // Filtrer pour obtenir les trailers YouTube (officiels et non-officiels)
    // Prioriser les trailers officiels, mais accepter aussi les non-officiels
    const allVideos = (data.results || []).filter(
      (video: TMDBVideo) => 
        video.site === 'YouTube' && 
        (video.type === 'Trailer' || video.type === 'Teaser' || video.type === 'Clip' || video.type === 'Featurette')
    )
    
    // Trier : officiels en premier, puis par type (Trailer > Teaser > Clip > Featurette)
    return allVideos.sort((a, b) => {
      // Prioriser les officiels
      if (a.official && !b.official) return -1
      if (!a.official && b.official) return 1
      
      // Puis par type
      const typeOrder: Record<string, number> = { 'Trailer': 0, 'Teaser': 1, 'Clip': 2, 'Featurette': 3 }
      return (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99)
    })
  } catch (error) {
    console.error(`Error fetching movie videos for ${movieId}:`, error)
    return []
  }
}

// Obtenir les vidéos (trailers) d'une série
export async function getTVVideos(tvId: number): Promise<TMDBVideo[]> {
  try {
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_api_key_here') {
      return []
    }
    
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/${tvId}/videos?api_key=${TMDB_API_KEY}&language=fr-FR`
    )
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    
    const data = await response.json()
    // Filtrer pour obtenir les trailers YouTube (officiels et non-officiels)
    // Prioriser les trailers officiels, mais accepter aussi les non-officiels
    const allVideos = (data.results || []).filter(
      (video: TMDBVideo) => 
        video.site === 'YouTube' && 
        (video.type === 'Trailer' || video.type === 'Teaser' || video.type === 'Clip' || video.type === 'Featurette')
    )
    
    // Trier : officiels en premier, puis par type (Trailer > Teaser > Clip > Featurette)
    return allVideos.sort((a, b) => {
      // Prioriser les officiels
      if (a.official && !b.official) return -1
      if (!a.official && b.official) return 1
      
      // Puis par type
      const typeOrder: Record<string, number> = { 'Trailer': 0, 'Teaser': 1, 'Clip': 2, 'Featurette': 3 }
      return (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99)
    })
  } catch (error) {
    console.error(`Error fetching TV videos for ${tvId}:`, error)
    return []
  }
}

// Extraire l'ID TMDB depuis un ID de format "movie-123" ou "tv-456"
export function extractTMDBId(id: string): { type: 'movie' | 'tv', id: number } | null {
  const match = id.match(/^(movie|tv)-(\d+)$/)
  if (match) {
    return {
      type: match[1] as 'movie' | 'tv',
      id: parseInt(match[2], 10)
    }
  }
  return null
}

