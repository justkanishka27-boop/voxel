import { motion } from 'framer-motion'
import { MessageSquare, Clock, Star, Settings, LogOut, Zap } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useVoxelStore } from '../store/voxelStore'
import Navigation from '../components/Navigation'

export default function DashboardPage() {
  const { user, logout } = useAuthStore()
  const { setCurrentPage } = useVoxelStore()

  const stats = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: 'Total Chats',
      value: '42',
      color: 'from-glow-blue to-primary-500',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: 'Hours Used',
      value: '15.5',
      color: 'from-glow-cyan to-glow-blue',
    },
    {
      icon: <Star className="w-6 h-6" />,
      label: 'Favorite Personality',
      value: 'Mr. Voxel',
      color: 'from-glow-purple to-glow-pink',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      label: 'Plan',
      value: 'Free',
      color: 'from-yellow-500 to-orange-500',
    },
  ]

  const recentChats = [
    { date: 'Today', messages: 12, duration: '2h 15m' },
    { date: 'Yesterday', messages: 8, duration: '1h 30m' },
    { date: '2 days ago', messages: 15, duration: '3h 20m' },
  ]

  const handleLogout = () => {
    logout()
    setCurrentPage('landing')
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
        className="absolute top-20 left-10 w-96 h-96 bg-glow-blue/5 rounded-full blur-3xl"
      />

      <div className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-display font-bold">
                  Welcome back, <span className="text-primary-400">{user?.name}</span>
                </h1>
                <p className="text-gray-400 mt-2">Here's your Voxel dashboard</p>
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-6xl"
              >
                {user?.name?.charAt(0)?.toUpperCase() || '👤'}
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-lg p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-display font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="glass-lg p-8 rounded-xl border border-white/10">
                <h2 className="text-2xl font-display font-bold mb-6">Recent Conversations</h2>

                <div className="space-y-4">
                  {recentChats.map((chat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg glass hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-400 to-glow-cyan flex items-center justify-center">
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold">{chat.date}</p>
                          <p className="text-sm text-gray-400">{chat.messages} messages</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary-400">{chat.duration}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage('chat')}
                  className="w-full mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-glow-cyan text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  Start New Chat
                </button>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-6"
            >
              {/* Profile Card */}
              <div className="glass-lg p-6 rounded-xl border border-white/10">
                <h3 className="font-display font-bold text-lg mb-4">Profile</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Name</p>
                    <p className="font-semibold">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                    <p className="font-semibold text-sm break-all">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Plan</p>
                    <p className="font-semibold">{user?.isPremium ? 'Premium' : 'Free'}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-lg p-6 rounded-xl border border-white/10 space-y-3">
                <button className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>

              {/* Premium Banner */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.2)',
                    '0 0 40px rgba(168, 85, 247, 0.3)',
                    '0 0 20px rgba(168, 85, 247, 0.2)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="glass-lg p-6 rounded-xl border border-glow-purple/30 bg-gradient-to-br from-glow-purple/10 to-transparent"
              >
                <h3 className="font-display font-bold mb-2">Go Premium</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Unlock unlimited voice interactions and advanced features
                </p>
                <button
                  onClick={() => setCurrentPage('pricing')}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-glow-pink to-glow-purple text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Upgrade
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
