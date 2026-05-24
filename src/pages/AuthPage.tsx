import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useVoxelStore } from '../store/voxelStore'
import Navigation from '../components/Navigation'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { login, signup } = useAuthStore()
  const { setCurrentPage } = useVoxelStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          throw new Error('Please fill in all fields')
        }
        await login(formData.email, formData.password)
      } else {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
          throw new Error('Please fill in all fields')
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        await signup(formData.name, formData.email, formData.password)
      }
      setCurrentPage('dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <Navigation />

      {/* Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-72 h-72 bg-glow-blue/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 0.9, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute bottom-20 right-10 w-72 h-72 bg-glow-purple/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Card */}
          <motion.div
            variants={itemVariants}
            className="glass-lg p-8 rounded-2xl border border-white/10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-display font-bold mb-2"
              >
                <span className="bg-gradient-to-r from-primary-400 to-glow-cyan bg-clip-text text-transparent">
                  Voxel
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-gray-400"
              >
                {isLogin ? 'Welcome back' : 'Join the future'}
              </motion.p>
            </div>

            {/* Form */}
            <motion.form
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Name Field (Signup Only) */}
              {!isLogin && (
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="input-glass pl-10 w-full"
                    />
                  </div>
                </motion.div>
              )}

              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="input-glass pl-10 w-full"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input-glass pl-10 pr-10 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password Field (Signup Only) */}
              {!isLogin && (
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="input-glass pl-10 pr-10 w-full"
                    />
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  variants={itemVariants}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full mt-6 inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </motion.button>
            </motion.form>

            {/* Toggle Auth Mode */}
            <motion.div
              variants={itemVariants}
              className="mt-6 text-center"
            >
              <p className="text-gray-400">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
                    setError('')
                  }}
                  className="ml-2 text-primary-400 hover:text-primary-300 font-semibold transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </motion.div>

            {/* Demo Credentials */}
            <motion.div
              variants={itemVariants}
              className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300"
            >
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p>Email: demo@voxel.ai</p>
              <p>Password: demo123</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
