import { useContext } from "react";
import { FormDebugContext } from "../formDebugContext";



export function useFormDebug(name?: string) {
  const ctx = useContext(FormDebugContext)
  if (!ctx) {
    throw new Error('useFormDebug must be used inside a FormDebugProvider')
  }
  return name
    ? ctx.createLogger(name)
    : ctx
}