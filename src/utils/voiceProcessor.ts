/**
 * Voice Processing Utility
 * Handles speech recognition and synthesis
 */

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition

export class VoiceProcessor {
  private recognition: InstanceType<typeof SpeechRecognition> | null = null
  private isSupported: boolean

  constructor() {
    this.isSupported = !!SpeechRecognition
    if (this.isSupported) {
      this.recognition = new SpeechRecognition()
      this.initializeRecognition()
    }
  }

  private initializeRecognition() {
    if (!this.recognition) return

    this.recognition.continuous = true
    this.recognition.interimResults = true
    this.recognition.language = 'en-US'
  }

  startListening(onResult: (text: string, isFinal: boolean) => void, onError?: (error: string) => void): void {
    if (!this.isSupported || !this.recognition) {
      console.error('Speech Recognition not supported')
      return
    }

    this.recognition.onstart = () => {
      console.log('Listening started')
    }

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }
      }

      if (finalTranscript) {
        onResult(finalTranscript, true)
      } else if (interimTranscript) {
        onResult(interimTranscript, false)
      }
    }

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error)
      onError?.(event.error)
    }

    this.recognition.onend = () => {
      console.log('Listening ended')
    }

    this.recognition.start()
  }

  stopListening(): void {
    if (this.recognition) {
      this.recognition.stop()
    }
  }

  abort(): void {
    if (this.recognition) {
      this.recognition.abort()
    }
  }

  speak(text: string, personality: 'mr_voxel' | 'miss_voxel' = 'mr_voxel'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech Synthesis not supported'))
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      
      // Set personality-specific voice
      if (personality === 'miss_voxel') {
        utterance.pitch = 1.3
        utterance.rate = 0.95
      } else {
        utterance.pitch = 0.9
        utterance.rate = 1
      }

      utterance.volume = 1
      utterance.onend = () => resolve()
      utterance.onerror = () => reject(new Error('Speech synthesis failed'))

      speechSynthesis.cancel() // Cancel any ongoing speech
      speechSynthesis.speak(utterance)
    })
  }

  isAvailable(): boolean {
    return this.isSupported && 'speechSynthesis' in window
  }
}

export default new VoiceProcessor()
