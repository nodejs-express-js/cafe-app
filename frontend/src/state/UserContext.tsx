import { createContext } from "react";
import type { UserContextType } from './UserState';
export const UserContext = createContext<UserContextType | undefined>(undefined);
