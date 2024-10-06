import { useEffect } from "react";
import { useActiveForm } from "./useActiveForm";
import { useAtom } from "jotai";

export function useValidForm() {

  const form = useActiveForm();

  if (!form.formStepContext?.isValidAtom) {
    throw new Error('No isValidAtom found in context')
  }

  const [isValid] = useAtom(form.formStepContext?.isValidAtom)

  useEffect(() => {
    // Set initial validity to false if there are errors on mount
    // setIsValid(false)
    form.validate() // Trigger validation on mount
    const subscription = form.watch(form.validate); // Trigger validation on change
    return () => {
      subscription.unsubscribe();
    };
  }, [
    form.validate,
    form.watch
  ])

  // If validation changes, verify if the form is valid
  // and re-trigger validation again (just in case of async validation)
  useEffect(() => {
    form.validate()
  }, [isValid])

  return isValid
}