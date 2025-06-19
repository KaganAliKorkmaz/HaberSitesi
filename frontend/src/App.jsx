import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import AdminNewsPage from './pages/AdminNewsPage'
import AdminAnnouncementsPage from './pages/AdminAnnouncementsPage'

function App() {
  const [activeForm, setActiveForm] = useState('login') // 'login' or 'signup'
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null) // Kullanıcı durumunu yönetmek için
  const navigate = useNavigate() // Yönlendirme için useNavigate hook'u

  const API_BASE_URL = 'http://localhost:8082' // Backend'in çalıştığı port

  useEffect(() => {
    // Uygulama yüklendiğinde kullanıcı verilerini localStorage'dan al
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      // Eğer kullanıcı varsa ve doğru bir sayfada değilse yönlendir
      if (parsedUser.role === 'admin' && window.location.pathname !== '/admin') {
        navigate('/admin')
      } else if (parsedUser.role === 'user' && window.location.pathname !== '/user') {
        navigate('/user')
      }
    }
  }, [])

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (activeForm === 'signup' && confirmPassword) {
      setPasswordError(e.target.value === confirmPassword ? '' : 'Passwords do not match')
    }
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    setPasswordError(e.target.value === password ? '' : 'Passwords do not match')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = activeForm === 'login' ? `${API_BASE_URL}/Check/login` : `${API_BASE_URL}/Check/signup`
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password
        })
      })

      if (response.status === 401) {
        throw new Error('Invalid username or password')
      } else if (response.status === 400) {
        throw new Error('Username already exists')
      } else if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const userData = await response.json()
      console.log('Success:', userData)
      
      // Kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      
      // Role'e göre yönlendirme
      if (userData.role === 'admin') {
        navigate('/admin')
      } else if (userData.role === 'user') {
        navigate('/user')
      } else {
        // Eğer role belirtilmemişse veya farklı bir değerse
        navigate('/') // Varsayılan olarak anasayfaya yönlendir
      }

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

  // Kullanıcı giriş yapmamışsa veya doğru sayfada değilse login/signup formunu göster
  if (!user || (user.role === 'admin' && window.location.pathname !== '/admin') || (user.role === 'user' && window.location.pathname !== '/user')) {
    return (
      <Routes>
        <Route path="/" element={(
          <div style={{ marginTop: '-300px' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '3.5rem',
              fontWeight: '700',
              color: '#1a1a1a',
              textAlign: 'center',
              marginBottom: '2rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>News.com</h1>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginTop: '20px'
            }}>
              <button 
                onClick={() => {
                  setActiveForm('login')
                  setPasswordError('')
                  setError('')
                }}
                style={{
                  padding: '10px 30px',
                  fontSize: '1.1rem',
                  backgroundColor: activeForm === 'login' ? '#0056b3' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}>Login</button>
              <button 
                onClick={() => {
                  setActiveForm('signup')
                  setPasswordError('')
                  setError('')
                }}
                style={{
                  padding: '10px 30px',
                  fontSize: '1.1rem',
                  backgroundColor: activeForm === 'signup' ? '#1e7e34' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}>Signup</button>
            </div>

            <div style={{
              maxWidth: '400px',
              margin: '30px auto',
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#333'
              }}>
                {activeForm === 'login' ? 'Login' : 'Sign Up'}
              </h2>
              {error && (
                <div style={{
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                  padding: '10px',
                  borderRadius: '5px',
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      fontSize: '1rem'
                    }}
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      fontSize: '1rem'
                    }}
                    placeholder="Enter your password"
                  />
                </div>
                {activeForm === 'signup' && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Confirm Password</label>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        fontSize: '1rem'
                      }}
                      placeholder="Confirm your password"
                    />
                    {passwordError && (
                      <p style={{ 
                        color: '#dc3545', 
                        fontSize: '0.9rem', 
                        marginTop: '5px',
                        marginBottom: '0'
                      }}>
                        {passwordError}
                      </p>
                    )}
                  </div>
                )}
                <button 
                  type="submit"
                  disabled={loading || (activeForm === 'signup' && passwordError !== '')}
                  style={{
                    padding: '12px',
                    backgroundColor: activeForm === 'login' ? '#007bff' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: (loading || (activeForm === 'signup' && passwordError !== '')) ? 'not-allowed' : 'pointer',
                    fontSize: '1.1rem',
                    transition: 'background-color 0.3s',
                    opacity: (loading || (activeForm === 'signup' && passwordError !== '')) ? 0.7 : 1
                  }}
                >
                  {loading ? 'Loading...' : (activeForm === 'login' ? 'Login' : 'Sign Up')}
                </button>
              </form>
            </div>
          </div>
        )} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/news" element={<AdminNewsPage />} />
        <Route path="/admin/announcements" element={<AdminAnnouncementsPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    )
  }

  // Kullanıcı giriş yapmışsa ve doğru sayfadaysa
  return (
    <div>
      {user.role === 'admin' && <AdminPage />}
      {user.role === 'user' && <UserPage />}
      <button 
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >Logout</button>
    </div>
  )
}

export default App
