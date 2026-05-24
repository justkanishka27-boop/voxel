import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-8 flex justify-center"
        >
          <div className="p-6 bg-gradient-to-br from-primary-400 via-glow-blue to-glow-cyan rounded-2xl pulse-glow">
            <Mic className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-display font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
            Voxel
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 mb-8"
        >
          Initializing your AI assistant...
        </motion.p>

        {/* Loading bars */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scaleY: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1 h-8 bg-gradient-to-t from-primary-400 to-glow-cyan rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
