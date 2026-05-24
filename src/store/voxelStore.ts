import { create } from 'zustand'
import {
  PersonalityType,
  PageType,
  Message,
  Conversation,
  DebateSession,
  InterviewSession,
  CommunicationSession,
  ConversationMode,
  VoiceVisualizationData,
} from '../types'

interface VoxelStore {
  // Navigation & UI
  currentPage: PageType
  setCurrentPage: (page: PageType) => void
  
  // Personality
  currentPersonality: PersonalityType
  setCurrentPersonality: (personality: PersonalityType) => void

  // Voice Assistant State
  isListening: boolean
  isSpeaking: boolean
  isProcessing: boolean
  setIsListening: (listening: boolean) => void
  setIsSpeaking: (speaking: boolean) => void
  setIsProcessing: (processing: boolean) => void

  // Chat & Messages
  currentConversationId?: string
  messages: Message[]
  addMessage: (message: Message) => void
  clearMessages: () => void
  setCurrentConversation: (id: string) => void

  // Voice Settings
  voiceEnabled: boolean
  setVoiceEnabled: (enabled: boolean) => void
  speechRate: number
  setSpeechRate: (rate: number) => void
  volume: number
  setVolume: (volume: number) => void

  // Conversation Modes
  currentMode: ConversationMode
  setCurrentMode: (mode: ConversationMode) => void

  // Debate System
  currentDebateSession?: DebateSession
  setDebateSession: (session: DebateSession) => void
  clearDebateSession: () => void

  // Interview System
  currentInterviewSession?: InterviewSession
  setInterviewSession: (session: InterviewSession) => void
  clearInterviewSession: () => void

  // Communication Training
  currentCommunicationSession?: CommunicationSession
  setCommunicationSession: (session: CommunicationSession) => void
  clearCommunicationSession: () => void

  // Voice Visualization
  visualizationData: VoiceVisualizationData
  updateVisualizationData: (data: Partial<VoiceVisualizationData>) => void

  // UI State
  showMicMenu: boolean
  setShowMicMenu: (show: boolean) => void
  showPersonalitySelector: boolean
  setShowPersonalitySelector: (show: boolean) => void
}

export const useVoxelStore = create<VoxelStore>((set) => ({
  // Navigation & UI
  currentPage: 'landing',
  setCurrentPage: (page) => set({ currentPage: page }),
  
  // Personality
  currentPersonality: 'mr_voxel',
  setCurrentPersonality: (personality) => set({ currentPersonality: personality }),

  // Voice Assistant State
  isListening: false,
  isSpeaking: false,
  isProcessing: false,
  setIsListening: (listening) => set({ isListening: listening }),
  setIsSpeaking: (speaking) => set({ isSpeaking: speaking }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),

  // Chat & Messages
  currentConversationId: undefined,
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  setCurrentConversation: (id) => set({ currentConversationId: id }),

  // Voice Settings
  voiceEnabled: true,
  setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
  speechRate: 1,
  setSpeechRate: (rate) => set({ speechRate: rate }),
  volume: 0.8,
  setVolume: (volume) => set({ volume }),

  // Conversation Modes
  currentMode: 'chat',
  setCurrentMode: (mode) => set({ currentMode: mode }),

  // Debate System
  currentDebateSession: undefined,
  setDebateSession: (session) => set({ currentDebateSession: session }),
  clearDebateSession: () => set({ currentDebateSession: undefined }),

  // Interview System
  currentInterviewSession: undefined,
  setInterviewSession: (session) => set({ currentInterviewSession: session }),
  clearInterviewSession: () => set({ currentInterviewSession: undefined }),

  // Communication Training
  currentCommunicationSession: undefined,
  setCommunicationSession: (session) => set({ currentCommunicationSession: session }),
  clearCommunicationSession: () => set({ currentCommunicationSession: undefined }),

  // Voice Visualization
  visualizationData: {
    frequency: [],
    waveform: [],
    isListening: false,
    isSpeaking: false,
    amplitude: 0,
  },
  updateVisualizationData: (data) =>
    set((state) => ({
      visualizationData: { ...state.visualizationData, ...data },
    })),

  // UI State
  showMicMenu: false,
  setShowMicMenu: (show) => set({ showMicMenu: show }),
  showPersonalitySelector: false,
  setShowPersonalitySelector: (show) => set({ showPersonalitySelector: show }),
}))
