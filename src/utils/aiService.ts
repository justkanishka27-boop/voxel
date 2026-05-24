/**
 * AI Service
 * Handles conversation and AI response generation
 */

export interface AIResponse {
  id: string
  text: string
  personality: 'mr_voxel' | 'miss_voxel'
  timestamp: string
}

const PERSONALITY_PROMPTS = {
  mr_voxel: {
    tone: 'calm, professional, intelligent',
    style: 'Strategic and thoughtful',
    example: 'I understand your inquiry. Allow me to provide a comprehensive analysis...',
  },
  miss_voxel: {
    tone: 'friendly, elegant, expressive',
    style: 'Warm and interactive',
    example: 'Oh, I love that question! Let me share my thoughts on this...',
  },
}

export class AIService {
  private conversationHistory: Array<{ role: string; content: string }> = []

  async generateResponse(
    userMessage: string,
    personality: 'mr_voxel' | 'miss_voxel' = 'mr_voxel'
  ): Promise<AIResponse> {
    this.conversationHistory.push({ role: 'user', content: userMessage })

    // Simulate AI response generation
    // In production, this would call an actual AI API (OpenAI, Claude, etc.)
    const response = await this.simulateAIResponse(userMessage, personality)

    this.conversationHistory.push({ role: 'assistant', content: response })

    return {
      id: Math.random().toString(36).substring(7),
      text: response,
      personality,
      timestamp: new Date().toISOString(),
    }
  }

  private async simulateAIResponse(message: string, personality: 'mr_voxel' | 'miss_voxel'): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800))

    const prompt = PERSONALITY_PROMPTS[personality]

    // Simulate different responses based on keywords
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      if (personality === 'mr_voxel') {
        return "Good day. I'm Mr. Voxel, your AI assistant. I'm here to engage in thoughtful conversation and provide intelligent insights. How may I assist you today?"
      } else {
        return "Hey there! I'm Miss Voxel, and I'm so excited to chat with you! What's on your mind today? I'm all ears! 🎤"
      }
    }

    if (lowerMessage.includes('how are you')) {
      if (personality === 'mr_voxel') {
        return "I appreciate the inquiry. I'm functioning optimally and ready to provide assistance. My systems are operating at peak efficiency. How are you doing?"
      } else {
        return "I'm doing fantastic, thanks for asking! The energy is great today, and I'm ready for some amazing conversations. How about you?"
      }
    }

    if (lowerMessage.includes('weather') || lowerMessage.includes('temperature')) {
      if (personality === 'mr_voxel') {
        return "I should note that I don't have real-time weather data. However, I'd recommend checking your local weather service for current conditions and forecasts."
      } else {
        return "Ooh, great question! Though I don't have live weather updates, I'd definitely suggest checking your favorite weather app for real-time info. What kind of weather are you looking for?"
      }
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      if (personality === 'mr_voxel') {
        return "I'm equipped to assist with a wide range of tasks: answering questions, engaging in dialogue, providing information, and offering strategic perspectives on various subjects. What specific assistance do you require?"
      } else {
        return "Oh, so many things! I can chat with you, answer questions, help you brainstorm ideas, explain complex topics, have philosophical discussions, and just keep you company. Really, I'm here for whatever you need!"
      }
    }

    // Generic response based on personality
    if (personality === 'mr_voxel') {
      return "That's an interesting point. Let me analyze this thoughtfully. Your query demonstrates awareness of a complex topic. From my perspective, the most strategic approach would be to consider multiple viewpoints before formulating a comprehensive response."
    } else {
      return "Ooh, I really like where you're going with that! It's such a fascinating topic when you dig into it. I think the cool part is that there are so many angles to explore here. What do you think is the most important aspect of this?"
    }
  }

  clearHistory(): void {
    this.conversationHistory = []
  }

  getHistory() {
    return this.conversationHistory
  }
}

export default new AIService()
