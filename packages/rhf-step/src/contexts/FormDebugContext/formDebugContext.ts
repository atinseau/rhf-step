import { createContext } from "react";

export type IFormDebugLogger = {
  log: (...args: any[]) => void
  info: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
}

export type IFormDebugContext = IFormDebugLogger & {
  createLogger: (name: string) => IFormDebugLogger
}

export const FormDebugContext = createContext({} as IFormDebugContext)