import { useFormContext } from "./useFormContext";

export function useActiveForm() {

  const {
    getForm,
    stepIndex,
    subStepIndex,
  } = useFormContext();

  const form = getForm(stepIndex, subStepIndex)

  if (!form) {
    throw new Error('No form found in context')
  }

  return form
}