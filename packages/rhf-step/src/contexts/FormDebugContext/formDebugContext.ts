import { LogLevel } from "../../types";
import { createContext } from "react";

export type IFormDebugContext = {
  print: (level: LogLevel, ...args: any[]) => void
  log: (...args: any[]) => void
  info: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
  debug: (...args: any[]) => void
}

export const FormDebugContext = createContext({} as IFormDebugContext)