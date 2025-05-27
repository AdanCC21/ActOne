import { createContext } from 'react';

interface ThemeContextType {
  isLightMode: boolean;
  setIsLightMode: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const BackendRoute = createContext("http://localhost:3000/");