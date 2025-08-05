import { useState } from 'react'
import styles from './Login.module.css'
import useLogin from '../hooks/useLogin'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  )
}

export default Login
