/**
 * Application Constants
 */

export const PERSONALITIES = {
  MR_VOXEL: {
    id: 'mr_voxel',
    name: 'Mr. Voxel',
    description: 'Calm, Professional, Strategic',
    icon: '🎩',
    tone: 'professional',
    pitch: 0.9,
    rate: 1,
    color: {
      gradient: 'from-primary-500 to-glow-blue',
      glow: 'glow-blue',
    },
  },
  MISS_VOXEL: {
    id: 'miss_voxel',
    name: 'Miss Voxel',
    description: 'Friendly, Elegant, Energetic',
    icon: '✨',
    tone: 'friendly',
    pitch: 1.3,
    rate: 0.95,
    color: {
      gradient: 'from-glow-pink to-glow-purple',
      glow: 'glow-purple',
    },
  },
} as const

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    period: 'Forever',
    features: [
      'Limited voice interactions (20/month)',
      'One AI personality',
      'Basic chat history',
      'Community support',
      'Mobile responsive design',
      'Standard speech recognition',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    period: 'per month',
    features: [
      'Unlimited voice interactions',
      'Both AI personalities',
      'Unlimited chat history',
      'Priority support',
      'Advanced customization',
      'Enhanced speech recognition',
      'Custom voice profiles',
      'Conversation export',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    period: 'per month',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Multi-user accounts',
      'Advanced analytics',
      'API access',
      'Dedicated support',
      'Custom integrations',
      'Admin dashboard',
      'SLA guarantee',
    ],
  },
] as const

export const API_ENDPOINTS = {
  BASE: process.env.VITE_API_URL || 'http://localhost:3000',
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
  },
  CHAT: {
    GET_HISTORY: '/api/chat/history',
    SEND_MESSAGE: '/api/chat/message',
    CLEAR_HISTORY: '/api/chat/clear',
  },
  USER: {
    GET_PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
  },
} as const

export const STORAGE_KEYS = {
  TOKEN: 'voxel_token',
  USER: 'voxel_user',
  PREFERENCES: 'voxel_preferences',
  CHAT_HISTORY: 'voxel_chat_history',
  PERSONALITY: 'voxel_personality',
} as const

export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1,
  VERY_SLOW: 2,
} as const

export const ROUTES = {
  LANDING: '/',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  CHAT: '/chat',
  PRICING: '/pricing',
} as const

export const VOICE_CONFIG = {
  LANGUAGE: 'en-US',
  CONTINUOUS: true,
  INTERIM_RESULTS: true,
  MAX_ALTERNATIVES: 1,
} as const

export const ERROR_MESSAGES = {
  SPEECH_NOT_SUPPORTED: 'Speech recognition is not supported in your browser',
  MICROPHONE_PERMISSION: 'Microphone permission denied. Please enable it in your browser settings.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_FAILED: 'Authentication failed. Please try again.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
} as const

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully',
  SIGNUP_SUCCESS: 'Account created successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  CHAT_CLEARED: 'Chat history cleared',
} as const
