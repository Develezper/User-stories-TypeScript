import { useEffect, useState } from 'react'
import './App.css'
import type { User } from './interfaces/User'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'

type Route = '#/login' | '#/dashboard'

function getRoute(): Route {
  return window.location.hash === '#/dashboard' ? '#/dashboard' : '#/login'
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRoute())
  const [sessionUser, setSessionUser] = useState<User | null>(null)

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '#/login'
    }

    const handleHashChange = () => {
      const nextRoute = getRoute()

      if (nextRoute === '#/dashboard' && !sessionUser) {
        window.location.hash = '#/login'
        return
      }

      setRoute(nextRoute)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [sessionUser])

  const handleLoginSuccess = (user: User) => {
    setSessionUser(user)
    window.location.hash = '#/dashboard'
    setRoute('#/dashboard')
  }

  const handleLogout = () => {
    setSessionUser(null)
    window.location.hash = '#/login'
    setRoute('#/login')
  }

  return (
    <main className="shell">
      <div className="shell__glow shell__glow--left" />
      <div className="shell__glow shell__glow--right" />

      {route === '#/dashboard' && sessionUser ? (
        <Dashboard currentUser={sessionUser} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </main>
  )
}

export default App
