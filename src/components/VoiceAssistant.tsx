import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Volume2, Pause } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useVoxelStore } from '../store/voxelStore'
import voiceProcessor from '../utils/voiceProcessor'
import aiService from '../utils/aiService'

export default function VoiceAssistant() {
  const { isListening, setIsListening, isSpeaking, setIsSpeaking, currentPersonality, addMessage } = useVoxelStore()
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isListening) return

    setError('')
    setTranscript('')
    setInterimTranscript('')

    const handleResult = async (text: string, isFinal: boolean) => {
      if (isFinal) {
        setTranscript(text)
        setInterimTranscript('')

        // Add user message
        addMessage({
          id: Math.random().toString(36).substring(7),
          role: 'user',
          content: text,
          timestamp: new Date().toISOString(),
        })

        // Get AI response
        try {
          const response = await aiService.generateResponse(text, currentPersonality)

          addMessage({
            id: response.id,
            role: 'assistant',
            content: response.text,
            timestamp: response.timestamp,
            voiceGenerated: true,
          })

          // Speak response
          setIsSpeaking(true)
          try {
            await voiceProcessor.speak(response.text, currentPersonality)
          } finally {
            setIsSpeaking(false)
          }
        } catch (err) {
          setError('Failed to generate response')
          console.error(err)
        }

        setIsListening(false)
      } else {
        setInterimTranscript(text)
      }
    }

    const handleError = (error: string) => {
      setError(`Error: ${error}`)
      setIsListening(false)
    }

    voiceProcessor.startListening(handleResult, handleError)

    return () => {
      voiceProcessor.abort()
    }
  }, [isListening])

  const toggleListening = () => {
    if (isListening) {
      voiceProcessor.stopListening()
      setIsListening(false)
    } else {
      setIsListening(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      {/* Main Mic Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        <motion.button
          onClick={toggleListening}
          animate={{
            scale: isListening ? 1.1 : 1,
          }}
          transition={{
            duration: 0.3,
          }}
          className={`relative w-32 h-32 rounded-full transition-all duration-300 ${
            isListening
              ? 'bg-gradient-to-br from-glow-pink to-glow-purple glow-purple-lg'
              : 'bg-gradient-to-br from-primary-400 to-glow-cyan glow-blue-lg'
          }`}
        >
          {/* Outer Pulse Ring */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.3, opacity: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full border-2 border-current"
              />
            )}
          </AnimatePresence>

          {/* Mic Icon */}
          <div className="relative w-full h-full flex items-center justify-center">
            {isSpeaking ? (
              <Volume2 className="w-12 h-12 text-white" />
            ) : (
              <Mic className={`w-12 h-12 ${isListening ? 'animate-pulse' : ''} text-white`} />
            )}
          </div>
        </motion.button>
      </motion.div>

      {/* Status Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-lg font-semibold">
          {isSpeaking ? (
            <span className="text-glow-pink">Speaking...</span>
          ) : isListening ? (
            <span className="text-glow-purple">Listening...</span>
          ) : (
            <span className="text-gray-400">Click to speak</span>
          )}
        </p>
      </motion.div>

      {/* Voice Visualization */}
      {isListening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-1"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: ['20px', '40px', '60px', '40px', '20px'],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-1 bg-gradient-to-t from-primary-400 to-glow-cyan rounded-full"
            />
          ))}
        </motion.div>
      )}

      {/* Transcript Display */}
      <AnimatePresence>
        {(transcript || interimTranscript) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-lg p-6 rounded-lg max-w-md text-center"
          >
            <p className="text-sm text-gray-400 mb-2">You said:</p>
            <p className="text-lg text-white font-semibold">{transcript || interimTranscript}</p>
            {interimTranscript && !transcript && (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-gray-500 ml-1"
              >
                _
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-lg p-4 rounded-lg max-w-md bg-red-500/10 border border-red-500/30"
          >
            <p className="text-red-300 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <button
          onClick={toggleListening}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            isListening
              ? 'bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30'
              : 'btn-primary'
          }`}
        >
          {isListening ? 'Stop' : 'Start Listening'}
        </button>
      </div>
    </div>
  )
}
