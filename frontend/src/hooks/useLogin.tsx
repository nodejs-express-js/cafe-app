import { useState } from 'react';
import { useUser } from './useUser';

 const useLogin = () => {
  const { dispatch } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email: string, password: string) => {
    setLoading(true);
    console.log(email,password)
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + 'v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
        console.log(data)
      if (!res.ok) setError(data.message || 'Login failed');

      dispatch({
        type: 'LOGIN',
        payload: {
          email: data.email,
          profilepic: data.profilepic || '',
          token: data.token,
          timezone: data.timezone,
        },
      });
    } catch  {
      setError("somthing went wrong with server");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
export default useLogin;