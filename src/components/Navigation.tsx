import { motion } from 'framer-motion'
import { Mic, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useVoxelStore } from '../store/voxelStore'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useAuthStore()
  const { setCurrentPage } = useVoxelStore()

  const handleNavClick = (page: any) => {
    setCurrentPage(page)
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick('landing')}
          >
            <div className="p-2 bg-gradient-to-br from-primary-400 to-glow-blue rounded-lg">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
              Voxel
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="text-gray-300 hover:text-primary-300 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('chat')}
                  className="text-gray-300 hover:text-primary-300 transition-colors"
                >
                  Chat
                </button>
                <button
                  onClick={() => handleNavClick('pricing')}
                  className="text-gray-300 hover:text-primary-300 transition-colors"
                >
                  Premium
                </button>
                <button
                  onClick={logout}
                  className="px-6 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('landing')}
                  className="text-gray-300 hover:text-primary-300 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('pricing')}
                  className="text-gray-300 hover:text-primary-300 transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={() => handleNavClick('auth')}
                  className="btn-primary"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-3 mt-4">
              {isAuthenticated ? (
                <>
                  <button onClick={() => handleNavClick('dashboard')} className="text-left py-2 text-gray-300">
                    Dashboard
                  </button>
                  <button onClick={() => handleNavClick('chat')} className="text-left py-2 text-gray-300">
                    Chat
                  </button>
                  <button onClick={() => handleNavClick('pricing')} className="text-left py-2 text-gray-300">
                    Premium
                  </button>
                  <button onClick={logout} className="text-left py-2 text-red-300">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleNavClick('landing')} className="text-left py-2 text-gray-300">
                    Home
                  </button>
                  <button onClick={() => handleNavClick('pricing')} className="text-left py-2 text-gray-300">
                    Pricing
                  </button>
                  <button onClick={() => handleNavClick('auth')} className="w-full btn-primary text-center">
                    Get Started
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
