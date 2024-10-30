import { useContext } from "react";
import { FormNavigationContext } from "../formNavigationContext";

export function useFormNavigationContext() {
  const ctx = useContext(FormNavigationContext)
  if (!ctx) {
    throw new Error('useFormNavigationContext must be used inside a FormNavigationProvider')
  }
  return ctx
}