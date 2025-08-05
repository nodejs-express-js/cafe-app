import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'

import styles from './App.module.css'
import { useUser } from './hooks/useUser'

function App() {
  const { state } = useUser()

  const isAuthenticated = !!state?.token

  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.content}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Home /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <SignUp />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
