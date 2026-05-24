/**
 * API Service
 * Centralized API communication for the Voxel platform
 */

import axios, { AxiosInstance } from 'axios'
import { ApiResponse } from '../types'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.voxel.ai'

class APIClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('voxel_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  // Chat API
  async sendMessage(message: string, personality: string, mode: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/api/chat/message', {
        message,
        personality,
        mode,
      })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Debate API
  async startDebate(topic: string, stance: 'pro' | 'con', style: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/api/debate/start', {
        topic,
        stance,
        style,
      })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async submitDebateArgument(sessionId: string, argument: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post(`/api/debate/${sessionId}/argument`, {
        argument,
      })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Interview API
  async startInterview(category: string, difficulty: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/api/interview/start', {
        category,
        difficulty,
      })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async submitInterviewResponse(sessionId: string, questionId: string, response: string): Promise<ApiResponse<any>> {
    try {
      const result = await this.client.post(`/api/interview/${sessionId}/response`, {
        questionId,
        response,
      })
      return result.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Communication Training API
  async startCommunicationSession(mode: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/api/communication/start', {
        mode,
      })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async submitCommunicationResponse(sessionId: string, response: string): Promise<ApiResponse<any>> {
    try {
      const result = await this.client.post(`/api/communication/${sessionId}/response`, {
        response,
      })
      return result.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  // User API
  async getUserProfile(): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.get('/api/user/profile')
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async updateUserPreferences(preferences: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.put('/api/user/preferences', preferences)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async getConversationHistory(limit = 20): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.get('/api/conversations', {
        params: { limit },
      })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Premium API
  async getPricingPlans(): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.get('/api/premium/plans')
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async createSubscription(planId: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/api/premium/subscribe', {
        planId,
      })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  // Voice Upload API
  async uploadVoiceFile(file: File): Promise<ApiResponse<any>> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await this.client.post('/api/voice/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async synthesizeSpeech(text: string, personality: string): Promise<Blob> {
    try {
      const response = await this.client.post(
        '/api/voice/synthesize',
        { text, personality },
        { responseType: 'blob' }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  private handleError(error: any): ApiResponse<any> {
    const message = error.response?.data?.message || error.message || 'An error occurred'
    const status = error.response?.status || 500

    return {
      success: false,
      error: message,
      message: `Error ${status}: ${message}`,
    }
  }
}

export const apiClient = new APIClient()
export default apiClient
