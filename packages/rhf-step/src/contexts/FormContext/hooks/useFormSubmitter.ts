import { useCallback } from "react"
import { SubmitCallback } from "../../../types"
import { useFormProps } from "../../FormPropsContext"
import { useFormState } from "../../FormStateContext"
import { useFormDebug } from "../../FormDebugContext/hooks/useFormDebug"
import { useFormNavigation } from "../../FormNavigationContext"

// This hook is used to expose the submit function that will be triggered
// when the form is submitted
// also there is two mecanism to submitting the form (externally and internally)
// TODO: explain better the two mecanism
export function useFormSubmitter() {

  const { onError } = useFormProps()
  const { next } = useFormNavigation()
  const { warn } = useFormDebug('useFormSubmitter')

  const {
    getForm,
    stepIndex,
    subStepIndex,
    steps,
  } = useFormState()

  const onSubmitCallback: SubmitCallback = useCallback(async ({ result, /*data*/ }) => {
    if (result instanceof Error) {
      if (!onError) {
        console.error('[FormProvider] An error occurred during the form submission: ', result)
        return
      }
      onError?.(result)
      return
    }
    if (!result) {
      console.warn('[FormProvider] Form submission was cancelled: ', result)
      return
    }

    next()
  }, [
    stepIndex,
    subStepIndex,
    steps
  ])

  const onSubmit = useCallback(async () => {
    const form = getForm(stepIndex, subStepIndex)
    if (!form || !form?.ref?.current) {
      !steps[stepIndex].standalone && warn('Form ref is not defined, cannot submit form, please check you are using useForm() hook in your component')
      return next()
    }
    form.ref.current.dispatchEvent(new CustomEvent('submit', {
      bubbles: true
    }))
  }, [
    stepIndex,
    subStepIndex,
    steps
  ])

  return {
    onSubmit,
    onSubmitCallback
  }
}