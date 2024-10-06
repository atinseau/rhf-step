import { useActiveForm } from "./useActiveForm";
import { useAtom } from "jotai";

export function useFormSubmitting() {

  const form = useActiveForm()

  if (!form.formStepContext?.isSubmittingAtom) {
    throw new Error('useFormSubmitting() must be used within a active form step')
  }
  const [isSubmitting] = useAtom(form.formStepContext.isSubmittingAtom)
  return isSubmitting
}