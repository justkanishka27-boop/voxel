import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Shield, Volume2, Smile } from 'lucide-react'
import { useVoxelStore } from '../store/voxelStore'
import Navigation from '../components/Navigation'

export default function LandingPage() {
  const { setCurrentPage } = useVoxelStore()

  const features = [
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: 'Real-Time Voice',
      description: 'Experience seamless voice interactions with cutting-edge speech recognition',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Responses',
      description: 'Get intelligent responses in real-time with advanced AI processing',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Your conversations are encrypted and your privacy is our priority',
    },
    {
      icon: <Smile className="w-6 h-6" />,
      title: 'Multiple Personalities',
      description: 'Choose between different AI personalities tailored to your preference',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Premium Features',
      description: 'Unlock advanced tools and unlimited voice interactions',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Optimized performance for the smoothest experience possible',
    },
  ]

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Tech Entrepreneur',
      text: 'Voxel has transformed how I interact with AI. The voice interface is incredibly natural.',
      avatar: '👨‍💼',
    },
    {
      name: 'Sarah Chen',
      role: 'Creative Director',
      text: 'The UI is absolutely stunning. It feels like using technology from the future.',
      avatar: '👩‍🎨',
    },
    {
      name: 'Marcus Williams',
      role: 'Software Developer',
      text: 'Finally, an AI assistant that understands context and maintains real conversations.',
      avatar: '👨‍💻',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        {/* Background Animated Elements */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 left-1/4 w-96 h-96 bg-glow-blue/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 0.9, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
          className="absolute bottom-10 right-1/4 w-96 h-96 bg-glow-purple/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="px-4 py-2 rounded-full glass-sm border border-glow-blue/20">
                <span className="text-sm font-semibold bg-gradient-to-r from-glow-blue to-glow-cyan bg-clip-text text-transparent flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Welcome to the Future of AI
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight">
                Meet{' '}
                <span className="bg-gradient-to-r from-primary-400 via-glow-cyan to-glow-purple bg-clip-text text-transparent">
                  Voxel
                </span>
              </h1>
              <p className="mt-2 text-xl sm:text-2xl text-gray-400">
                Premium AI Voice Assistant Platform
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the next generation of conversational AI with real-time voice interaction, intelligent
              personalities, and an immersive interface designed for the future.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button
                onClick={() => setCurrentPage('auth')}
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage('pricing')}
                className="btn-secondary"
              >
                View Pricing
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg">Everything you need for premium AI interaction</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-lg p-8 rounded-xl hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-glow-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">What Users Say</h2>
            <p className="text-gray-400 text-lg">Join thousands of satisfied users</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-lg p-6 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-lg p-12 rounded-2xl text-center border border-glow-blue/20"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Ready to Experience Voxel?</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join the future of conversational AI today. Start with a free account.
            </p>
            <button
              onClick={() => setCurrentPage('auth')}
              className="btn-primary inline-flex items-center gap-2"
            >
              Get Started Now <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 sm:px-6 lg:px-8 py-8 mt-20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 Voxel. All rights reserved. Powered by advanced AI technology.</p>
        </div>
      </footer>
    </div>
  )
}
