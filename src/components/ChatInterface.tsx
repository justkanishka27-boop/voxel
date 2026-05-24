import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useVoxelStore } from '../store/voxelStore'
import { MessageCircle, Zap } from 'lucide-react'

export default function ChatInterface() {
  const { messages, currentPersonality } = useVoxelStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getPersonalityColor = (personality: string) => {
    return personality === 'mr_voxel' ? 'from-primary-500 to-glow-blue' : 'from-glow-pink to-glow-purple'
  }

  const getPersonalityName = (personality: string) => {
    return personality === 'mr_voxel' ? 'Mr. Voxel' : 'Miss Voxel'
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-dark-900/50 to-dark-950/50 rounded-lg border border-white/10">
      {/* Chat Header */}
      <div className="glass-lg p-6 border-b border-white/10 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-gradient-to-br ${getPersonalityColor(currentPersonality)} rounded-lg`}>
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg">Chat History</h3>
            <p className="text-sm text-gray-400">Talking with {getPersonalityName(currentPersonality)}</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="mb-4"
              >
                <Zap className="w-16 h-16 text-glow-blue/50" />
              </motion.div>
              <p className="text-gray-400">Start a conversation with {getPersonalityName(currentPersonality)}</p>
              <p className="text-sm text-gray-500 mt-2">Click the microphone button to begin</p>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.05,
                }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${getPersonalityColor(currentPersonality)} flex items-center justify-center`}>
                    <span className="text-xs text-white font-bold">
                      {currentPersonality === 'mr_voxel' ? 'M' : 'F'}
                    </span>
                  </div>
                )}

                <motion.div
                  layout
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white'
                      : 'glass text-gray-100'
                  }`}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm leading-relaxed break-words"
                  >
                    {message.content}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs mt-1 opacity-70"
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </motion.p>
                </motion.div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center">
                    <span className="text-xs text-white font-bold">You</span>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
