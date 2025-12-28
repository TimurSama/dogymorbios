// Алгоритм подбора совместимости (Combo-Match)

export type PersonalityType = 'EXTROVERT' | 'INTROVERT' | 'AMBIVERT'

export interface UserPersonality {
  type: PersonalityType
  energyLevel: number // 1-5
  sociability: number // 1-5
  activityPreference: string[] // ['running', 'walking', 'agility', etc.]
}

export interface DogCharacteristics {
  energyLevel: number // 1-5
  sociability: number // 1-5 (застенчивая=1, дружелюбная=3, доминирующая=5)
  trainability: number // 1-5
  age: number
  size: 'small' | 'medium' | 'large'
  breed: string
}

export interface MatchProfile {
  userId: string
  userPersonality: UserPersonality
  dogCharacteristics: DogCharacteristics
  location: { lat: number; lng: number }
  interests: string[]
}

// Совместимость психотипов
const personalityCompatibility: Record<PersonalityType, Record<PersonalityType, number>> = {
  EXTROVERT: {
    EXTROVERT: 0.9, // Отлично
    AMBIVERT: 0.8,  // Хорошо
    INTROVERT: 0.5, // Средне
  },
  INTROVERT: {
    INTROVERT: 0.9, // Отлично
    AMBIVERT: 0.8,  // Хорошо
    EXTROVERT: 0.5, // Средне
  },
  AMBIVERT: {
    AMBIVERT: 0.95, // Отлично
    EXTROVERT: 0.8, // Хорошо
    INTROVERT: 0.8, // Хорошо
  },
}

// Совместимость собак
function calculateDogCompatibility(
  dog1: DogCharacteristics,
  dog2: DogCharacteristics
): number {
  let score = 0
  let factors = 0

  // Энергичность (чем ближе, тем лучше)
  const energyDiff = Math.abs(dog1.energyLevel - dog2.energyLevel)
  score += (5 - energyDiff) / 5 * 0.3
  factors += 0.3

  // Социальность (совместимость)
  const sociabilityCompatibility = 
    (dog1.sociability === 5 && dog2.sociability >= 3) || // Доминирующая + дружелюбная/доминирующая
    (dog1.sociability >= 3 && dog2.sociability === 5) ||
    (dog1.sociability === 1 && dog2.sociability <= 2) || // Застенчивая + застенчивая/нейтральная
    (dog1.sociability <= 2 && dog2.sociability === 1) ||
    (dog1.sociability >= 3 && dog2.sociability >= 3) // Обе дружелюбные
  score += sociabilityCompatibility ? 0.3 : 0.1
  factors += 0.3

  // Размер (похожий размер лучше)
  const sizeCompatibility = dog1.size === dog2.size ? 1 : 0.7
  score += sizeCompatibility * 0.2
  factors += 0.2

  // Возраст (взрослые лучше с взрослыми, щенки с щенками)
  const ageDiff = Math.abs(dog1.age - dog2.age)
  const ageCompatibility = ageDiff < 2 ? 1 : ageDiff < 5 ? 0.7 : 0.5
  score += ageCompatibility * 0.2
  factors += 0.2

  return score / factors
}

// Расчёт расстояния между двумя точками (в км)
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Радиус Земли в км
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Совпадение интересов
function calculateInterestsMatch(
  interests1: string[],
  interests2: string[]
): number {
  if (interests1.length === 0 || interests2.length === 0) return 0.5
  
  const common = interests1.filter(i => interests2.includes(i)).length
  const total = new Set([...interests1, ...interests2]).size
  return common / total
}

// Основной алгоритм подбора (Combo-Match)
export function calculateMatchScore(
  profile1: MatchProfile,
  profile2: MatchProfile
): number {
  // 1. Совместимость психотипов (80% веса)
  const personalityMatch = personalityCompatibility[profile1.userPersonality.type][profile2.userPersonality.type]
  
  // 2. Совместимость собак (20% веса)
  const dogMatch = calculateDogCompatibility(
    profile1.dogCharacteristics,
    profile2.dogCharacteristics
  )
  
  // 3. Географическая близость (бонус до 10%)
  const distance = calculateDistance(
    profile1.location.lat,
    profile1.location.lng,
    profile2.location.lat,
    profile2.location.lng
  )
  const distanceBonus = distance < 1 ? 0.1 : distance < 5 ? 0.05 : distance < 10 ? 0.02 : 0
  
  // 4. Общие интересы (бонус до 10%)
  const interestsMatch = calculateInterestsMatch(profile1.interests, profile2.interests)
  const interestsBonus = interestsMatch * 0.1
  
  // Финальный расчёт
  const baseScore = personalityMatch * 0.8 + dogMatch * 0.2
  const finalScore = Math.min(100, (baseScore + distanceBonus + interestsBonus) * 100)
  
  return Math.round(finalScore)
}

// Фильтрация профилей по критериям
export function filterProfiles(
  profiles: MatchProfile[],
  filters: {
    maxDistance?: number
    minMatchScore?: number
    breeds?: string[]
    dogSizes?: ('small' | 'medium' | 'large')[]
    minAge?: number
    maxAge?: number
    interests?: string[]
  }
): MatchProfile[] {
  return profiles.filter(profile => {
    if (filters.breeds && filters.breeds.length > 0 && !filters.breeds.includes(profile.dogCharacteristics.breed)) {
      return false
    }
    
    if (filters.dogSizes && filters.dogSizes.length > 0 && !filters.dogSizes.includes(profile.dogCharacteristics.size)) {
      return false
    }
    
    if (filters.minAge && profile.dogCharacteristics.age < filters.minAge) {
      return false
    }
    
    if (filters.maxAge && profile.dogCharacteristics.age > filters.maxAge) {
      return false
    }
    
    return true
  })
}

// Сортировка по совместимости
export function sortByCompatibility(
  userProfile: MatchProfile,
  profiles: MatchProfile[]
): Array<MatchProfile & { matchScore: number }> {
  return profiles
    .map(profile => ({
      ...profile,
      matchScore: calculateMatchScore(userProfile, profile),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
}

