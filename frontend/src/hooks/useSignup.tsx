import { useState } from 'react'
import { useUser } from './useUser'

type SignupParams = {
  email: string
  password: string
  timezone: string
  profilepic: File | null
}

const useSignup = () => {
  const { dispatch } = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const signup = async ({ email, password, timezone, profilepic }: SignupParams) => {
    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      formData.append('timezone', timezone)
      if (profilepic) formData.append('profilepic', profilepic)

      const res = await fetch(import.meta.env.VITE_API_URL + 'v1/user/signup', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) setError(data.message || 'Signup failed')

      dispatch({
        type: 'LOGIN', // After signup, treat as logged in
        payload: {
          email: data.email,
          profilepic: data.profilepic || '',
          token: data.token,
          timezone: data.timezone,
        },
      })
    } catch  {
      setError("something went wrong with server")
    } finally {
      setLoading(false)
    }
  }

  return { signup, loading, error }
}

export default useSignup
