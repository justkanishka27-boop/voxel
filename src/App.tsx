import { useState, useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import { useVoxelStore } from './store/voxelStore'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ChatPage from './pages/ChatPage'
import AuthPage from './pages/AuthPage'
import PricingPage from './pages/PricingPage'
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'

export default function App() {
  const { isAuthenticated, isLoading } = useAuthStore()
  const { currentPage, setCurrentPage } = useVoxelStore()
  const [appLoading, setAppLoading] = useState(true)

  useEffect(() => {
    // Initialize app and check authentication
    const initApp = async () => {
      try {
        // Simulate initialization
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error('Failed to initialize app:', error)
      } finally {
        setAppLoading(false)
      }
    }

    initApp()
  }, [])

  if (appLoading || isLoading) {
    return <LoadingScreen />
  }

  // Public pages
  if (!isAuthenticated) {
    if (currentPage === 'auth') return <AuthPage />
    if (currentPage === 'pricing') return <PricingPage />
    return <LandingPage />
  }

  // Protected pages
  if (currentPage === 'chat') return <ChatPage />
  if (currentPage === 'dashboard') return <DashboardPage />
  if (currentPage === 'pricing') return <PricingPage />

  return <DashboardPage />
}
