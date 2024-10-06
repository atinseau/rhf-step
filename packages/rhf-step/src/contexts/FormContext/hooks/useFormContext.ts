import { useContext } from "react";
import { FormContext } from "../formContext";

export function useFormContext() {
  const ctx = useContext(FormContext)
  if (!ctx) {
    throw new Error('useFormContext must be used inside a FormProvider')
  }
  return ctx
}