import { useState } from 'react'
import styles from './SignUp.module.css'
import useSignup from '../hooks/useSignup'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [timezone, setTimezone] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const { signup, loading, error } = useSignup()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signup({ email, password, timezone, profilepic: file })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Timezone (e.g. America/New_York)"
        onChange={(e) => setTimezone(e.target.value)}
      />
      <input
        type="file"
        accept="image/jpeg"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  )
}

export default SignUp
