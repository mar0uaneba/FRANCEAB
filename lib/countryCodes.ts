// Codes téléphoniques - Pays avec achat en ligne élevé et îles francophones
export interface CountryCode {
  code: string
  name: string
  flag: string
}

export const countryCodes: CountryCode[] = [
  // TOP PRIORITÉ - Pays avec achat en ligne très élevé
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+32', name: 'Belgique', flag: '🇧🇪' },
  { code: '+1', name: 'Canada', flag: '🇨🇦' },
  
  // Îles francophones
  { code: '+590', name: 'Guadeloupe', flag: '🇬🇵' },
  { code: '+596', name: 'Martinique', flag: '🇲🇶' },
  { code: '+594', name: 'Guyane française', flag: '🇬🇫' },
  { code: '+262', name: 'La Réunion', flag: '🇷🇪' },
  { code: '+262', name: 'Mayotte', flag: '🇾🇹' },
  { code: '+687', name: 'Nouvelle-Calédonie', flag: '🇳🇨' },
  { code: '+689', name: 'Polynésie française', flag: '🇵🇫' },
  { code: '+508', name: 'Saint-Pierre-et-Miquelon', flag: '🇵🇲' },
  { code: '+681', name: 'Wallis-et-Futuna', flag: '🇼🇫' },
  
  // Europe - Pays avec achat en ligne élevé
  { code: '+44', name: 'Royaume-Uni', flag: '🇬🇧' },
  { code: '+49', name: 'Allemagne', flag: '🇩🇪' },
  { code: '+39', name: 'Italie', flag: '🇮🇹' },
  { code: '+34', name: 'Espagne', flag: '🇪🇸' },
  { code: '+31', name: 'Pays-Bas', flag: '🇳🇱' },
  { code: '+46', name: 'Suède', flag: '🇸🇪' },
  { code: '+47', name: 'Norvège', flag: '🇳🇴' },
  { code: '+45', name: 'Danemark', flag: '🇩🇰' },
  { code: '+358', name: 'Finlande', flag: '🇫🇮' },
  { code: '+41', name: 'Suisse', flag: '🇨🇭' },
  { code: '+43', name: 'Autriche', flag: '🇦🇹' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+353', name: 'Irlande', flag: '🇮🇪' },
  { code: '+48', name: 'Pologne', flag: '🇵🇱' },
  { code: '+420', name: 'République tchèque', flag: '🇨🇿' },
  { code: '+36', name: 'Hongrie', flag: '🇭🇺' },
  { code: '+40', name: 'Roumanie', flag: '🇷🇴' },
  { code: '+30', name: 'Grèce', flag: '🇬🇷' },
  { code: '+352', name: 'Luxembourg', flag: '🇱🇺' },
  { code: '+377', name: 'Monaco', flag: '🇲🇨' },
  { code: '+376', name: 'Andorre', flag: '🇦🇩' },
  { code: '+356', name: 'Malte', flag: '🇲🇹' },
  { code: '+357', name: 'Chypre', flag: '🇨🇾' },
  { code: '+385', name: 'Croatie', flag: '🇭🇷' },
  { code: '+386', name: 'Slovénie', flag: '🇸🇮' },
  { code: '+421', name: 'Slovaquie', flag: '🇸🇰' },
  { code: '+370', name: 'Lituanie', flag: '🇱🇹' },
  { code: '+371', name: 'Lettonie', flag: '🇱🇻' },
  { code: '+372', name: 'Estonie', flag: '🇪🇪' },
  { code: '+354', name: 'Islande', flag: '🇮🇸' },
  { code: '+423', name: 'Liechtenstein', flag: '🇱🇮' },
  
  // Amérique du Nord
  { code: '+1', name: 'États-Unis', flag: '🇺🇸' },
  
  // Autres pays avec e-commerce développé
  { code: '+61', name: 'Australie', flag: '🇦🇺' },
  { code: '+64', name: 'Nouvelle-Zélande', flag: '🇳🇿' },
  { code: '+81', name: 'Japon', flag: '🇯🇵' },
  { code: '+82', name: 'Corée du Sud', flag: '🇰🇷' },
  { code: '+65', name: 'Singapour', flag: '🇸🇬' },
  { code: '+852', name: 'Hong Kong', flag: '🇭🇰' },
  { code: '+971', name: 'Émirats arabes unis', flag: '🇦🇪' },
  { code: '+966', name: 'Arabie saoudite', flag: '🇸🇦' },
  { code: '+972', name: 'Israël', flag: '🇮🇱' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: '+886', name: 'Taïwan', flag: '🇹🇼' },
  
  // Pays francophones avec e-commerce développé (limité)
  { code: '+212', name: 'Maroc', flag: '🇲🇦' },
  { code: '+213', name: 'Algérie', flag: '🇩🇿' },
  { code: '+216', name: 'Tunisie', flag: '🇹🇳' },
  { code: '+230', name: 'Maurice', flag: '🇲🇺' },
  { code: '+248', name: 'Seychelles', flag: '🇸🇨' },
]

// Fonction pour obtenir les codes par recherche
export function getCountryByCode(code: string): CountryCode | undefined {
  return countryCodes.find(c => c.code === code)
}

// Fonction pour obtenir les codes par nom
export function getCountryByName(name: string): CountryCode | undefined {
  return countryCodes.find(c => c.name.toLowerCase().includes(name.toLowerCase()))
}
