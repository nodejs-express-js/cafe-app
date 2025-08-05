

import React, { useReducer } from 'react';
import { UserContext } from './UserContext';
interface UserState {
  email: string;
  profilepic: string;
  token: string;
  timezone: string;
}

type UserAction =
  | { type: 'LOGIN'; payload: UserState }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_TIMEZONE'; payload: string };

 export interface UserContextType {
    state: UserState | null;
    dispatch: React.Dispatch<UserAction>;
  }
  
const initialState: UserState | null = null;


function userReducer(state: UserState | null, action: UserAction): UserState | null {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    case 'UPDATE_TIMEZONE':
      if (!state) return state;
      return { ...state, timezone: action.payload };
    default:
      return state;
  }
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};



