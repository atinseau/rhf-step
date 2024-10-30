import { useFormContext } from "./useFormContext";

export function useFormSubmit() {
  const { onSubmit } = useFormContext()

  return {
    submit: onSubmit
  }
}