// Простая база данных на localStorage для клиентской стороны
// В продакшене заменить на реальный backend (Firebase, Supabase, или свой API)

export interface User {
  id: string
  email: string
  name: string
  username: string
  avatar?: string
  bio?: string
  location?: string
  createdAt: string
  // Дополнительные поля профиля
  phone?: string
  birthDate?: string
}

export interface Dog {
  id: string
  userId: string
  name: string
  breed: string
  age: number
  weight: number
  gender: 'male' | 'female'
  avatar?: string
  personality: string[]
  bio?: string
}

export interface UserProfile {
  // Анкета пользователя для дейтинга
  userId: string
  completedTest: boolean
  interests: string[]
  activity: string[]
  personality: string[]
  lookingFor: string[]
}

export interface DogProfile {
  // Анкета собаки для дейтинга
  dogId: string
  completedTest: boolean
  energyLevel: number // 1-5
  sociability: number // 1-5
  training: number // 1-5
  playStyle: string[]
  favoriteActivities: string[]
}

// Ключи localStorage
const KEYS = {
  USERS: 'dogymorbis_users',
  DOGS: 'dogymorbis_dogs',
  CURRENT_USER: 'dogymorbis_current_user',
  USER_PROFILES: 'dogymorbis_user_profiles',
  DOG_PROFILES: 'dogymorbis_dog_profiles',
  FRIENDS: 'dogymorbis_friends',
  FRIEND_REQUESTS: 'dogymorbis_friend_requests',
}

// Helper функции для работы с localStorage
const getFromStorage = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

const saveToStorage = <T>(key: string, data: T[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(data))
}

// === USERS ===
export const getAllUsers = (): User[] => {
  return getFromStorage<User>(KEYS.USERS)
}

export const getUserById = (id: string): User | null => {
  const users = getAllUsers()
  return users.find(u => u.id === id) || null
}

export const getUserByEmail = (email: string): User | null => {
  const users = getAllUsers()
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null
}

export const createUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const users = getAllUsers()
  const newUser: User = {
    ...user,
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  saveToStorage(KEYS.USERS, users)
  return newUser
}

export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const users = getAllUsers()
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return null
  
  users[index] = { ...users[index], ...updates }
  saveToStorage(KEYS.USERS, users)
  return users[index]
}

// === DOGS ===
export const getDogsByUserId = (userId: string): Dog[] => {
  const dogs = getFromStorage<Dog>(KEYS.DOGS)
  return dogs.filter(d => d.userId === userId)
}

export const getDogById = (id: string): Dog | null => {
  const dogs = getFromStorage<Dog>(KEYS.DOGS)
  return dogs.find(d => d.id === id) || null
}

