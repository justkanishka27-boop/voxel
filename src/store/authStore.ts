import { create } from 'zustand'
import { User, UserPreferences, PersonalityType } from '../types'

interface AuthStore {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  error?: string
  
  // Auth methods
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  clearError: () => void
  
  // User preferences
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>
  setPersonality: (personality: PersonalityType) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!localStorage.getItem('voxel_token'),
  isLoading: false,
  user: localStorage.getItem('voxel_user') ? JSON.parse(localStorage.getItem('voxel_user')!) : null,
  error: undefined,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: undefined })
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        username: email.split('@')[0],
        isPremium: false,
        preferences: {
          personality: 'mr-voxel',
          theme: 'dark',
          voiceSpeed: 1,
          voiceVolume: 0.8,
          notificationsEnabled: true,
          conversationMode: 'hybrid',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      localStorage.setItem('voxel_token', `token_${Date.now()}`)
      localStorage.setItem('voxel_user', JSON.stringify(mockUser))
      set({ isAuthenticated: true, user: mockUser, isLoading: false })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      set({ isLoading: false, error: errorMessage })
      throw error
    }
  },

  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: undefined })
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        username: name.toLowerCase().replace(/\s+/g, ''),
        isPremium: false,
        preferences: {
          personality: 'mr-voxel',
          theme: 'dark',
          voiceSpeed: 1,
          voiceVolume: 0.8,
          notificationsEnabled: true,
          conversationMode: 'hybrid',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      localStorage.setItem('voxel_token', `token_${Date.now()}`)
      localStorage.setItem('voxel_user', JSON.stringify(mockUser))
      set({ isAuthenticated: true, user: mockUser, isLoading: false })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed'
      set({ isLoading: false, error: errorMessage })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('voxel_token')
    localStorage.removeItem('voxel_user')
    set({ isAuthenticated: false, user: null, error: undefined })
  },

  setUser: (user: User) => {
    localStorage.setItem('voxel_user', JSON.stringify(user))
    set({ user })
  },

  clearError: () => {
    set({ error: undefined })
  },

  updatePreferences: async (preferences: Partial<UserPreferences>) => {
    set((state) => {
      if (!state.user) return state
      const updatedUser = {
        ...state.user,
        preferences: { ...state.user.preferences, ...preferences },
        updatedAt: new Date().toISOString(),
      }
      localStorage.setItem('voxel_user', JSON.stringify(updatedUser))
      return { user: updatedUser }
    })
  },

  setPersonality: (personality: PersonalityType) => {
    set((state) => {
      if (!state.user) return state
      const updatedUser = {
        ...state.user,
        preferences: { ...state.user.preferences, personality },
        updatedAt: new Date().toISOString(),
      }
      localStorage.setItem('voxel_user', JSON.stringify(updatedUser))
      return { user: updatedUser }
    })
  },
}))

