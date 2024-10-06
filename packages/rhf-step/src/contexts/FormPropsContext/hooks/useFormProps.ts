import { useContext } from "react"
import { FormPropsContext } from "../formPropsContext"


export function useFormProps() {
  const ctx = useContext(FormPropsContext)
  if (!ctx) {
    throw new Error('useFormProps must be used inside a FormPropsProvider')
  }
  return ctx
}