export const createDog = (dog: Omit<Dog, 'id'>): Dog => {
  const dogs = getFromStorage<Dog>(KEYS.DOGS)
  const newDog: Dog = {
    ...dog,
    id: `dog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  }
  dogs.push(newDog)
  saveToStorage(KEYS.DOGS, dogs)
  return newDog
}

export const updateDog = (id: string, updates: Partial<Dog>): Dog | null => {
  const dogs = getFromStorage<Dog>(KEYS.DOGS)
  const index = dogs.findIndex(d => d.id === id)
  if (index === -1) return null
  
  dogs[index] = { ...dogs[index], ...updates }
  saveToStorage(KEYS.DOGS, dogs)
  return dogs[index]
}

export const deleteDog = (id: string): boolean => {
  const dogs = getFromStorage<Dog>(KEYS.DOGS)
  const filtered = dogs.filter(d => d.id !== id)
  if (filtered.length === dogs.length) return false
  saveToStorage(KEYS.DOGS, filtered)
  return true
}

// === AUTH ===
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const userId = localStorage.getItem(KEYS.CURRENT_USER)
  if (!userId) return null
  return getUserById(userId)
}

export const setCurrentUser = (userId: string | null) => {
  if (typeof window === 'undefined') return
  if (userId) {
    localStorage.setItem(KEYS.CURRENT_USER, userId)
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER)
  }
}

export const login = (email: string, password: string): User | null => {
  // В реальном приложении проверять пароль через backend
  // Сейчас просто проверяем наличие email
  const user = getUserByEmail(email)
  if (user) {
    setCurrentUser(user.id)
    return user
  }
  return null
}

export const logout = () => {
  setCurrentUser(null)
}

export const register = (data: {
  email: string
  password: string
  name: string
  username: string
}): User => {
  // В реальном приложении отправлять на backend
  const user = createUser({
    email: data.email,
    name: data.name,
    username: data.username,
  })
  setCurrentUser(user.id)
  return user
}

// === PROFILES ===
export const getUserProfile = (userId: string): UserProfile | null => {
  const profiles = getFromStorage<UserProfile>(KEYS.USER_PROFILES)
  return profiles.find(p => p.userId === userId) || null
}

export const saveUserProfile = (profile: UserProfile) => {
  const profiles = getFromStorage<UserProfile>(KEYS.USER_PROFILES)
  const index = profiles.findIndex(p => p.userId === profile.userId)
  if (index === -1) {
    profiles.push(profile)
  } else {
    profiles[index] = profile
  }
  saveToStorage(KEYS.USER_PROFILES, profiles)
}

export const getDogProfile = (dogId: string): DogProfile | null => {
  const profiles = getFromStorage<DogProfile>(KEYS.DOG_PROFILES)
  return profiles.find(p => p.dogId === dogId) || null
}

export const saveDogProfile = (profile: DogProfile) => {
  const profiles = getFromStorage<DogProfile>(KEYS.DOG_PROFILES)
  const index = profiles.findIndex(p => p.dogId === profile.dogId)
  if (index === -1) {
    profiles.push(profile)
  } else {
    profiles[index] = profile
  }
  saveToStorage(KEYS.DOG_PROFILES, profiles)
}

// === FRIENDS ===
export interface Friend {
  userId: string
  friendId: string
  createdAt: string
}

export interface FriendRequest {
  id: string
  fromUserId: string
  toUserId: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

export const getFriends = (userId: string): string[] => {
  const friends = getFromStorage<Friend>(KEYS.FRIENDS)
  return friends
    .filter(f => f.userId === userId || f.friendId === userId)
    .map(f => f.userId === userId ? f.friendId : f.userId)
}

export const addFriend = (userId: string, friendId: string) => {
  const friends = getFromStorage<Friend>(KEYS.FRIENDS)
  friends.push({
    userId,
    friendId,
    createdAt: new Date().toISOString(),
  })
  saveToStorage(KEYS.FRIENDS, friends)
}

export const sendFriendRequest = (fromUserId: string, toUserId: string): FriendRequest => {
  const requests = getFromStorage<FriendRequest>(KEYS.FRIEND_REQUESTS)
  const newRequest: FriendRequest = {
    id: `req_${Date.now()}`,
    fromUserId,
    toUserId,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  requests.push(newRequest)
  saveToStorage(KEYS.FRIEND_REQUESTS, requests)
  return newRequest
}

export const getFriendRequests = (userId: string): FriendRequest[] => {
  const requests = getFromStorage<FriendRequest>(KEYS.FRIEND_REQUESTS)
  return requests.filter(r => r.toUserId === userId && r.status === 'pending')
}

export const acceptFriendRequest = (requestId: string) => {
  const requests = getFromStorage<FriendRequest>(KEYS.FRIEND_REQUESTS)
  const request = requests.find(r => r.id === requestId)
  if (!request) return
  
  request.status = 'accepted'
  saveToStorage(KEYS.FRIEND_REQUESTS, requests)
  
  // Добавить в друзья
  addFriend(request.fromUserId, request.toUserId)
}


