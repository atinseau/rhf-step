import { createContext } from "react";

export type IFormNavigationContext = {
  to: (stepConfig: { si: number, ssi?: number }) => void
  next: () => void
  back: () => void
}

export const FormNavigationContext = createContext({} as IFormNavigationContext)