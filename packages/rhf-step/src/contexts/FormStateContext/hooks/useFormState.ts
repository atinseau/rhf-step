import { useContext } from "react";
import { FormStateContext } from "../formStateContext";

export function useFormState() {
  const ctx = useContext(FormStateContext)
  if (!ctx) {
    throw new Error('[FormStateContext] useFormState must be used inside a FormProvider')
  }
  return ctx
}