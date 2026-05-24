import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useVoxelStore } from '../store/voxelStore'
import Navigation from '../components/Navigation'

export default function PricingPage() {
  const { isAuthenticated } = useAuthStore()
  const { setCurrentPage } = useVoxelStore()

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for getting started',
      price: '0',
      period: 'Forever',
      icon: '🚀',
      color: 'from-primary-500 to-glow-blue',
      features: [
        'Limited voice interactions (20/month)',
        'One AI personality',
        'Basic chat history',
        'Community support',
        'Mobile responsive design',
        'Standard speech recognition',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      description: 'For power users',
      price: '9.99',
      period: 'per month',
      icon: '⚡',
      color: 'from-glow-cyan to-primary-400',
      features: [
        'Unlimited voice interactions',
        'Both AI personalities',
        'Unlimited chat history',
        'Priority support',
        'Advanced customization',
        'Enhanced speech recognition',
        'Custom voice profiles',
        'Conversation export',
      ],
      cta: 'Upgrade to Pro',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'For teams and organizations',
      price: '49.99',
      period: 'per month',
      icon: '👑',
      color: 'from-glow-purple to-glow-pink',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Multi-user accounts',
        'Advanced analytics',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'Admin dashboard',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ]

  const faqs = [
    {
      q: 'Can I upgrade anytime?',
      a: 'Yes, you can upgrade your plan anytime. Your subscription will renew at the new plan price on your next billing date.',
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes! Start with our free Starter plan with limited voice interactions. Upgrade anytime to unlock unlimited features.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Absolutely! You can cancel your subscription anytime. No hidden fees or long-term commitments.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        className="absolute top-20 left-1/4 w-96 h-96 bg-glow-cyan/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 0.9, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute bottom-20 right-1/4 w-96 h-96 bg-glow-purple/5 rounded-full blur-3xl"
      />

      <div className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4">
              Simple, Transparent <span className="text-primary-400">Pricing</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Always flexible, never locked in.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative rounded-2xl border transition-all duration-300 overflow-hidden group ${
                  plan.highlighted
                    ? `border-glow-cyan/50 bg-gradient-to-b from-glow-cyan/20 to-transparent ring-2 ring-glow-cyan/30 scale-105 md:scale-100 lg:scale-105 hover:scale-110 md:hover:scale-105 lg:hover:scale-110 shadow-2xl shadow-cyan-500/20`
                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {/* Highlighted Badge */}
                {plan.highlighted && (
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(6, 182, 212, 0.2)',
                        '0 0 40px rgba(6, 182, 212, 0.3)',
                        '0 0 20px rgba(6, 182, 212, 0.2)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-glow-cyan to-primary-400 text-white text-xs font-bold"
                  >
                    MOST POPULAR
                  </motion.div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{plan.icon}</div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-display font-bold">${plan.price}</span>
                      <span className="text-gray-400">/{plan.period}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      if (!isAuthenticated) setCurrentPage('auth')
                    }}
                    className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 mb-8 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-glow-cyan to-primary-400 text-white hover:shadow-lg hover:shadow-cyan-500/30'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  {/* Features */}
                  <div className="space-y-3 border-t border-white/10 pt-8">
                    {plan.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-glow-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Comparison Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-lg p-8 rounded-2xl border border-white/10 mb-20"
          >
            <h2 className="text-3xl font-display font-bold mb-8">Full Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold">Starter</th>
                    <th className="text-center py-4 px-4 font-semibold">Pro</th>
                    <th className="text-center py-4 px-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Voice Interactions', starter: '20/mo', pro: 'Unlimited', enterprise: 'Unlimited' },
                    { feature: 'AI Personalities', starter: '1', pro: '2', enterprise: '2+' },
                    { feature: 'Chat History', starter: 'Limited', pro: 'Unlimited', enterprise: 'Unlimited' },
                    { feature: 'Support', starter: 'Community', pro: 'Priority', enterprise: 'Dedicated' },
                    { feature: 'Custom Profiles', starter: '❌', pro: '✓', enterprise: '✓' },
                    { feature: 'API Access', starter: '❌', pro: '❌', enterprise: '✓' },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-gray-300 font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-gray-400">{row.starter}</td>
                      <td className="py-4 px-4 text-center text-glow-cyan font-semibold">{row.pro}</td>
                      <td className="py-4 px-4 text-center text-glow-purple font-semibold">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-display font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-lg p-6 rounded-xl"
                >
                  <h3 className="font-display font-bold text-lg mb-2 text-primary-300">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center glass-lg p-12 rounded-2xl border border-glow-purple/20 bg-gradient-to-b from-glow-purple/10 to-transparent"
          >
            <h2 className="text-3xl font-display font-bold mb-4">Ready to upgrade?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Start with our free plan and upgrade anytime. No credit card required.
            </p>
            <button
              onClick={() => {
                if (!isAuthenticated) setCurrentPage('auth')
                else setCurrentPage('dashboard')
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Get Started Today
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
