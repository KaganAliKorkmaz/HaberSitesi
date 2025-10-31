import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import UserPage from './pages/UserPage'
import UserNewsPage from './pages/UserNewsPage'
import DuyurularPage from './pages/DuyurularPage'
import AdminPage from './pages/AdminPage'
import AdminNewsPage from './pages/AdminNewsPage'
import AdminAnnouncementsPage from './pages/AdminAnnouncementsPage'

function App() {
  const [activeForm, setActiveForm] = useState('login')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const API_BASE_URL = 'http://localhost:8082'

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = activeForm === 'login'
        ? `${API_BASE_URL}/Check/login`
        : `${API_BASE_URL}/Check/signup`

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) {
        if (response.status === 401) throw new Error('Invalid username or password')
        if (response.status === 400) throw new Error('Username already exists')
        throw new Error('Something went wrong!')
      }

      const userData = await response.json()
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      navigate(userData.role === 'admin' ? '/admin' : '/user')

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  if (!user) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">News.com</h1>

                <div className="flex justify-center gap-3 mb-6">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-md"
                    onClick={() => { setActiveForm('login'); setError('') }}>
                    Login
                  </button>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-md"
                    onClick={() => { setActiveForm('signup'); setError('') }}>
                    Signup
                  </button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input className="w-full border p-3 rounded-md"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)} required />

                  <input type="password" className="w-full border p-3 rounded-md"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} required />

                  {activeForm === 'signup' && (
                    <input type="password" className="w-full border p-3 rounded-md"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)} required />
                  )}

                  {error && <p className="text-red-500">{error}</p>}

                  <button className="w-full py-3 bg-indigo-600 text-white rounded-md">
                    {loading ? 'Loading...' : activeForm === 'login' ? 'Login' : 'Sign Up'}
                  </button>
                </form>
              </div>
            </div>
          }
        />
      </Routes>
    )
  }

  return (
    <div>
      <Routes>
        {/* Kullanıcı */}
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/news" element={<UserNewsPage />} />
        <Route path="/user/announcements" element={<DuyurularPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/news" element={<AdminNewsPage />} />
        <Route path="/admin/announcements" element={<AdminAnnouncementsPage />} />
        
        {/* Fallback */}
        <Route path="*" element={<UserPage />} />
      </Routes>

      <button
        onClick={handleLogout}
        className="fixed top-6 right-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md">
        Logout
      </button>
    </div>
  )
}

export default App
