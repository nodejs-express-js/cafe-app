import { useState } from 'react'


const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(import.meta.env.VITE_API_URL+'/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Login failed')
      console.log('Login successful:', data)
    } catch (err:any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}

export default useLogin
