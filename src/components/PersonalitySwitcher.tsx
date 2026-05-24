import { motion } from 'framer-motion'
import { useVoxelStore } from '../store/voxelStore'

export default function PersonalitySwitcher() {
  const { currentPersonality, setCurrentPersonality } = useVoxelStore()

  const personalities = [
    {
      id: 'mr_voxel',
      name: 'Mr. Voxel',
      description: 'Calm, Professional, Strategic',
      icon: '🎩',
      color: 'from-primary-500 to-glow-blue',
      glowColor: 'glow-blue',
    },
    {
      id: 'miss_voxel',
      name: 'Miss Voxel',
      description: 'Friendly, Elegant, Energetic',
      icon: '✨',
      color: 'from-glow-pink to-glow-purple',
      glowColor: 'glow-purple',
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-lg">Choose Your Assistant</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personalities.map((personality) => (
          <motion.button
            key={personality.id}
            onClick={() => setCurrentPersonality(personality.id as any)}
            animate={{
              scale: currentPersonality === personality.id ? 1.05 : 1,
              boxShadow: currentPersonality === personality.id ? `0 0 40px rgba(14, 165, 233, 0.3)` : `0 0 20px rgba(255, 255, 255, 0.05)`,
            }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-xl border-2 transition-all duration-300 group cursor-pointer relative overflow-hidden
              ${
                currentPersonality === personality.id
                  ? `border-${personality.id === 'mr_voxel' ? 'primary' : 'pink'}-500 bg-gradient-to-br ${personality.color}/20`
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }
            `}
          >
            {/* Background Gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${personality.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />

            {/* Content */}
            <div className="relative z-10 text-left">
              <div className="text-4xl mb-3">{personality.icon}</div>
              <h4 className="font-display font-bold text-lg mb-1">{personality.name}</h4>
              <p className="text-sm text-gray-400 mb-4">{personality.description}</p>

              {/* Select Indicator */}
              <motion.div
                initial={false}
                animate={{
                  opacity: currentPersonality === personality.id ? 1 : 0,
                  x: currentPersonality === personality.id ? 0 : -10,
                }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold"
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${personality.color}`} />
                Selected
              </motion.div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
