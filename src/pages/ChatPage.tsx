import { motion } from 'framer-motion'
import { Settings, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { useVoxelStore } from '../store/voxelStore'
import Navigation from '../components/Navigation'
import VoiceAssistant from '../components/VoiceAssistant'
import ChatInterface from '../components/ChatInterface'
import PersonalitySwitcher from '../components/PersonalitySwitcher'

export default function ChatPage() {
  const { clearMessages, currentPersonality } = useVoxelStore()
  const [showSettings, setShowSettings] = useState(false)

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      clearMessages()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <Navigation />

      {/* Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-10 w-96 h-96 bg-glow-cyan/5 rounded-full blur-3xl"
      />

      <div className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h1 className="text-4xl font-display font-bold">Chat with Voxel</h1>
              <p className="text-gray-400 mt-2">
                Talking with {currentPersonality === 'mr_voxel' ? 'Mr. Voxel 🎩' : 'Miss Voxel ✨'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleClearChat}
                className="p-3 rounded-lg glass hover:bg-white/15 transition-all"
                title="Clear chat history"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-3 rounded-lg transition-all ${
                  showSettings ? 'glass bg-white/15' : 'glass hover:bg-white/15'
                }`}
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 flex flex-col"
            >
              <div className="flex-1 min-h-[500px] lg:min-h-[600px]">
                <ChatInterface />
              </div>

              {/* Voice Assistant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 glass-lg p-8 rounded-2xl border border-white/10"
              >
                <VoiceAssistant />
              </motion.div>
            </motion.div>

            {/* Sidebar - Settings & Personality */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-6"
            >
              {/* Settings Panel */}
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-lg p-6 rounded-xl border border-white/10"
                >
                  <h3 className="font-display font-bold text-lg mb-4">Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Speech Rate</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        defaultValue="1"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Volume</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        defaultValue="1"
                        className="w-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Personality Switcher */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-lg p-6 rounded-xl border border-white/10"
              >
                <PersonalitySwitcher />
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="glass-lg p-6 rounded-xl border border-white/10"
              >
                <h3 className="font-display font-bold text-lg mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Messages Today</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Conversations</span>
                    <span className="font-bold">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Interaction Time</span>
                    <span className="font-bold">3h 24m</span>
                  </div>
                </div>
              </motion.div>

              {/* Upgrade Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="glass-lg p-6 rounded-xl border border-glow-purple/20 bg-gradient-to-br from-glow-purple/10 to-transparent"
              >
                <h3 className="font-display font-bold text-lg mb-2">Upgrade to Premium</h3>
                <p className="text-sm text-gray-400 mb-4">Unlock unlimited voice interactions and advanced features</p>
                <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-glow-pink to-glow-purple text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                  Upgrade Now
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
