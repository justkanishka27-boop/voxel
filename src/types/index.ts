/**
 * Global Type Definitions
 */

declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
    webkitAudioContext: any
    AudioContext: any
  }
}

// ===== Personalities =====
// Support both hyphen and underscore variants for compatibility
export type PersonalityType =
  | 'mr-voxel'
  | 'miss-voxel'
  | 'mr_voxel'
  | 'miss_voxel'
export type PageType = 'landing' | 'auth' | 'dashboard' | 'chat' | 'pricing' | 'debate' | 'interview'

export interface PersonalityConfig {
  id: PersonalityType
  name: string
  description: string
  traits: string[]
  voiceId: string
  color: string
  accentColor: string
  icon: string
  animationStyle: 'sharp' | 'fluid'
  tone: 'professional' | 'friendly'
  avatar?: string
}

// ===== User & Authentication =====
export interface User {
  id: string
  name: string
  email: string
  username?: string
  avatar?: string
  isPremium: boolean
  subscriptionPlan?: SubscriptionPlan
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  personality: PersonalityType
  theme: 'dark' | 'light'
  voiceSpeed: number
  voiceVolume: number
  notificationsEnabled: boolean
  conversationMode: 'chat' | 'voice' | 'hybrid'
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error?: string
}

// ===== Messages & Conversations =====
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  type: 'text' | 'voice'
  voiceUrl?: string
  personality?: PersonalityType
}

export interface AIResponse {
  id: string
  text: string
  personality: PersonalityType
  timestamp: string
  voiceUrl?: string
  confidence?: number
}

export interface Conversation {
  id: string
  userId: string
  title: string
  messages: Message[]
  personality: PersonalityType
  mode: ConversationMode
  createdAt: string
  updatedAt: string
  summary?: string
}

export type ConversationMode = 'chat' | 'debate' | 'interview' | 'communication' | 'scenario'

// ===== Debate System =====
export interface DebateSession {
  id: string
  userId: string
  topic: string
  stance: 'pro' | 'con'
  style: DebateStyle
  turns: DebateTurn[]
  score: DebateScore
  createdAt: string
  endedAt?: string
}

export type DebateStyle = 'friendly' | 'formal' | 'competitive' | 'academic' | 'casual'

export interface DebateTurn {
  id: string
  speaker: 'user' | 'assistant'
  argument: string
  timestamp: string
  audioUrl?: string
  confidence?: number
}

export interface DebateScore {
  clarity: number
  logic: number
  persuasiveness: number
  confidence: number
  engagement: number
  overall: number
}

// ===== Interview System =====
export interface InterviewSession {
  id: string
  userId: string
  category: InterviewCategory
  difficulty: 'easy' | 'medium' | 'hard'
  questions: InterviewQuestion[]
  responses: InterviewResponse[]
  analysis: InterviewAnalysis
  createdAt: string
  endedAt?: string
}

export type InterviewCategory = 'job' | 'college' | 'startup' | 'leadership' | 'personality'

export interface InterviewQuestion {
  id: string
  question: string
  category: string
  difficulty: string
  followUp?: boolean
}

export interface InterviewResponse {
  id: string
  questionId: string
  response: string
  audioUrl?: string
  timestamp: string
  duration: number
}

export interface InterviewAnalysis {
  clarity: number
  confidence: number
  completeness: number
  communicationFlow: number
  relevance: number
  overallScore: number
  feedback: string[]
  suggestions: string[]
}

// ===== Communication Training =====
export interface CommunicationSession {
  id: string
  userId: string
  mode: CommunicationMode
  duration: number
  feedback: CommunicationFeedback
  createdAt: string
}

export type CommunicationMode =
  | 'speaking'
  | 'public-speaking'
  | 'pronunciation'
  | 'fluency'
  | 'social'
  | 'networking'
  | 'professional'

export interface CommunicationFeedback {
  clarity: number
  confidence: number
  tone: number
  speed: number
  effectiveness: number
  pacing: number
  suggestions: string[]
}

// ===== Scenario Simulation =====
export interface ScenarioSession {
  id: string
  userId: string
  scenario: string
  context: string
  difficulty: string
  responses: string[]
  analysis: string
  createdAt: string
}

// ===== Voice & Audio =====
export interface VoiceSettings {
  language: string
  accent: string
  speed: number
  pitch: number
  volume: number
}

export interface AudioData {
  id: string
  url: string
  duration: number
  waveform?: number[]
  timestamp: string
}

export interface VoiceVisualizationData {
  frequency: number[]
  waveform: number[]
  isListening: boolean
  isSpeaking: boolean
  amplitude: number
}

// ===== Premium & Subscription =====
export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  description: string
  features: string[]
  limits: SubscriptionLimits
  isPopular?: boolean
}

export interface SubscriptionLimits {
  conversationMinutes: number
  debateSessions: number
  interviewSessions: number
  communicationSessions: number
  storageGB: number
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  period: 'month' | 'year'
  features: string[]
  highlighted?: boolean
}

// ===== Activity & Notifications =====
export interface Activity {
  id: string
  userId: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
}

export type ActivityType =
  | 'conversation'
  | 'debate'
  | 'interview'
  | 'communication'
  | 'achievement'
  | 'milestone'

export interface Notification {
  id: string
  userId: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  read: boolean
  timestamp: string
  actionUrl?: string
}

// ===== Application State =====
export interface AppState {
  currentPage: PageType
  currentPersonality: PersonalityType
  isLoading: boolean
  isMicActive: boolean
  isAISpeaking: boolean
}

export interface VoiceState {
  isListening: boolean
  isSpeaking: boolean
  isProcessing: boolean
  error?: string
  mediaStream?: MediaStream
}

// ===== API & Services =====
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ChatCompletionRequest {
  messages: { role: string; content: string }[]
  personality: PersonalityType
  mode: ConversationMode
  temperature?: number
  maxTokens?: number
}

export interface ChatCompletionResponse {
  id: string
  content: string
  personality: PersonalityType
  timestamp: string
  voiceUrl?: string
}

// ===== File & Media =====
export interface FileUploadResponse {
  id: string
  url: string
  name: string
  size: number
  type: string
}

// ===== Error Handling =====
export interface AppError {
  code: string
  message: string
  status: number
  details?: any
}

export {}

