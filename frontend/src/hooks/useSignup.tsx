import { useState } from 'react'

type SignupData = {
  email: string
  password: string
  timezone: string
  profilepic: File | null
}

const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signup = async ({ email, password, timezone, profilepic }: SignupData) => {
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      formData.append('timezone', timezone)
      if (profilepic) formData.append('profilepic', profilepic)

      const res = await fetch(import.meta.env.VITE_API_URL+'/v1/user/signup', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Signup failed')

      console.log('Signup successful:', data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { signup, loading, error }
}

export default useSignup
